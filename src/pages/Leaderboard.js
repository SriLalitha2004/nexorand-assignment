import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:7000/api/user/v1/get-users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const fetchHistory = async (userId) => {
    const response = await axios.post(`http://localhost:7000/api/user/v1/your-history`, { userId });
    setHistory(response.data);
    setSelectedUser(userId);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Leaderboard</h1>
      <ul>
        {users.sort((a, b) => b.points - a.points).map(user => (
          <li key={user.id} className="flex justify-between items-center">
            <span>{user.name}</span>
            <span>{user.points} points</span>
            <button onClick={() => fetchHistory(user.id)} className="ml-2 p-1 bg-green-500 text-white rounded">
              View History
            </button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div className="modal">
          <h2>Point History for User ID: {selectedUser}</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry.date}: {entry.points} points</li>
            ))}
          </ul>
          <button onClick={() => setSelectedUser(null)} className="mt-2 p-1 bg-red-500 text-white rounded">Close</button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;