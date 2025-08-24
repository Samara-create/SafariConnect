import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getMatches, getMatchSuggestions, createMatch } from '../utils/api';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api';

const Matchmaking = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [matchedUserIds, setMatchedUserIds] = useState([]);
  const [existingMatches, setExistingMatches] = useState([]);
  const [myDestination, setMyDestination] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [currentUserId] = useState(localStorage.getItem('userId'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    autoMatchNow();
    fetchAllUsers();
    fetchMatches();
    fetchExistingMatches();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const plans = res.data?.travelPlans || [];
      if (plans.length) setMyDestination(plans[0].destination);
    } catch (err) {
      console.error('Failed to load user profile', err);
    }
  };

  const autoMatchNow = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/match/auto-match`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error('❌ Auto-match failed:', err.response?.data || err.message);
    }
  };

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const suggestions = await getMatchSuggestions();
      setMatches(Array.isArray(suggestions) ? suggestions : []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExistingMatches = async () => {
    try {
      const res = await getMatches();
      const matchedIds = res.data.map((match) =>
        match.user1._id === currentUserId ? match.user2._id : match.user1._id
      );
      setMatchedUserIds(matchedIds);
      setExistingMatches(res.data);
    } catch (error) {
      console.error('Error fetching existing matches:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/auth`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(res.data);
    } catch (err) {
      console.error('❌ Failed to load users:', err);
    }
  };
const handleCreateMatch = async (selectedUser) => {
  if (!currentUserId || !selectedUser?._id) {
    toast.error('User IDs missing. Please re-login.');
    return;
  }

  try {
    const user1 = currentUserId;
    const user2 = selectedUser._id;

    const travelPlan = selectedUser.travelPlans?.[0];
    const destination = selectedUser.destination || travelPlan?.destination || 'Unknown';
    const date = travelPlan?.startDate || new Date();

    const compatibilityScore = selectedUser.compatibilityScore || 70;
    const destinationScore = selectedUser.matchDetails?.destinationScore || 40;
    const dateOverlapScore = selectedUser.matchDetails?.dateOverlapScore || 0;
    const interestCompatibilityScore = selectedUser.matchDetails?.interestCompatibilityScore || 0;

    toast.info(`Matching with ${selectedUser.name}... ⏳`);

    const res = await createMatch({
      user1,
      user2,
      destination,
      date,
      compatibilityScore,
      matchDetails: {
        destinationScore,
        dateOverlapScore,
        interestCompatibilityScore,
      },
    });

    setMatchedUserIds((prev) => [...prev, selectedUser._id]);

   toast.success(`🎉 You matched with ${selectedUser.name || selectedUser.username}!`);
setTimeout(() => {
  navigate(`/chat/${res.data.chatRoomId}`, {
    state: { matchId: res.data.chatRoomId }
  });
}, 1500); // Allow time to show toast before redirect


  } catch (err) {
    console.error('❌ Match creation error:', err);
    const errorMsg = err.response?.data?.message || 'Something went wrong. Try again.';
    toast.error(`❌ ${errorMsg}`);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-2">
            Find Your Travel Companion 💕
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with travelers sharing your destination, timeline, and vibe.
          </p>
        </div>

        {myDestination && (
          <div className="text-center mb-4">
            <p className="text-lg text-blue-800">
              🌍 You're headed to <strong>{myDestination}</strong>
            </p>
            <Link to="/explore" className="text-blue-500 hover:underline">
              Update My Trip
            </Link>
          </div>
        )}

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('same-destination')}
            className={`px-4 py-2 rounded ${
              filter === 'same-destination'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700'
            }`}
          >
            Same Destination
          </button>
          <button
            onClick={() => setFilter('high-score')}
            className={`px-4 py-2 rounded ${
              filter === 'high-score'
                ? 'bg-yellow-600 text-white'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            High Score
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-4">All Travelers 🧳</h2>
          <ul className="divide-y divide-gray-200">
            {allUsers
              .filter((user) => user._id !== currentUserId)
              .filter((user) => {
                if (filter === 'same-destination')
                  return user.destination?.toLowerCase() === myDestination?.toLowerCase();
                if (filter === 'high-score') return user.compatibilityScore >= 80;
                return true;
              })
              .map((user, index) => (
                <li
                  key={index}
                  className="py-4 flex justify-between items-center border-b border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        📍 {user.destination || 'No destination set'}
                      </p>
                      <p className="text-sm">
                        Compatibility:{' '}
                        <span
                          className={`font-semibold ${
                            user.compatibilityScore > 80
                              ? 'text-green-600'
                              : user.compatibilityScore > 50
                              ? 'text-yellow-600'
                              : 'text-red-500'
                          }`}
                        >
                          {user.compatibilityScore || 'N/A'}%
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    disabled={matchedUserIds.includes(user._id)}
                    onClick={() => handleCreateMatch(user)}
                    className={`bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded shadow transition-all duration-200 ${
                      matchedUserIds.includes(user._id)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {matchedUserIds.includes(user._id) ? '✔️ Matched' : '🤝 Match'}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Matchmaking;
