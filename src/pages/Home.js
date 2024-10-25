import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await axios.get('http://localhost:7000/api/user/v1/get-users');
      setFriends(response.data);
    };
    fetchFriends();
  }, []);

  const increasePoints = async (friendId) => {
    await axios.patch(`http://localhost:7000/api/user/v1/claim-points`, { userId: friendId });
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Friends</h1>
      <ul>
        {friends.map(friend => (
          <li key={friend.id} className="flex justify-between items-center">
            <span>{friend.name}</span>
            <span>{friend.points} points</span>
            <button onClick={() => increasePoints(friend.id)} className="ml-2 p-1 bg-blue-500 text-white rounded">
              Increase Points
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;