'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-[#D6DDEB] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#202430]">
          <span className="w-8 h-8 bg-[#4640DE] rounded-full flex items-center justify-center">
            <span className="w-3 h-3 bg-white rounded-full block" />
          </span>
          QuickHire
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#515B6F]">
          <Link href="/jobs"        className="hover:text-[#4640DE] transition-colors">Find Jobs</Link>
          <Link href="/#categories" className="hover:text-[#4640DE] transition-colors">Browse Categories</Link>
          {isLoggedIn && isAdmin && (
            <Link href="/admin" className="hover:text-[#4640DE] transition-colors">Admin</Link>
          )}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="bg-[#4640DE] text-white text-sm px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition-colors">
                  + Post a Job
                </Link>
              )}
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <div className="w-8 h-8 rounded-full bg-[#4640DE] flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-[#202430]">{user?.name}</span>
                <ChevronDown size={14} className="text-[#7C8493]" />
                {/* Dropdown */}
                <div className="absolute top-10 right-0 bg-white border border-[#D6DDEB] rounded-lg shadow-lg py-2 w-40 hidden group-hover:block">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/login"    className="text-sm font-semibold text-[#202430] hover:text-[#4640DE] transition-colors">Login</Link>
              <Link href="/register" className="bg-[#4640DE] text-white text-sm px-5 py-2 rounded font-semibold hover:bg-indigo-700 transition-colors">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#D6DDEB] bg-white px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/jobs"        onClick={() => setOpen(false)} className="text-[#515B6F] hover:text-[#4640DE]">Find Jobs</Link>
          <Link href="/#categories" onClick={() => setOpen(false)} className="text-[#515B6F] hover:text-[#4640DE]">Browse Categories</Link>
          {isLoggedIn && isAdmin && (
            <Link href="/admin" onClick={() => setOpen(false)} className="text-[#515B6F] hover:text-[#4640DE]">Admin Panel</Link>
          )}
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); setOpen(false); }} className="text-left text-red-500">Logout</button>
          ) : (
            <>
              <Link href="/login"    onClick={() => setOpen(false)} className="text-[#202430] font-semibold">Login</Link>
              <Link href="/register" onClick={() => setOpen(false)} className="bg-[#4640DE] text-white text-center py-2 rounded font-semibold">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}