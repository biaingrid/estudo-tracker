import React, { useState } from "react";

import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function ActivityTable({ atividades, setAtividades }) {
  const [abertos, setAbertos] = useState({});
  const [filtro, setFiltro] = useState("");

  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 6);
  const inicioDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const totalGeral = atividades.reduce((sum, a) => sum + a.feitas, 0);
  const totalSemana = atividades.reduce((sum, a) => {
    const [d, m, y] = a.data.split("/").map(Number);
    const data = new Date(y, m - 1, d);
    return data >= seteDiasAtras && data <= hoje ? sum + a.feitas : sum;
  }, 0);
  const totalMes = atividades.reduce((sum, a) => {
    const [d, m, y] = a.data.split("/").map(Number);
    const data = new Date(y, m - 1, d);
    return data >= inicioDoMes && data <= hoje ? sum + a.feitas : sum;
  }, 0);

  const atividadesFiltradas = atividades.filter((a) => {
    const texto = `${a.materia} ${a.tema}`.toLowerCase();
    return texto.includes(filtro.toLowerCase());
  });

  const grupos = atividadesFiltradas.reduce((acc, a) => {
    const grupo = a.grupo || "Sem grupo";
    if (!acc[grupo]) acc[grupo] = [];
    acc[grupo].push(a);
    return acc;
  }, {});

  const toggleGrupo = (grupo) => {
    setAbertos((prev) => ({
      ...prev,
      [grupo]: !prev[grupo],
    }));
  };

  const handleEditar = async (atividade) => {
    const novaFeitas = prompt("Quantidade feita:", atividade.feitas);
    const novaCertas = prompt("Quantidade certa:", atividade.certas);
    const novoTempo = prompt("Tempo (min):", atividade.tempo);
  
    if (novaFeitas !== null && novaCertas !== null && novoTempo !== null) {
      const atualizado = atividades.map((a) =>
        a === atividade
          ? { ...a, feitas: +novaFeitas, certas: +novaCertas, tempo: +novoTempo }
          : a
      );
      setAtividades(atualizado);
  
      const ref = doc(
        db,
        "atividades",
        `${atividade.materia}-${atividade.tema}-${atividade.data}`
      );
  
      await updateDoc(ref, {
        feitas: +novaFeitas,
        certas: +novaCertas,
        tempo: +novoTempo,
      });
    }
  };

  const handleExcluir = async (atividade) => {
    const confirmado = confirm("Tem certeza que deseja excluir esta atividade?");
    if (confirmado) {
      const atualizado = atividades.filter((a) => a !== atividade);
      setAtividades(atualizado);
  
      const ref = doc(
        db,
        "atividades",
        `${atividade.materia}-${atividade.tema}-${atividade.data}`
      );
  
      await deleteDoc(ref);
    }
  }; 

  return (
    <div className="overflow-x-auto mt-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Atividades Registradas</h2>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-800 dark:text-gray-200">
        <div className="bg-blue-100 dark:bg-blue-900 rounded p-3 shadow text-center">
          <p className="text-sm">Total Geral</p>
          <p className="text-xl font-bold">{totalGeral}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 rounded p-3 shadow text-center">
          <p className="text-sm">Total Semana</p>
          <p className="text-xl font-bold">{totalSemana}</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 rounded p-3 shadow text-center">
          <p className="text-sm">Total Mês</p>
          <p className="text-xl font-bold">{totalMes}</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Filtrar por matéria ou tema..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="w-full max-w-md p-2 border rounded mb-4"
      />

      {Object.keys(grupos).length === 0 ? (
        <p className="text-gray-500 italic">Nenhuma atividade encontrada.</p>
      ) : (
        Object.keys(grupos).map((grupo) => (
          <div key={grupo}>
            <button
              onClick={() => toggleGrupo(grupo)}
              className="w-full text-left bg-purple-100 dark:bg-purple-900 px-4 py-2 font-bold text-purple-800 dark:text-purple-200 rounded shadow hover:bg-purple-200 dark:hover:bg-purple-800 transition"
            >
              {abertos[grupo] !== false ? "▼" : "▶"} {grupo}
            </button>

            {abertos[grupo] !== false && (
              <table className="w-full text-sm shadow-lg rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 mt-2">
                <thead className="bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Matéria</th>
                    <th className="px-6 py-3">Tema</th>
                    <th className="px-4 py-3">Feitas</th>
                    <th className="px-4 py-3">Certas</th>
                    <th className="px-4 py-3">% Acerto</th>
                    <th className="px-4 py-3">Tempo (min)</th>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {grupos[grupo].map((a, index) => {
                    const percentual = a.feitas > 0 ? Math.round((a.certas / a.feitas) * 100) : 0;
                    let bgColor = "bg-white dark:bg-gray-800";
                    if (percentual < 50) bgColor = "bg-red-100 dark:bg-red-900";
                    else if (percentual < 80) bgColor = "bg-yellow-100 dark:bg-yellow-900";
                    else bgColor = "bg-green-100 dark:bg-green-900";

                    return (
                      <React.Fragment key={index}>
                        <tr className={`${bgColor} border-b dark:border-gray-700`}>
                          <td className="px-6 py-2">{a.materia}</td>
                          <td className="px-6 py-2">{a.tema}</td>
                          <td className="px-4 py-2">{a.feitas}</td>
                          <td className="px-4 py-2">{a.certas}</td>
                          <td className="px-4 py-2 font-semibold">{percentual}%</td>
                          <td className="px-4 py-2">{a.tempo}</td>
                          <td className="px-4 py-2">{a.data}</td>
                          <td className="px-4 py-2 space-x-2">
                            <button
                              onClick={() => handleEditar(a)}
                              className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleExcluir(a)}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                        {a.revisao && (
                          <tr className="text-gray-600 text-xs bg-gray-100 dark:bg-gray-700">
                            <td colSpan="8" className="px-6 py-2 italic">
                              🔁 Revisão em <strong>{a.revisao.para}</strong> com{" "}
                              <strong>{a.revisao.qtd}</strong> questões
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}
    </div>
  );
}
