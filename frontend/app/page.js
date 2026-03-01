'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { api, CATEGORIES } from '../lib/api';
import JobCard from '../components/JobCard';

// SVG icons matching Figma category icons exactly
const CAT_ICONS = {
  Design: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M4 28L12 20M20 4L28 12L14 26L6 26L6 18L20 4Z" stroke="#4640DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Sales: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="18" width="5" height="10" rx="1" stroke="#4640DE" strokeWidth="2"/>
      <rect x="13" y="12" width="5" height="16" rx="1" stroke="#4640DE" strokeWidth="2"/>
      <rect x="22" y="6" width="5" height="22" rx="1" stroke="#4640DE" strokeWidth="2"/>
    </svg>
  ),
  Marketing: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M6 20V12L26 6V26L6 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M6 20L10 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Finance: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="8" width="24" height="18" rx="2" stroke="#4640DE" strokeWidth="2"/>
      <path d="M4 14H28" stroke="#4640DE" strokeWidth="2"/>
      <circle cx="10" cy="20" r="1.5" fill="#4640DE"/>
    </svg>
  ),
  Technology: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="16" rx="2" stroke="#4640DE" strokeWidth="2"/>
      <path d="M10 28H22M16 22V28" stroke="#4640DE" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Engineering: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M8 8L4 16L8 24M24 8L28 16L24 24M12 4L20 28" stroke="#4640DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Business: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="14" width="20" height="14" rx="2" stroke="#4640DE" strokeWidth="2"/>
      <path d="M11 14V10C11 7.79 13.24 6 16 6C18.76 6 21 7.79 21 10V14" stroke="#4640DE" strokeWidth="2"/>
    </svg>
  ),
  'Human Resource': (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="12" cy="10" r="4" stroke="#4640DE" strokeWidth="2"/>
      <circle cx="22" cy="10" r="4" stroke="#4640DE" strokeWidth="2"/>
      <path d="M4 26C4 21.58 7.58 18 12 18" stroke="#4640DE" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 26C28 21.58 24.42 18 20 18H12" stroke="#4640DE" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const CATEGORY_JOB_COUNTS = {
  Design: 235, Sales: 756, Marketing: 140, Finance: 325,
  Technology: 436, Engineering: 542, Business: 211, 'Human Resource': 346,
};

