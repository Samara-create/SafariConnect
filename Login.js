import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      toast.error('Please fill in both email and password.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await login(form); // expects { token, user }
      const token = res.data?.token;
      const user = res.data?.user;

      if (!token || !user) {
        throw new Error('Invalid login response from server');
      }

      // ✅ Store required values in localStorage
      localStorage.setItem('userId', user._id);  
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user._id); // ✅ Store user ID here for Matchmaking.js

      const role = user.role || 'user';
      const name = user.name || 'User';

      toast.success(role === 'admin'
        ? `Welcome Admin ${name} 👑`
        : `Welcome back ${name}! 🚀`);

      setTimeout(() => {
        navigate(role === 'admin' ? '/admin/dashboard' : '/explore');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      console.error('Login error:', err);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-yellow-300 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-orange-600">
          Welcome Back to SafariConnect 👋
        </h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
            className="w-full border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-full shadow-lg transition"
        >
          {submitting ? 'Logging in...' : 'Log In'}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          New to SafariConnect?{' '}
          <a href="/signup" className="text-orange-600 font-medium hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
