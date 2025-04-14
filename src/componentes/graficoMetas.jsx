// src/componentes/graficoMetas.jsx
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useTheme } from "../context/ThemeContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function GraficoMetas() {
  const { darkMode } = useTheme();
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const col = collection(db, "historicoMetas");
      const snapshot = await getDocs(col);
      const lista = snapshot.docs.map((doc) => doc.data());

      const ordenado = lista.sort((a, b) => {
        const [da, ma, ya] = a.semana.split("/").map(Number);
        const [db, mb, yb] = b.semana.split("/").map(Number);
        return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db);
      });

      setDados(ordenado);
    };

    carregar();
  }, []);

  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700 dark:text-blue-300">
        📈 Histórico de Metas Semanais
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#334155" : "#e2e8f0"}
          />
          <XAxis
            dataKey="semana"
            stroke={darkMode ? "#cbd5e1" : "#334155"}
            fontSize={12}
          />
          <YAxis stroke={darkMode ? "#cbd5e1" : "#334155"} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1e293b" : "#f9fafb",
              color: darkMode ? "#f8fafc" : "#0f172a",
            }}
          />
          <Line
            type="monotone"
            dataKey="questoes"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Questões feitas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
