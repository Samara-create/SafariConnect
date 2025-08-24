// src/pages/TripPlanner.js
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FaCalendarPlus, FaDownload, FaPrint, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

const ymd = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  if (Number.isNaN(dt)) return '';
  return dt.toISOString().slice(0, 10);
};
const friendly = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

const toGCalDate = (d) => (d ? new Date(d).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '');

const Empty = ({ title = 'No trips yet', hint = 'Plan a trip to see it here.' }) => (
  <div className="text-center py-16">
    <div className="mx-auto w-16 h-16 rounded-full bg-white/80 shadow flex items-center justify-center text-3xl">🗺️</div>
    <h3 className="mt-4 text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-sm text-gray-500">{hint}</p>
  </div>
);

export default function TripPlanner() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('upcoming'); // upcoming | past | all
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  // Fetch trips (supports either start/end dates or a single "date" field)
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/api/trips`, {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const items = (res.data || []).map((t) => {
          const start = t.startDate || t.date || t.beginDate;
          const end = t.endDate || t.date || t.finishDate || start;
          return {
            id: t._id || `${t.destination}-${start}`,
            destination: t.destination || '—',
            location: t.destination || '',
            startDate: ymd(start),
            endDate: ymd(end),
            rawStart: start,
            rawEnd: end,
            notes: t.notes || t.description || '',
            status: t.status || 'planned',
          };
        });

        items.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setTrips(items);
      } catch (err) {
        console.error('Error loading trips:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const { stats, filtered } = useMemo(() => {
    const today = new Date(ymd(new Date()));
    let upcoming = 0;

    const normalized = trips.map((t) => ({
      ...t,
      isPast: new Date(t.endDate || t.startDate) < today,
    }));

    const filtered = normalized
      .filter((t) => {
        const matchesQ =
          !q.trim() ||
          t.destination.toLowerCase().includes(q.trim().toLowerCase()) ||
          (t.notes || '').toLowerCase().includes(q.trim().toLowerCase());
        if (!matchesQ) return false;
        if (tab === 'upcoming') return !t.isPast;
        if (tab === 'past') return t.isPast;
        return true;
      })
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    upcoming = normalized.filter((t) => !t.isPast).length;

    const nextTrip = normalized.find((t) => !t.isPast);

    return {
      stats: {
        total: trips.length,
        upcoming,
        next: nextTrip ? friendly(nextTrip.startDate) : '—',
      },
      filtered,
    };
  }, [trips, tab, q]);

  const exportICS = () => {
    // Simple all-day ICS export
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SafariConnect//Itinerary//EN',
    ];

    filtered.forEach((t, i) => {
      const start = (t.startDate || '').replace(/-/g, '');
      const end = (t.endDate || t.startDate || '').replace(/-/g, '');
      if (!start) return;
      lines.push(
        'BEGIN:VEVENT',
        `UID:${t.id || i}@safariconnect`,
        `DTSTAMP:${toGCalDate(new Date())}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end || start}`,
        `SUMMARY:Trip to ${t.destination}`,
        `LOCATION:${t.location || t.destination}`,
        `DESCRIPTION:${(t.notes || '').replace(/\n/g, '\\n')}`,
        'END:VEVENT'
      );
    });

    lines.push('END:VCALENDAR');

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itinerary_${new Date().toISOString().slice(0, 10)}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const gcalUrl = (t) => {
    const start = (t.startDate || '').replace(/-/g, '') + 'T090000Z';
    const end = (t.endDate || t.startDate || '').replace(/-/g, '') + 'T170000Z';
    const text = encodeURIComponent(`Trip to ${t.destination}`);
    const details = encodeURIComponent(t.notes || '');
    const location = encodeURIComponent(t.location || t.destination || '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-emerald-800">Your Trip Itinerary 📅</h2>
            <p className="text-gray-600">All your plans and dates in one neat place.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportICS}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
              title="Download .ics"
            >
              <FaDownload /> Export .ics
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black"
              title="Print itinerary"
            >
              <FaPrint /> Print
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow border">
            <p className="text-xs text-gray-500">Total Trips</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow border">
            <p className="text-xs text-gray-500">Upcoming</p>
            <p className="text-2xl font-bold text-emerald-700">{stats.upcoming}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow border">
            <p className="text-xs text-gray-500">Next Trip</p>
            <p className="text-2xl font-bold">{stats.next}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div className="flex gap-2">
            {['upcoming', 'past', 'all'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === t ? 'bg-emerald-600 text-white shadow' : 'bg-white border'
                }`}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search destination or notes…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border bg-white"
            />
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow border p-4">
          {loading ? (
            <div className="animate-pulse space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded"></div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <Empty
              title={tab === 'past' ? 'No past trips' : tab === 'upcoming' ? 'No upcoming trips' : 'No trips yet'}
              hint="Use Matchmaking or Trip Planner to add some adventures!"
            />
          ) : (
            <ul className="divide-y">
              {filtered.map((t) => (
                <li key={t.id} className="py-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-lg">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Trip to {t.destination}{' '}
                          <span
                            className={`ml-2 align-middle text-xs px-2 py-1 rounded-full ${
                              t.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-700'
                                : t.status === 'cancelled'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {t.status}
                          </span>
                        </h4>
                        <p className="text-sm text-gray-600">
                          {friendly(t.startDate)}
                          {t.endDate && t.endDate !== t.startDate ? ` — ${friendly(t.endDate)}` : ''}
                        </p>
                        {t.notes ? <p className="text-sm text-gray-600 mt-1">{t.notes}</p> : null}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <a
                        href={gcalUrl(t)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50"
                        title="Add to Google Calendar"
                      >
                        <FaCalendarPlus /> Add to Google
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/trip-planner')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 shadow"
          >
            Plan a new trip
          </button>
        </div>
      </div>
    </div>
  );
}
