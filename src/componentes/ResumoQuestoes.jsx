// src/componentes/ResumoQuestoes.jsx
import React from "react";

export default function ResumoQuestoes({ atividades }) {
  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 6);
  const inicioDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const totalGeral = atividades.reduce((sum, a) => sum + (a.feitas || 0), 0);
  const totalSemana = atividades.reduce((sum, a) => {
    const [d, m, y] = a.data.split("/").map(Number);
    const data = new Date(y, m - 1, d);
    return data >= seteDiasAtras && data <= hoje ? sum + (a.feitas || 0) : sum;
  }, 0);
  const totalMes = atividades.reduce((sum, a) => {
    const [d, m, y] = a.data.split("/").map(Number);
    const data = new Date(y, m - 1, d);
    return data >= inicioDoMes && data <= hoje ? sum + (a.feitas || 0) : sum;
  }, 0);

  const cards = [
    { label: "Total Geral", valor: totalGeral, cor: "bg-blue-100 dark:bg-blue-900", icon: "📘" },
    { label: "Essa Semana", valor: totalSemana, cor: "bg-green-100 dark:bg-green-900", icon: "📅" },
    { label: "Este Mês", valor: totalMes, cor: "bg-purple-100 dark:bg-purple-900", icon: "🗓️" },
  ];

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-300 text-center">
        Questões Feitas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`${card.cor} text-center rounded-lg shadow-md p-4 text-gray-800 dark:text-gray-100`}
          >
            <div className="text-2xl">{card.icon}</div>
            <h3 className="text-sm font-semibold mt-1">{card.label}</h3>
            <p className="text-xl font-bold">{card.valor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
