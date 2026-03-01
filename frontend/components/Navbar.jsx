'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, isAdmin, user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    router.push('/');
  };

  if (loading) return <nav className="bg-white border-b border-[#D6DDEB] sticky top-0 z-50 h-16" />;

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

        {/* Desktop right buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link href="/admin" className="bg-[#4640DE] text-white text-sm px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition-colors">
                  + Post a Job
                </Link>
              )}
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#4640DE] flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[#202430]">{user?.name}</span>
                  <ChevronDown size={14} className="text-[#7C8493]" />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-12 right-0 bg-white border border-[#D6DDEB] rounded-lg shadow-lg py-1 w-44 z-50">
                    <div className="px-4 py-2 border-b border-[#D6DDEB]">
                      <p className="text-xs text-[#7C8493]">Signed in as</p>
                      <p className="text-sm font-medium text-[#202430] truncate">{user?.email}</p>
                      <p className="text-xs text-[#4640DE] capitalize">{user?.role}</p>
                    </div>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-[#515B6F] hover:bg-[#F8F8FD]">
                        Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link href="/login"    className="text-sm font-semibold text-[#202430] hover:text-[#4640DE] transition-colors">Login</Link>
              <Link href="/register" className="bg-[#4640DE] text-white text-sm px-5 py-2 rounded font-semibold hover:bg-indigo-700 transition-colors">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#D6DDEB] bg-white px-4 py-4 flex flex-col gap-3 text-sm">
          <Link href="/jobs"        onClick={() => setMenuOpen(false)} className="text-[#515B6F] hover:text-[#4640DE] py-1">Find Jobs</Link>
          <Link href="/#categories" onClick={() => setMenuOpen(false)} className="text-[#515B6F] hover:text-[#4640DE] py-1">Browse Categories</Link>
          {isLoggedIn && isAdmin && (
            <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-[#515B6F] hover:text-[#4640DE] py-1">Admin Panel</Link>
          )}
          {isLoggedIn ? (
            <div className="border-t border-[#D6DDEB] pt-3 mt-1">
              <p className="text-xs text-[#7C8493] mb-2">Signed in as <strong>{user?.name}</strong></p>
              {isAdmin && (
                <Link href="/admin" onClick={() => setMenuOpen(false)}
                  className="block bg-[#4640DE] text-white text-center py-2 rounded font-semibold mb-2">
                  + Post a Job
                </Link>
              )}
              <button onClick={handleLogout} className="text-red-500 text-sm">Logout</button>
            </div>
          ) : (
            <div className="border-t border-[#D6DDEB] pt-3 mt-1 flex flex-col gap-2">
              <Link href="/login"    onClick={() => setMenuOpen(false)} className="text-center border border-[#4640DE] text-[#4640DE] py-2 rounded font-semibold">Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="text-center bg-[#4640DE] text-white py-2 rounded font-semibold">Sign Up</Link>
            </div>
          )}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {dropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />}
    </nav>
  );
}