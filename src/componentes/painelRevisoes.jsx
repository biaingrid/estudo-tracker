import React, { useState } from "react";

export default function PainelRevisoes({ atividades, onConcluir }) {
  const [modal, setModal] = useState(null);

  const handleConcluir = (temaAlvo) => {
    setModal(temaAlvo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const feitas = parseInt(form.feitas.value);
    const certas = parseInt(form.certas.value);
    const tempo = parseInt(form.tempo.value);

    const percentual = feitas > 0 ? certas / feitas : 0;
    let diasParaRevisao = 30;
    let qtdRevisao = 15;

    if (percentual < 0.5) {
      diasParaRevisao = 5;
      qtdRevisao = 20;
    } else if (percentual < 0.8) {
      diasParaRevisao = 15;
    }

    const hoje = new Date();
    const novaData = new Date();
    novaData.setDate(hoje.getDate() + diasParaRevisao);

    onConcluir(modal, {
      feitas,
      certas,
      tempo,
      novaRevisao: {
        para: novaData.toLocaleDateString("pt-BR"),
        qtd: qtdRevisao,
      },
    });

    setModal(null);
  };

  const pendentes = atividades
    .filter((a) => a.revisao)
    .sort((a, b) => {
      const [diaA, mesA, anoA] = a.revisao.para.split("/").map(Number);
      const [diaB, mesB, anoB] = b.revisao.para.split("/").map(Number);
      const dataA = new Date(anoA, mesA - 1, diaA);
      const dataB = new Date(anoB, mesB - 1, diaB);
      return dataA - dataB;
    });

  if (pendentes.length === 0) {
    return (
      <p className="text-gray-500 text-center my-6">
        Nenhuma revisão pendente.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center text-purple-600 mb-4">
        📌 Revisões Pendentes
      </h2>
      <ul className="space-y-3">
        {pendentes.map((a, i) => {
          const [dia, mes, ano] = a.revisao.para.split("/").map(Number);
          const dataRevisao = new Date(ano, mes - 1, dia);
          const hoje = new Date();
          hoje.setHours(0, 0, 0, 0);

          let bg = "bg-purple-100 dark:bg-purple-900"; // padrão
          if (dataRevisao < hoje) {
            bg = "bg-red-200 dark:bg-red-900"; // atrasada
          } else if (dataRevisao.toDateString() === hoje.toDateString()) {
            bg = "bg-blue-200 dark:bg-blue-900"; // hoje
          }

          return (
            <li
              key={i}
              className={`${bg} p-4 rounded shadow text-sm flex justify-between items-center`}
            >
              <div>
                <p>
                  <strong>{a.materia}</strong> — {a.tema}
                </p>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  Revisar em {a.revisao.para} ({a.revisao.qtd} questões)
                </p>
              </div>
              <button
                onClick={() => handleConcluir(`${a.materia} - ${a.tema}`)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
              >
                Concluir revisão
              </button>
            </li>
          );
        })}
      </ul>

      {/* Modal de input */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg space-y-4 w-[300px]"
          >
            <h3 className="text-lg font-semibold text-center">
              Nova tentativa para: {modal}
            </h3>
            <input
              type="number"
              name="feitas"
              required
              placeholder="Questões feitas"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="certas"
              required
              placeholder="Acertos"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="tempo"
              required
              placeholder="Tempo (min)"
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="text-sm px-3 py-1 border rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