export default function HomePage() {
  const router = useRouter();
  const [search,       setSearch]       = useState('');
  const [location,     setLocation]     = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [latestJobs,   setLatestJobs]   = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    Promise.all([api.getFeaturedJobs(), api.getJobs()])
      .then(([feat, all]) => {
        if (feat.success) setFeaturedJobs(feat.data);
        if (all.success)  setLatestJobs(all.data.slice(0, 8));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (search)   p.set('search', search);
    if (location) p.set('location', location);
    router.push(`/jobs?${p.toString()}`);
  };

  return (
    <div>

      {/* ━━━━━━ HERO ━━━━━━ */}
      <section className="bg-[#F8F8FD] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="max-w-xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#202430] leading-tight">
                Discover<br />more than
                <br />
                <span className="text-[#4640DE]">5000+ Jobs</span>
              </h1>
              {/* Blue squiggly underline — matches Figma */}
              <svg className="mt-1 mb-5" width="220" height="14" viewBox="0 0 220 14" fill="none">
                <path d="M2 10 C30 2, 60 14, 90 6 C120 -2, 150 12, 180 5 C200 0, 210 8, 218 6"
                  stroke="#4640DE" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>

              <p className="text-[#515B6F] text-lg leading-relaxed">
                Great platform for the job seeker that searching for<br />
                new career heights and passionate about startups.
              </p>

              {/* Search bar — matches Figma layout exactly */}
              <form onSubmit={handleSearch} className="mt-8 bg-white border border-[#D6DDEB] rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex items-center gap-3 flex-1 px-4 py-3">
                    <Search size={18} className="text-[#7C8493] shrink-0" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Job title or keyword"
                      className="flex-1 focus:outline-none text-sm text-[#202430] placeholder-[#7C8493]" />
                  </div>
                  <div className="flex items-center gap-3 flex-1 px-4 py-3 sm:border-l border-[#D6DDEB]">
                    <MapPin size={18} className="text-[#7C8493] shrink-0" />
                    <input value={location} onChange={e => setLocation(e.target.value)}
                      placeholder="Florence, Italy"
                      className="flex-1 focus:outline-none text-sm text-[#202430] placeholder-[#7C8493]" />
                  </div>
                  <div className="px-2 py-2">
                    <button type="submit"
                      className="w-full sm:w-auto bg-[#4640DE] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-indigo-700 transition-colors whitespace-nowrap">
                      Search my job
                    </button>
                  </div>
                </div>
              </form>

              <p className="mt-3 text-sm text-[#7C8493]">
                <span className="font-medium text-[#515B6F]">Popular: </span>
                {['UI Designer','UX Researcher','Android','Admin'].map((t, i, arr) => (
                  <Link key={t} href={`/jobs?search=${t}`} className="hover:text-[#4640DE] transition-colors">
                    {t}{i < arr.length - 1 ? ', ' : ''}
                  </Link>
                ))}
              </p>
            </div>

            {/* Right — man image with decorative grid lines (matches Figma) */}
            <div className="hidden lg:block relative h-[480px]">
              {/* Decorative grid rectangles */}
              <svg className="absolute top-10 right-20 opacity-30" width="200" height="250" viewBox="0 0 200 250">
                <rect x="20" y="20" width="160" height="200" fill="none" stroke="#4640DE" strokeWidth="1"/>
                <rect x="50" y="50" width="130" height="170" fill="none" stroke="#4640DE" strokeWidth="1"/>
                <rect x="80" y="80" width="100" height="140" fill="none" stroke="#4640DE" strokeWidth="1"/>
              </svg>
              {/* Person placeholder — in production replace with actual image */}
              <div className="absolute right-0 bottom-0 w-80 h-96 bg-gradient-to-b from-[#E8E7FF] to-[#F8F8FD] rounded-2xl flex items-end justify-center overflow-hidden">
                <div className="text-center pb-8">
                  <div className="text-8xl">👨‍💼</div>
                  <div className="mt-2 bg-white rounded-lg px-4 py-2 shadow-sm inline-block">
                    <span className="text-[#4640DE] font-bold text-sm">5000+ Jobs Available</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━━━━ COMPANIES ━━━━━━ */}
      <section className="border-b border-[#D6DDEB] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#7C8493] text-sm mb-8">Companies we helped grow</p>
          {/* Single row, evenly spaced, matching Figma */}
          <div className="flex items-center justify-between flex-wrap gap-6">

            {/* Vodafone with circle logo */}
            <div className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
              <svg width="28" height="28" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="13" fill="#E60000"/>
                <path d="M14 7C10.13 7 7 10.13 7 14C7 17.87 10.13 21 14 21C17.87 21 21 17.87 21 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
              <span className="font-bold text-xl text-gray-400 tracking-wide">vodafone</span>
            </div>

            <div className="opacity-40 hover:opacity-70 transition-opacity">
              <span className="font-bold text-xl text-gray-400 tracking-wide">intel.</span>
            </div>

            <div className="opacity-40 hover:opacity-70 transition-opacity">
              <span className="font-bold text-xl text-gray-400 tracking-widest uppercase">T E S L A</span>
            </div>

            <div className="opacity-40 hover:opacity-70 transition-opacity">
              <span className="font-bold text-xl text-gray-400 tracking-wide">AMD</span>
            </div>

            <div className="opacity-40 hover:opacity-70 transition-opacity">
              <span className="font-bold text-xl text-gray-400 tracking-wide">Talkit</span>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━━━━ EXPLORE BY CATEGORY ━━━━━━ */}
      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            {/* Title matching Figma — "Explore by" black, "category" blue */}
            <h2 className="text-4xl font-bold text-[#202430]">
              Explore by <span className="text-[#4640DE]">category</span>
            </h2>
            <Link href="/jobs" className="text-[#4640DE] font-semibold flex items-center gap-1 text-sm hover:gap-2 transition-all">
              Show all jobs <ArrowRight size={16} />
            </Link>
          </div>

          {/* 4 columns matching Figma — icon top-left, title, count + arrow */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat} href={`/jobs?category=${cat}`}>
                <div className={`border rounded-xl p-6 cursor-pointer transition-all group h-full ${
                  i === 2
                    ? 'bg-[#4640DE] border-[#4640DE]'
                    : 'bg-white border-[#D6DDEB] hover:border-[#4640DE] hover:shadow-sm'
                }`}>
                  {/* Icon — white when active card */}
                  <div className={`mb-5 ${i === 2 ? '[&_path]:stroke-white [&_rect]:stroke-white [&_circle]:stroke-white' : ''}`}>
                    {CAT_ICONS[cat]}
                  </div>
                  <h3 className={`font-semibold text-lg mb-1 ${i === 2 ? 'text-white' : 'text-[#202430]'}`}>
                    {cat}
                  </h3>
                  <p className={`flex items-center gap-1 text-sm ${i === 2 ? 'text-blue-200' : 'text-[#7C8493]'}`}>
                    {CATEGORY_JOB_COUNTS[cat]} jobs available
                    <ArrowRight size={14} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━ CTA BANNER ━━━━━━ */}
      <section className="bg-[#4640DE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-16">

            {/* Left text */}
            <div className="text-white text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-2">Start posting jobs today</h2>
              <p className="text-blue-200">Start posting jobs for only $10.</p>
              <Link href="/register">
                <button className="mt-6 bg-white text-[#4640DE] px-8 py-3 rounded font-semibold hover:bg-blue-50 transition-colors">
                  Sign Up For Free
                </button>
              </Link>
            </div>

            {/* Right — dashboard mockup matching Figma */}
            <div className="w-full lg:w-auto lg:flex-1 max-w-lg">
              <div className="bg-white rounded-xl shadow-2xl p-4 transform rotate-1 scale-95">
                <div className="flex items-center justify-between mb-3 pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#4640DE] rounded-full" />
                    <span className="font-bold text-xs text-[#202430]">QuickHire</span>
                  </div>
                  <div className="bg-[#4640DE] text-white text-xs px-3 py-1 rounded font-medium">+ Post a job</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-[#F8F8FD] rounded-lg p-3">
                    <div className="text-xs text-[#7C8493] mb-1">Job Views</div>
                    <div className="text-xl font-bold text-[#202430]">2,342</div>
                    <div className="text-xs text-emerald-500">↑ 8.4% This Week</div>
                  </div>
                  <div className="bg-[#F8F8FD] rounded-lg p-3">
                    <div className="text-xs text-[#7C8493] mb-1">Job Applied</div>
                    <div className="text-xl font-bold text-[#202430]">654</div>
                    <div className="text-xs text-emerald-500">↑ 0.8% This Week</div>
                  </div>
                </div>
                <div className="bg-[#F8F8FD] rounded-lg p-3">
                  <div className="text-xs font-semibold text-[#202430] mb-2">Job Statistics</div>
                  <div className="flex items-end gap-1 h-12">
                    {[40,65,45,80,55,70,50,90,60,75,55,85].map((h,i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{
                        height: `${h}%`,
                        backgroundColor: i % 2 === 0 ? '#4640DE' : '#F8A500',
                        opacity: 0.8
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━━━━ FEATURED JOBS ━━━━━━ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">
              <span className="text-[#202430]">Featured </span>
              <span className="text-[#4640DE]">jobs</span>
            </h2>
            <Link href="/jobs" className="text-[#4640DE] font-semibold flex items-center gap-1 text-sm hover:gap-2 transition-all">
              Show all jobs <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_,i) => <div key={i} className="h-52 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : featuredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredJobs.map(job => <JobCard key={job._id} job={job} variant="grid" />)}
            </div>
          ) : (
            <div className="text-center py-16 text-[#7C8493]">
              No featured jobs yet.{' '}
              <Link href="/admin" className="text-[#4640DE] underline">Add from Admin →</Link>
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━ LATEST JOBS OPEN ━━━━━━ */}
      <section className="py-20 bg-[#F8F8FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">
              <span className="text-[#202430]">Latest </span>
              <span className="text-[#4640DE]">jobs open</span>
            </h2>
            <Link href="/jobs" className="text-[#4640DE] font-semibold flex items-center gap-1 text-sm hover:gap-2 transition-all">
              Show all jobs <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_,i) => <div key={i} className="h-24 bg-white rounded-lg animate-pulse border border-[#D6DDEB]" />)}
            </div>
          ) : latestJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestJobs.map(job => <JobCard key={job._id} job={job} variant="list" />)}
            </div>
          ) : (
            <div className="text-center py-16 text-[#7C8493]">
              No jobs yet.{' '}
              <Link href="/register" className="text-[#4640DE] underline">Sign up and post one →</Link>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}