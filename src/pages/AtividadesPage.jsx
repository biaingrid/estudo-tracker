// src/pages/AtividadesPage.jsx
import React from "react";
import ActivityForm from "../componentes/activityform";
import ActivityTable from "../componentes/activitytable";

export default function AtividadesPage({ atividades, setAtividades }) {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ActivityForm onAdicionar={(nova) => setAtividades((prev) => [...prev, nova])} />
      <ActivityTable atividades={atividades} setAtividades={setAtividades} />
    </div>
  );
}
