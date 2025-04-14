import React, { useState } from "react";

export default function ActivityForm({ onAdicionar }) {
  const [grupo, setGrupo] = useState("Clínica");
  const [materia, setMateria] = useState("");
  const [tema, setTema] = useState("");
  const [feitas, setFeitas] = useState(0);
  const [certas, setCertas] = useState(0);
  const [tempo, setTempo] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

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
    const revisaoData = new Date();
    revisaoData.setDate(hoje.getDate() + diasParaRevisao);

    onAdicionar({
      grupo,
      materia,
      tema,
      feitas,
      certas,
      tempo,
      data: hoje.toLocaleDateString("pt-BR"),
      revisao: {
        para: revisaoData.toLocaleDateString("pt-BR"),
        qtd: qtdRevisao,
      },
    });

    setGrupo("Clínica");
    setMateria("");
    setTema("");
    setFeitas(0);
    setCertas(0);
    setTempo(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-2"
    >
      <select
        value={grupo}
        onChange={(e) => setGrupo(e.target.value)}
        className="p-2 border rounded"
      >
        <option>Clínica</option>
        <option>Cirúrgica</option>
        <option>Pediatria</option>
        <option>Gineco-Obstetrícia</option>
        <option>Medicina Preventiva</option>
      </select>
      <input
        type="text"
        placeholder="Matéria"
        value={materia}
        onChange={(e) => setMateria(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tema"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Questões feitas"
        value={feitas}
        onChange={(e) => setFeitas(parseInt(e.target.value))}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Acertos"
        value={certas}
        onChange={(e) => setCertas(parseInt(e.target.value))}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Tempo (min)"
        value={tempo}
        onChange={(e) => setTempo(parseInt(e.target.value) || 0)}
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Adicionar
      </button>
    </form>
  );
}
