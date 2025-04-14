import React from "react";

export default function HistoricoRevisoes({ revisoes }) {
  if (revisoes.length === 0) {
    return (
      <div className="my-8 text-center text-gray-400 italic">
        Nenhuma revisão concluída ainda.
      </div>
    );
  }

  const ordenado = [...revisoes].sort((a, b) => {
    const [diaA, mesA, anoA] = a.data.split("/").map(Number);
    const [diaB, mesB, anoB] = b.data.split("/").map(Number);
    return new Date(anoB, mesB - 1, diaB) - new Date(anoA, mesA - 1, diaA);
  });

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">
        ✅ Revisões Concluídas
      </h2>
      <ul className="space-y-2 text-sm">
        {ordenado.map((r, index) => (
          <li
            key={index}
            className="bg-green-100 p-3 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">{r.tema}</span>
              <br />
              <span className="text-gray-600 text-xs">Concluída em: {r.data}</span>
            </div>
            <div className="font-bold text-green-700">{r.qtd} questões</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
