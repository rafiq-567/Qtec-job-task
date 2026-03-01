'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form,    setForm]    = useState({ name: '', email: '', password: '', role: 'user' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await api.register(form);
    if (res.success) {
      login(res.data, res.token);
      router.push('/');
    } else {
      setError(res.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F8FD] flex items-center justify-center px-4">
      <div className="bg-white border border-[#D6DDEB] rounded-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-[#202430] mb-8">
          <span className="w-8 h-8 bg-[#4640DE] rounded-full flex items-center justify-center">
            <span className="w-3 h-3 bg-white rounded-full block" />
          </span>
          QuickHire
        </div>

        <h1 className="text-2xl font-bold text-[#202430] mb-1">Create Account</h1>
        <p className="text-[#7C8493] text-sm mb-6">Join QuickHire to find your dream job</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#202430] mb-1">Full Name</label>
            <input type="text" required placeholder="John Doe"
              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#202430] mb-1">Email Address</label>
            <input type="email" required placeholder="john@email.com"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#202430] mb-1">Password</label>
            <input type="password" required placeholder="Min 6 characters"
              value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
          </div>
          {/* Role selector - for demo purposes */}
          <div>
            <label className="block text-sm font-medium text-[#202430] mb-1">Account Type</label>
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}
              className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE]">
              <option value="user">Job Seeker</option>
              <option value="admin">Employer / Admin</option>
            </select>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#4640DE] text-white py-3 rounded font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-[#7C8493] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#4640DE] font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}