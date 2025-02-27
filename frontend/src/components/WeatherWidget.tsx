import React from "react";
import "./WeatherWidget.css";

export const WeatherWidget: React.FC = () => {
  return (
    <div className="weather-widget">
      <span>30°C</span>
      <span>Sunny</span>
    </div>
  );
};
