// src/components/RateUserModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

export default function RateUserModal({ rateeId, matchId, onClose, onDone }) {
  const [score, setScore] = useState(5);
  const [review, setReview] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      await axios.post(`${API}/api/ratings`, { rateeId, score, review, matchId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onDone?.();
      onClose?.();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to submit rating');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-5 w-[420px] shadow-xl">
        <h3 className="text-lg font-semibold mb-3">Rate your experience</h3>
        <div className="flex gap-2 mb-3">
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              onClick={() => setScore(n)}
              className={`text-2xl ${n <= score ? 'text-yellow-500' : 'text-gray-300'}`}
              aria-label={`${n} star`}
            >★</button>
          ))}
        </div>
        <textarea
          className="w-full border rounded-xl p-3 mb-4"
          rows={3}
          placeholder="Leave an optional review"
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded-xl border" onClick={onClose}>Cancel</button>
          <button
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
            onClick={submit}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
