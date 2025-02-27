import React, { useEffect, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { WeatherWidget } from "./components/WeatherWidget";
import { NewsWidget } from "./components/NewsWidget";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const createStar = (x: number, y: number) => {
      const star = document.createElement("div");
      star.className = "cursor-star";
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      cursor.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 1000);
    };

    const onMouseMove = (e: MouseEvent) => {
      createStar(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="app-container">
      <div ref={cursorRef} className="cursor-trail" />
      <div className="shooting-star" />
      <Sidebar />
      <main className="main-content">
        <h1 className="main-title">What do you want to know?</h1>
        <Chat />
        <div className="widgets-container">
          <WeatherWidget />
          <NewsWidget />
        </div>
      </main>
    </div>
  );
}

export default App;
