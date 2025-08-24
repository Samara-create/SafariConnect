import React, { useState, useEffect } from 'react';
import {
  FaUsers, FaHeart, FaPlane, FaComments, FaChartBar,
  FaUserCog, FaTrash, FaDownload, FaSyncAlt, FaSearch
} from 'react-icons/fa';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const Pill = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
      ${active
        ? 'bg-emerald-600 text-white shadow'
        : 'bg-white/70 text-gray-700 hover:bg-white border'}`
    }
  >
    {children}
  </button>
);

const StatCard = ({ icon, label, value, sub }) => (
  <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-md border border-white/40">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-emerald-50">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {sub ? <p className="text-xs text-gray-400 mt-1">{sub}</p> : null}
      </div>
    </div>
  </div>
);

const Skeleton = ({ rows = 5 }) => (
  <div className="animate-pulse space-y-2">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="h-10 bg-gray-200/60 rounded"></div>
    ))}
  </div>
);

const EmptyState = ({ title = 'Nothing here yet', hint = 'Try adjusting filters or come back later.' }) => (
  <div className="text-center py-14">
    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <FaChartBar className="text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{hint}</p>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);

  const [users, setUsers] = useState([]);
  const [userQuery, setUserQuery] = useState('');

  const [matches, setMatches] = useState([]);
  const [trips, setTrips] = useState([]);

  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    handleTabChange('dashboard');
    // eslint-disable-next-line
  }, []);

  // --------- fetchers ----------
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/admin/dashboard`, authHeader);
      setStats(res.data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async (page = 1, q = '') => {
    try {
      setTableLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/admin/users?page=${page}&limit=10&query=${encodeURIComponent(q)}`,
        authHeader
      );
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error loading users:', err);
    } finally {
      setTableLoading(false);
    }
  };

  const loadMatches = async (page = 1) => {
    try {
      setTableLoading(true);
      const res = await axios.get(`${BASE_URL}/api/admin/matches?page=${page}&limit=10`, authHeader);
      setMatches(res.data.matches || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error loading matches:', err);
    } finally {
      setTableLoading(false);
    }
  };

  const loadTrips = async (page = 1) => {
    try {
      setTableLoading(true);
      const res = await axios.get(`${BASE_URL}/api/admin/trips?page=${page}&limit=10`, authHeader);
      setTrips(res.data.trips || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error loading trips:', err);
    } finally {
      setTableLoading(false);
    }
  };

  // --------- actions ----------
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    if (tab === 'users') loadUsers(1, userQuery);
    else if (tab === 'matches') loadMatches();
    else if (tab === 'trips') loadTrips();
    else loadDashboardData();
  };

  const refreshTab = () => {
    if (activeTab === 'dashboard') loadDashboardData();
    if (activeTab === 'users') loadUsers(currentPage, userQuery);
    if (activeTab === 'matches') loadMatches(currentPage);
    if (activeTab === 'trips') loadTrips(currentPage);
  };

  const handleUserStatusToggle = async (userId, currentStatus) => {
    try {
      await axios.put(`${BASE_URL}/api/admin/users/${userId}/status`, { isActive: !currentStatus }, authHeader);
      loadUsers(currentPage, userQuery);
    } catch (err) {
      console.error('Error updating user status:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`${BASE_URL}/api/admin/users/${userId}`, authHeader);
      loadUsers(currentPage, userQuery);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleDeleteMatch = async (matchId) => {
    if (!window.confirm('Delete this match?')) return;
    try {
      await axios.delete(`${BASE_URL}/api/admin/matches/${matchId}`, authHeader);
      loadMatches(currentPage);
    } catch (err) {
      console.error('Error deleting match:', err);
    }
  };

  const exportData = async (type) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/export/${type}`, authHeader);
      const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_data_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
    } catch (err) {
      console.error('Error exporting data:', err);
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-white/60">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage users, matches, trips & insights</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => exportData('users')}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              <FaDownload /> Export Users
            </button>
            <button
              onClick={refreshTab}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900 text-white hover:bg-black"
            >
              <FaSyncAlt /> Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="flex gap-3">
            <Pill active={activeTab === 'dashboard'} onClick={() => handleTabChange('dashboard')}>Dashboard</Pill>
            <Pill active={activeTab === 'users'} onClick={() => handleTabChange('users')}>Users</Pill>
            <Pill active={activeTab === 'matches'} onClick={() => handleTabChange('matches')}>Matches</Pill>
            <Pill active={activeTab === 'trips'} onClick={() => handleTabChange('trips')}>Trips</Pill>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Overview */}
        {activeTab === 'dashboard' && (
          <>
            {loading ? (
              <Skeleton rows={4} />
            ) : stats ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <StatCard icon={<FaUsers className="text-emerald-600" />} label="Total Users" value={stats.overview.totalUsers} />
                  <StatCard icon={<FaHeart className="text-rose-600" />} label="Total Matches" value={stats.overview.totalMatches} />
                  <StatCard icon={<FaPlane className="text-sky-600" />} label="Total Trips" value={stats.overview.totalTrips} />
                  <StatCard icon={<FaComments className="text-indigo-600" />} label="Total Chats" value={stats.overview.totalChats} />
                </div>

                {/* Quick report tiles */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md border border-white/40">
                    <h3 className="font-semibold mb-4">Recent Activity</h3>
                    {stats.recent && stats.recent.length ? (
                      <ul className="divide-y">
                        {stats.recent.slice(0, 6).map((item, i) => (
                          <li key={i} className="py-3 flex items-center justify-between">
                            <span className="text-gray-700">{item.text}</span>
                            <span className="text-xs text-gray-400">{new Date(item.time).toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyState title="No recent activity" hint="Activity will appear here." />
                    )}
                  </div>

                  <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md border border-white/40">
                    <h3 className="font-semibold mb-4">Quick Exports</h3>
                    <div className="space-y-2">
                      <button onClick={() => exportData('users')} className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2">
                        <FaDownload /> Users JSON
                      </button>
                      <button onClick={() => exportData('matches')} className="w-full px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-2">
                        <FaDownload /> Matches JSON
                      </button>
                      <button onClick={() => exportData('trips')} className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-2">
                        <FaDownload /> Trips JSON
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-white/40 p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold">Users</h2>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadUsers(1, userQuery)}
                  placeholder="Search name or email..."
                  className="pl-9 pr-3 py-2 rounded-xl border bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            {tableLoading ? (
              <Skeleton rows={8} />
            ) : users.length ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-gray-50/70">
                          <td className="p-3">{u.name}</td>
                          <td className="p-3">{u.email}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                              ${u.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                              {u.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="inline-flex gap-3">
                              <button
                                onClick={() => handleUserStatusToggle(u._id, u.isActive)}
                                title="Toggle status"
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <FaUserCog />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u._id)}
                                title="Delete user"
                                className="text-red-600 hover:text-red-700"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-500">Page {currentPage} of {totalPages}</p>
                  <div className="inline-flex rounded-xl overflow-hidden border">
                    <button
                      onClick={() => currentPage > 1 && loadUsers(currentPage - 1, userQuery)}
                      className="px-3 py-2 text-sm bg-white hover:bg-gray-50 disabled:opacity-40"
                      disabled={currentPage <= 1}
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => currentPage < totalPages && loadUsers(currentPage + 1, userQuery)}
                      className="px-3 py-2 text-sm bg-white hover:bg-gray-50 disabled:opacity-40"
                      disabled={currentPage >= totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState title="No users found" hint="Try another search." />
            )}
          </div>
        )}

        {/* Matches */}
        {activeTab === 'matches' && (
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-white/40 p-6">
            <h2 className="text-xl font-semibold mb-4">Matches</h2>
            {tableLoading ? (
              <Skeleton rows={8} />
            ) : matches.length ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600">
                        <th className="p-3 text-left">Users</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Destination</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {matches.map((m) => (
                        <tr key={m._id} className="hover:bg-gray-50/70">
                          <td className="p-3">{m.user1?.name} &nbsp;•&nbsp; {m.user2?.name}</td>
                          <td className="p-3 text-center">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                              {m.matchScore ?? m.compatibilityScore ?? '—'}
                            </span>
                          </td>
                          <td className="p-3 text-center">{m.destination || '—'}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleDeleteMatch(m._id)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete match"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-500">Page {currentPage} of {totalPages}</p>
                  <div className="inline-flex rounded-xl overflow-hidden border">
                    <button
                      onClick={() => currentPage > 1 && loadMatches(currentPage - 1)}
                      className="px-3 py-2 text-sm bg-white hover:bg-gray-50 disabled:opacity-40"
                      disabled={currentPage <= 1}
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => currentPage < totalPages && loadMatches(currentPage + 1)}
                      className="px-3 py-2 text-sm bg-white hover:bg-gray-50 disabled:opacity-40"
                      disabled={currentPage >= totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState title="No matches yet" hint="As users start matching, they’ll show here." />
            )}
          </div>
        )}

        {/* Trips */}
        {activeTab === 'trips' && (
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-white/40 p-6">
            <h2 className="text-xl font-semibold mb-4">Trips</h2>
            {tableLoading ? (
              <Skeleton rows={8} />
            ) : trips.length ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600">
                      <th className="p-3 text-left">User</th>
                      <th className="p-3">Destination</th>
                      <th className="p-3">Start</th>
                      <th className="p-3">End</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {trips.map((t) => (
                      <tr key={t._id} className="hover:bg-gray-50/70">
                        <td className="p-3">{t.userId?.name || 'N/A'}</td>
                        <td className="p-3 text-center">{t.destination}</td>
                        <td className="p-3 text-center">{new Date(t.startDate).toLocaleDateString()}</td>
                        <td className="p-3 text-center">{new Date(t.endDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination (if backend paginates trips) */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-500">Page {currentPage} of {totalPages}</p>
                  <div className="inline-flex rounded-xl overflow-hidden border">
                    <button
                      onClick={() => currentPage > 1 && loadTrips(currentPage - 1)}
                      className="px-3 py-2 text-sm bg-white hover:bg-gray-50 disabled:opacity-40"
                      disabled={currentPage <= 1}
                    >
                      Prev
                    </button>
                    <button
                      onClick={() => currentPage < totalPages && loadTrips(currentPage + 1)}
                      className="px-3 py-2 text-sm bg-white hover:bg-gray-50 disabled:opacity-40"
                      disabled={currentPage >= totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState title="No trips logged" hint="Trips will appear once users start planning." />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
