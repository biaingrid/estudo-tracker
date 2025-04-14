import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./componentes/Header";
import GraficoDesempenho from "./componentes/graficoDesempenho";
import GraficoTempo from "./componentes/graficoTempo";
import GraficoQuestoes from "./componentes/graficoQuestoes";
import GraficoTopTemas from "./componentes/graficoTopTemas";
import HistoricoRevisoes from "./componentes/historicoRevisoes";
import RevisaoPage from "./pages/RevisaoPage";
import AtividadesPage from "./pages/AtividadesPage";
import ResumoQuestoes from "./componentes/ResumoQuestoes";
import GraficoMetas from "./componentes/graficoMetas";
import PainelMetas from "./componentes/painelMetas";

import { db } from "./firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [atividades, setAtividades] = useState([]);
  const [historico, setHistorico] = useState([]);

  // 🔁 Carregar dados do Firebase
  useEffect(() => {
    const carregarFirebase = async () => {
      const atividadesSnap = await getDocs(collection(db, "atividades"));
      const historicoSnap = await getDocs(collection(db, "historicoRevisoes"));

      const atividadesData = atividadesSnap.docs.map((doc) => doc.data());
      const historicoData = historicoSnap.docs.map((doc) => doc.data());

      setAtividades(atividadesData);
      setHistorico(historicoData);
    };

    carregarFirebase();
  }, []);

  // 💾 Salvar atividades automaticamente
  useEffect(() => {
    const salvarAtividades = async () => {
      const ref = collection(db, "atividades");
      atividades.forEach(async (a) => {
        await setDoc(doc(ref, `${a.materia}-${a.tema}-${a.data}`), a);
      });
    };
    if (atividades.length > 0) salvarAtividades();
  }, [atividades]);

  // 💾 Salvar histórico de revisões automaticamente
  useEffect(() => {
    const salvarHistorico = async () => {
      const ref = collection(db, "historicoRevisoes");
      historico.forEach(async (h) => {
        await setDoc(doc(ref, `${h.tema}-${h.data}`), h);
      });
    };
    if (historico.length > 0) salvarHistorico();
  }, [historico]);

  // ✅ Concluir revisão e programar nova
  const concluirRevisao = (temaAlvo, novaAtividade) => {
    const atualizado = atividades.map((a) => {
      const nomeTema = `${a.materia} - ${a.tema}`;
      if (nomeTema === temaAlvo && a.revisao) {
        const concluida = {
          tema: nomeTema,
          data: a.revisao.para,
          qtd: a.revisao.qtd,
        };
        setHistorico((prev) => [...prev, concluida]);

        return {
          ...a,
          revisao: novaAtividade.novaRevisao,
          feitas: novaAtividade.feitas,
          certas: novaAtividade.certas,
          tempo: novaAtividade.tempo,
          data: new Date().toLocaleDateString("pt-BR"),
        };
      }
      return a;
    });

    setAtividades(atualizado);
  };

  return (
    <BrowserRouter>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-6 max-w-6xl mx-auto">
                <ResumoQuestoes atividades={atividades} />
                <PainelMetas atividades={atividades} />
                <GraficoDesempenho atividades={atividades} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GraficoQuestoes atividades={atividades} />
                  <GraficoTempo atividades={atividades} />
                </div>
                <GraficoTopTemas atividades={atividades} />
                <GraficoMetas />
              </div>
            }
          />
          <Route
            path="/atividades"
            element={
              <AtividadesPage
                atividades={atividades}
                setAtividades={setAtividades}
              />
            }
          />
          <Route
            path="/revisoes"
            element={
              <RevisaoPage
                atividades={atividades}
                onConcluir={concluirRevisao}
              />
            }
          />
          <Route
            path="/historico"
            element={<HistoricoRevisoes revisoes={historico} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
