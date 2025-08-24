// src/components/UserRatings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

const Stars = ({ value = 0, className = '' }) => {
  const rounded = Math.round(value);
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1,2,3,4,5].map(n => (
        <span key={n} className={`${n <= rounded ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
      ))}
    </div>
  );
};

export default function UserRatings({ userId, refreshKey = 0, limit = 5 }) {
  const [summary, setSummary] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const auth = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  useEffect(() => {
    if (!userId) return;
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [s, r] = await Promise.all([
          axios.get(`${API}/api/ratings/user/${userId}/summary`, auth),
          axios.get(`${API}/api/ratings/user/${userId}?page=1&limit=${limit}`, auth),
        ]);
        if (!mounted) return;
        setSummary(s.data || { avg: 0, count: 0, breakdown: [] });
        setRatings(r.data?.ratings || []);
      } catch (e) {
        // silent fail is fine for sidebar widget
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [userId, refreshKey]); // 🔁 re-fetch after you submit a rating

  if (!userId) return null;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow border">
        <div className="animate-pulse h-24 bg-gray-100 rounded"></div>
      </div>
    );
  }

  const total = summary?.count || 0;
  const avg = summary?.avg || 0;
  const breakdown = summary?.breakdown || [];
  const byStar = Object.fromEntries(breakdown.map(b => [b._id, b.count]));
  const bar = (n) => {
    if (!total) return 0;
    return Math.round(((byStar[n] || 0) / total) * 100);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow border">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-3xl font-bold">{avg || 0}</div>
          <Stars value={avg} className="text-lg" />
          <div className="text-xs text-gray-500">{total} review{total === 1 ? '' : 's'}</div>
        </div>
        <div className="w-44 space-y-1">
          {[5,4,3,2,1].map(star => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs w-4 text-gray-500">{star}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded">
                <div className="h-2 bg-yellow-400 rounded" style={{ width: `${bar(star)}%` }}></div>
              </div>
              <span className="text-xs text-gray-400 w-8 text-right">{byStar[star] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {ratings.length ? (
        <ul className="divide-y">
          {ratings.map((r) => (
            <li key={r._id} className="py-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{r.rater?.name || 'Anonymous'}</span>
                    <Stars value={r.score} />
                  </div>
                  {r.review ? <p className="text-sm text-gray-600 mt-1">{r.review}</p> : null}
                </div>
                <div className="text-xs text-gray-400">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-gray-500">No reviews yet.</div>
      )}
    </div>
  );
}
