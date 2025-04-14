import React from "react";

function GraficoTopTemas({ atividades }) {
  const estatisticas = {};

  atividades.forEach((a) => {
    const chave = `${a.materia} - ${a.tema}`;
    if (!estatisticas[chave]) {
      estatisticas[chave] = { feitas: 0, certas: 0 };
    }
    estatisticas[chave].feitas += a.feitas;
    estatisticas[chave].certas += a.certas;
  });

  const temasComPercentual = Object.entries(estatisticas).map(
    ([tema, dados]) => ({
      tema,
      percentual:
        dados.feitas > 0 ? Math.round((dados.certas / dados.feitas) * 100) : 0,
    })
  );

  const melhores = [...temasComPercentual]
    .sort((a, b) => b.percentual - a.percentual)
    .slice(0, 5);

  const piores = [...temasComPercentual]
    .sort((a, b) => a.percentual - b.percentual)
    .slice(0, 5);

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold text-green-600 mb-4 text-center">
          🧠 Top 5 Temas com Maior Acerto
        </h2>
        <ul className="space-y-2 text-sm">
          {melhores.map((t, index) => (
            <li
              key={index}
              className="bg-green-100 p-2 rounded shadow-sm flex justify-between"
            >
              <span>{t.tema}</span>
              <span className="font-bold">{t.percentual}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">
          ⚠️ Top 5 Temas com Menor Acerto
        </h2>
        <ul className="space-y-2 text-sm">
          {piores.map((t, index) => (
            <li
              key={index}
              className="bg-red-100 p-2 rounded shadow-sm flex justify-between"
            >
              <span>{t.tema}</span>
              <span className="font-bold">{t.percentual}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GraficoTopTemas;