import React, { useState, useEffect } from "react";

function PainelMetas({ atividades }) {
  const [metaQuestoes, setMetaQuestoes] = useState(() => {
    const stored = localStorage.getItem("metaQuestoes");
    return stored ? parseInt(stored) : 200;
  });

  const [metaTempo, setMetaTempo] = useState(() => {
    const stored = localStorage.getItem("metaTempo");
    return stored ? parseInt(stored) : 600;
  });

  useEffect(() => {
    localStorage.setItem("metaQuestoes", metaQuestoes);
  }, [metaQuestoes]);

  useEffect(() => {
    localStorage.setItem("metaTempo", metaTempo);
  }, [metaTempo]);

  if (!Array.isArray(atividades) || atividades.length === 0) {
    return (
      <div className="my-8 max-w-3xl mx-auto text-center text-gray-500 italic">
        Nenhuma atividade registrada ainda para calcular metas.
      </div>
    );
  }

  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 6);

  const destaSemana = atividades.filter((a) => {
    const [dia, mes, ano] = a.data.split("/").map(Number);
    const dataAtividade = new Date(ano, mes - 1, dia);
    return dataAtividade >= seteDiasAtras && dataAtividade <= hoje;
  });

  const totalQuestoes = destaSemana.reduce((sum, a) => sum + a.feitas, 0);
  const totalTempo = destaSemana.reduce((sum, a) => sum + a.tempo, 0);

  const pctQuestoes = Math.min(100, Math.round((totalQuestoes / metaQuestoes) * 100));
  const pctTempo = Math.min(100, Math.round((totalTempo / metaTempo) * 100));

  return (
    <div className="my-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
        🎯 Metas Semanais
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Meta de questões:</label>
          <input
            type="number"
            value={metaQuestoes}
            onChange={(e) => setMetaQuestoes(parseInt(e.target.value))}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Meta de tempo (min):</label>
          <input
            type="number"
            value={metaTempo}
            onChange={(e) => setMetaTempo(parseInt(e.target.value))}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm mb-1">
          Questões feitas: <strong>{totalQuestoes}/{metaQuestoes}</strong> ({pctQuestoes}%)
        </p>
        <div className="w-full h-4 bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${pctQuestoes}%` }}
          ></div>
        </div>
      </div>

      <div>
        <p className="text-sm mb-1">
          Tempo de estudo: <strong>{totalTempo}/{metaTempo} min</strong> ({pctTempo}%)
        </p>
        <div className="w-full h-4 bg-gray-200 rounded">
          <div
            className="h-full bg-green-500 rounded transition-all duration-300"
            style={{ width: `${pctTempo}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PainelMetas;
