import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/groups", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGroups(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/groups",
        { name: newGroup },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroups([...groups, { name: newGroup }]);
      setNewGroup("");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Groups</h1>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>{group.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Group Name"
        value={newGroup}
        onChange={(e) => setNewGroup(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
};

export default Dashboard;
