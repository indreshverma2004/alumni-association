import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/groups", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/groups",
        { name: newGroup },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroups([...groups, response.data]); // Add the newly created group to the list
      setNewGroup("");
      setShowCreateGroup(false); // Close the creation input
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Groups</h1>
        <button
          style={styles.createGroupButton}
          onClick={() => setShowCreateGroup((prev) => !prev)}
        >
          + Create Group
        </button>
      </header>
      {showCreateGroup && (
        <div style={styles.createGroupContainer}>
          <input
            type="text"
            placeholder="Enter Group Name"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            style={styles.createGroupInput}
          />
          <button onClick={handleCreateGroup} style={styles.createGroupSubmit}>
            Add
          </button>
        </div>
      )}
      <ul style={styles.groupList}>
        {groups.map((group) => (
          <li
            key={group._id}
            onClick={() => handleGroupClick(group._id)}
            style={styles.groupItem}
          >
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    margin: 0,
    fontSize: "24px",
    color: "#333",
  },
  createGroupButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  createGroupContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    gap: "10px",
  },
  createGroupInput: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  createGroupSubmit: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  groupList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    borderTop: "1px solid #ddd",
  },
  groupItem: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    marginTop: "10px",
    transition: "background-color 0.2s ease",
  },
  groupItemHover: {
    backgroundColor: "#e9f5ff",
  },
};

export default Dashboard;
