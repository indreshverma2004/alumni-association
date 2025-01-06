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
      const newMsg = { content: newMessage, createdAt: new Date().toISOString() }; // Add createdAt locally
      const response = await axios.post(
        `http://localhost:5000/api/messages/${groupId}/messages`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, { ...response.data, createdAt: newMsg.createdAt }]); // Use local createdAt
      setNewMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Group Messages</h1>
      {loading && <p style={styles.loading}>Loading messages...</p>}
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.messageContainer}>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} style={styles.message}>
              <p style={styles.messageContent}>{msg.content}</p>
              <small style={styles.messageTimestamp}>
                {new Date(msg.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p style={styles.noMessages}>No messages yet. Start the conversation!</p>
        )}
      </div>
      <form onSubmit={handlePostMessage} style={styles.form}>
        <input
          type="text"
          placeholder="Write a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    color: "#555",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
  messageContainer: {
    margin: "20px 0",
    maxHeight: "300px",
    overflowY: "auto",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  message: {
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#e9f5ff",
    borderRadius: "5px",
  },
  messageContent: {
    margin: 0,
  },
  messageTimestamp: {
    display: "block",
    marginTop: "5px",
    fontSize: "12px",
    color: "#888",
  },
  noMessages: {
    textAlign: "center",
    color: "#777",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    marginRight: "10px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default GroupMessages;
