import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TripProfileForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelStyle: '',
    bio: '',
    profileURL: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('❌ You must be logged in to continue.');
      return;
    }

    try {
      // 🔁 Save Trip Profile
      const res = await axios.put(
        'http://localhost:5000/api/auth/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('✅ Trip profile saved successfully!');

      // 🔗 Auto-Match with other users
      await axios.post(
        'http://localhost:5000/api/match/auto-match',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('💫 Matching complete!');
      navigate('/matchmaking'); // redirect on success
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      toast.error('❌ Failed to save trip profile or match');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-yellow-700 mb-4 text-center">
          ✈️ Create Your Travel Profile
        </h2>

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="flex-1 border p-2 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="flex-1 border p-2 rounded"
          />
        </div>

        <input
          type="text"
          name="travelStyle"
          placeholder="Travel Style (e.g. Relaxed, Adventurous)"
          value={formData.travelStyle}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <input
          type="text"
          name="profileURL"
          placeholder="Profile Image URL"
          value={formData.profileURL}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
        >
          Save & Match
        </button>
      </form>
    </div>
  );
};

export default TripProfileForm;
