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

function GraficoTempo({ atividades }) {
  const tempoPorData = {};

  atividades.forEach((a) => {
    if (!tempoPorData[a.data]) {
      tempoPorData[a.data] = 0;
    }
    tempoPorData[a.data] += a.tempo;
  });

  const dados = Object.entries(tempoPorData).map(([data, tempo]) => ({
    data,
    tempo,
  }));

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-center mb-4">Tempo de Estudo por Dia (min)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} min`} />
          <Bar dataKey="tempo" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoTempo;