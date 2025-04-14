import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";

export default function GraficoDesempenho({ atividades }) {
  const { darkMode } = useTheme();

  const dadosPorTema = atividades.reduce((acc, a) => {
    const chave = a.tema;
    if (!acc[chave]) {
      acc[chave] = { tema: a.tema, certas: 0, feitas: 0 };
    }
    acc[chave].feitas += a.feitas;
    acc[chave].certas += a.certas;
    return acc;
  }, {});

  const dados = Object.values(dadosPorTema).map((d) => ({
    tema: d.tema,
    percentual: d.feitas > 0 ? Math.round((d.certas / d.feitas) * 100) : 0,
  }));

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-center mb-4 text-blue-600 dark:text-blue-300">
        📊 Desempenho por Tema (%)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
          <XAxis dataKey="tema" stroke={darkMode ? "#d1d5db" : "#374151"} />
          <YAxis stroke={darkMode ? "#d1d5db" : "#374151"} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              color: darkMode ? "#f3f4f6" : "#111827",
            }}
          />
          <Bar dataKey="percentual" fill={darkMode ? "#60a5fa" : "#3b82f6"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
