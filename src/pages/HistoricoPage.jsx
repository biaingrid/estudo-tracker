import React from "react";
import HistoricoRevisoes from "../componentes/historicoRevisoes";
import { Link } from "react-router-dom";

function HistoricoPage({ historico }) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        ✅ Histórico de Revisões
      </h1>
      <div className="text-center mb-6">
        <Link to="/" className="text-blue-600 underline">
          ← Voltar para o Painel
        </Link>
      </div>
      <HistoricoRevisoes revisoes={historico} />
    </div>
  );
}

export default HistoricoPage;