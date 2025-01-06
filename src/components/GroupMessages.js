import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GroupMessages = () => {
  const { groupId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/messages/${groupId}/messages`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [groupId]);

  const handlePostMessage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/messages/${groupId}/messages`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <div>
      <h1>Group Messages</h1>
      {loading && <p>Loading messages...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <li key={msg.id}>
              <p>{msg.content}</p>
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>No messages yet. Start the conversation!</p>
        )}
      </ul>
      <form onSubmit={handlePostMessage}>
        <input
          type="text"
          placeholder="Write a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default GroupMessages;
