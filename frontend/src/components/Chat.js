import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        // Add user message immediately
        setChat([...chat, { user: "You", text: message }]);

        const response = await axios.post("http://localhost:5000/api/chat", {
          message: message,
        });

        // Add AI response when received
        setChat((prevChat) => [
          ...prevChat,
          { user: "AI", text: response.data.reply }, // Changed from response.data.response to response.data.reply
        ]);

        setMessage("");
      } catch (error) {
        console.error("Chat error:", error);
        // Add error message to chat
        setChat((prevChat) => [
          ...prevChat,
          {
            user: "System",
            text: "Sorry, there was an error getting the response.",
          },
        ]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.user.toLowerCase()}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything..."
        />
        <div className="chat-actions">
          <button className="action-btn">
            <span>🔄</span>
          </button>
          <button className="action-btn">
            <span>📋</span>
          </button>
          <button className="send-btn" onClick={sendMessage}>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
