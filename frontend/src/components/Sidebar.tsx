import React from "react";
import "./Sidebar.css";

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <button className="new-thread-btn">
        <span>New Thread</span>
        <span className="shortcut">Ctrl + I</span>
      </button>
      <nav className="nav-menu">
        <a href="#" className="nav-item active">
          Home
        </a>
        <a href="#" className="nav-item">
          Discover
        </a>
        <a href="#" className="nav-item">
          Spaces
        </a>
        <a href="#" className="nav-item">
          Library
        </a>
      </nav>
    </aside>
  );
};
