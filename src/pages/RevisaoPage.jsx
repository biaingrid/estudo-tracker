import React from "react";
import PainelRevisoes from "../componentes/painelRevisoes";
import CalendarioRevisoes from "../componentes/calendarioRevisoes";

export default function RevisaoPage({ atividades, onConcluir }) {
  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <CalendarioRevisoes atividades={atividades} />
      <PainelRevisoes atividades={atividades} onConcluir={onConcluir} />
    </div>
  );
}
