'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-navy">
          <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="w-3 h-3 bg-white rounded-full block" />
          </span>
          QuickHire
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-body">
          <Link href="/jobs"       className="hover:text-primary transition-colors">Find Jobs</Link>
          <Link href="/#categories" className="hover:text-primary transition-colors">Browse Categories</Link>
          <Link href="/admin"      className="hover:text-primary transition-colors">Admin</Link>
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/admin" className="text-sm font-semibold text-navy hover:text-primary transition-colors">
            Post a Job
          </Link>
          <Link href="/jobs" className="btn-primary text-sm py-2 px-5">
            Find Jobs
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/jobs"        onClick={() => setOpen(false)} className="text-gray-body hover:text-primary">Find Jobs</Link>
          <Link href="/#categories" onClick={() => setOpen(false)} className="text-gray-body hover:text-primary">Browse Categories</Link>
          <Link href="/admin"       onClick={() => setOpen(false)} className="text-gray-body hover:text-primary">Admin Panel</Link>
          <Link href="/admin"       onClick={() => setOpen(false)} className="btn-primary text-center text-sm">Post a Job</Link>
        </div>
      )}
    </nav>
  );
}