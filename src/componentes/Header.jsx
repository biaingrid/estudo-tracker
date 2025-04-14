import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 transition ${
      pathname === path ? "bg-blue-200 dark:bg-gray-700 font-semibold" : ""
    }`;

  return (
    <header className="bg-white dark:bg-gray-900 border-b shadow-sm fixed top-0 w-full z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-300">📘 Estudo Tracker</h1>
        
        <nav className="space-x-2 text-sm">
          <Link to="/" className={linkClass("/")}>Painel</Link>
          <Link to="/atividades" className={linkClass("/atividades")}>Estudos</Link>
          <Link to="/revisoes" className={linkClass("/revisoes")}>Revisões</Link>
          <Link to="/historico" className={linkClass("/historico")}>Histórico</Link>
        </nav>

        <button
          onClick={toggleTheme}
          className="ml-4 text-sm px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? "🌙 Modo Escuro" : "🌞 Modo Claro"}
        </button>
      </div>
    </header>
  );
}

export default Header;
