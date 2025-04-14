import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function GraficoQuestoes({ atividades }) {
  const feitasPorData = {};

  atividades.forEach((a) => {
    if (!feitasPorData[a.data]) {
      feitasPorData[a.data] = 0;
    }
    feitasPorData[a.data] += a.feitas;
  });

  const dados = Object.entries(feitasPorData).map(([data, feitas]) => ({
    data,
    feitas,
  }));

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-center mb-4">Questões Feitas por Dia</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} questões`} />
          <Bar dataKey="feitas" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoQuestoes;