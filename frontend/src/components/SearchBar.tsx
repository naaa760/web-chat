import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

interface ChatMessage {
  user: string;
  text: string;
}

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    if (query.trim()) {
      try {
        const response = await axios.post("http://localhost:5000/api/chat", {
          message: query,
        });
        setChat([
          ...chat,
          { user: "You", text: query },
          { user: "AI", text: response.data.response },
        ]);
        setQuery("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="search-container">
      <div className="chat-messages">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.user.toLowerCase()}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Ask anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="search-actions">
          <button className="action-btn">
            <span>Auto</span>
          </button>
          <button className="action-btn">
            <span>🌐</span>
          </button>
          <button className="action-btn">
            <span>🔗</span>
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
