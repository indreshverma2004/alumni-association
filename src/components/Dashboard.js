import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/groups", {
          headers: { Authorization: `Bearer ${token}` }
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
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div>
      <h1>Groups</h1>
      <ul>
        {groups.map((group) => (
          <li key={group._id} onClick={() => handleGroupClick(group._id)}>
            {group.name}
          </li>
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
