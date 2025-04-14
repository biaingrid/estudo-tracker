// src/componentes/CalendarioRevisoes.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function formatarData(date) {
  return date.toLocaleDateString("pt-BR");
}

function mesmoMes(data1, data2) {
  return (
    data1.getFullYear() === data2.getFullYear() &&
    data1.getMonth() === data2.getMonth()
  );
}

export default function CalendarioRevisoes({ atividades }) {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const revisoes = atividades
    .filter((a) => a.revisao)
    .map((a) => ({
      ...a,
      dataRevisao: a.revisao.para,
    }));

  const diasComRevisao = revisoes.map((r) => r.dataRevisao);

  const temasDoDia = revisoes.filter(
    (r) => r.dataRevisao === formatarData(dataSelecionada)
  );

  const revisoesDoMes = revisoes.filter((r) => {
    const [dia, mes, ano] = r.dataRevisao.split("/").map(Number);
    const data = new Date(ano, mes - 1, dia);
    return mesmoMes(data, dataSelecionada);
  });

  const tileClassName = ({ date }) => {
    const dataStr = formatarData(date);
    if (dataStr === formatarData(new Date())) return "hoje";
    if (diasComRevisao.includes(dataStr)) return "revisao-agendada";
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <Calendar
          onChange={setDataSelecionada}
          value={dataSelecionada}
          tileClassName={tileClassName}
          calendarType="iso8601"
          locale="pt-BR"
        />
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
            <span>Hoje</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-300"></div>
            <span>Dia com revisão agendada</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow min-h-[200px] col-span-2">
        <h2 className="text-lg font-semibold mb-2">
          Revisões em {formatarData(dataSelecionada)}:
        </h2>
        {temasDoDia.length === 0 ? (
          <p className="text-gray-500 italic">Nenhuma revisão agendada</p>
        ) : (
          <ul className="list-disc pl-4 space-y-1 text-sm mb-6">
            {temasDoDia.map((r, idx) => (
              <li key={idx}>
                <span className="font-medium">{r.materia} - {r.tema}</span> — {r.revisao.qtd} questões
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-md font-semibold mt-6 mb-2">📅 Todas as revisões do mês:</h3>
        {revisoesDoMes.length === 0 ? (
          <p className="text-gray-500 italic">Nenhuma revisão prevista neste mês</p>
        ) : (
          <ul className="list-disc pl-4 space-y-1 text-sm">
            {revisoesDoMes.map((r, idx) => (
              <li key={idx}>
                <span className="font-medium">{r.dataRevisao}</span>: {r.materia} - {r.tema} — {r.revisao.qtd} questões
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
