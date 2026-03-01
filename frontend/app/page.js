'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { api, CATEGORIES } from '../lib/api';
import JobCard from '../components/JobCard';

// Icons for each category (matches Figma)
const CAT_ICONS = {
  Design:           '✏️',
  Sales:            '📊',
  Marketing:        '📢',
  Finance:          '💳',
  Technology:       '🖥️',
  Engineering:      '⚙️',
  Business:         '💼',
  'Human Resource': '👥',
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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text + Search */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight">
                Discover<br />more than
                <span className="text-primary block">5000+ Jobs</span>
              </h1>
              <p className="mt-6 text-gray-body text-lg leading-relaxed">
                Great platform for the job seeker that searching for new career heights and passionate about startups.
              </p>

              {/* Search box — matches Figma exactly */}
              <form onSubmit={handleSearch} className="mt-8 bg-white border border-border rounded-lg p-2 flex flex-col sm:flex-row gap-2 shadow-sm">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search size={18} className="text-gray-sub shrink-0" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Job title or keyword"
                    className="flex-1 focus:outline-none text-sm text-navy placeholder-gray-sub py-2"
                  />
                </div>
                <div className="flex items-center gap-2 flex-1 px-3 sm:border-l border-border">
                  <MapPin size={18} className="text-gray-sub shrink-0" />
                  <input
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Florence, Italy"
                    className="flex-1 focus:outline-none text-sm text-navy placeholder-gray-sub py-2"
                  />
                </div>
                <button type="submit" className="btn-primary text-sm py-2 px-6 whitespace-nowrap">
                  Search my job
                </button>
              </form>

              {/* Popular tags */}
              <p className="mt-4 text-sm text-gray-sub">
                <span className="font-medium text-gray-body">Popular: </span>
                {['UI Designer','UX Researcher','Android','Admin'].map((t, i, arr) => (
                  <Link key={t} href={`/jobs?search=${t}`} className="hover:text-primary transition-colors">
                    {t}{i < arr.length - 1 ? ', ' : ''}
                  </Link>
                ))}
              </p>
            </div>

            {/* Right: decorative visual */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-primary/10 rounded-full" />
                <div className="absolute inset-8 bg-primary/10 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-6xl">👨‍💻</span>
                  <span className="text-primary font-bold text-xl mt-2">5000+ Jobs</span>
                </div>
                {/* grid lines decoration */}
                <svg className="absolute top-0 right-0 opacity-20" width="160" height="160" viewBox="0 0 160 160">
                  {[0,40,80].map(o => (
                    <rect key={o} x={o} y={o} width="80" height="80" fill="none" stroke="#4640DE" strokeWidth="1"/>
                  ))}
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
          COMPANY LOGOS
      ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-sub text-sm mb-6">Companies we helped grow</p>
          <div className="flex flex-wrap items-center gap-10 sm:gap-16">
            {['Vodafone','Intel','TESLA','AMD','Talkit'].map(c => (
              <span key={c} className="text-gray-300 font-bold text-xl sm:text-2xl tracking-widest uppercase">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
          EXPLORE BY CATEGORY
      ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-title">Explore by <span>category</span></h2>
            <Link href="/jobs" className="text-primary font-semibold flex items-center gap-1 text-sm hover:gap-2 transition-all">
              Show all jobs <ArrowRight size={16} />
            </Link>
          </div>

          {/* 4-column grid matching Figma. Marketing card (index 2) is active/blue */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat} href={`/jobs?category=${cat}`}>
                <div className={`border rounded-lg p-6 cursor-pointer transition-all group ${
                  i === 2
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-border hover:border-primary hover:shadow-sm'
                }`}>
                  <div className={`text-3xl mb-4 ${i === 2 ? '' : 'text-primary'}`}>{CAT_ICONS[cat]}</div>
                  <h3 className={`font-semibold text-lg mb-1 ${i === 2 ? 'text-white' : 'text-navy'}`}>{cat}</h3>
                  <p className={`flex items-center gap-1 text-sm ${i === 2 ? 'text-blue-200' : 'text-gray-sub'}`}>
                    jobs available <ArrowRight size={14} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA BANNER (blue strip)
      ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">Start posting jobs today</h2>
            <p className="text-blue-200 mt-1">Start posting jobs for only $10.</p>
          </div>
          <Link href="/admin">
            <button className="bg-white text-primary px-8 py-3 rounded font-semibold hover:bg-blue-50 transition-colors">
              Sign Up For Free
            </button>
          </Link>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
          FEATURED JOBS
      ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-title">Featured <span>jobs</span></h2>
            <Link href="/jobs" className="text-primary font-semibold flex items-center gap-1 text-sm hover:gap-2 transition-all">
              Show all jobs <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => <div key={i} className="h-52 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : featuredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredJobs.map(job => <JobCard key={job._id} job={job} variant="grid" />)}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-sub">
              No featured jobs yet.{' '}
              <Link href="/admin" className="text-primary underline">Add from Admin →</Link>
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━
          LATEST JOBS OPEN
      ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-title">Latest <span>jobs open</span></h2>
            <Link href="/jobs" className="text-primary font-semibold flex items-center gap-1 text-sm hover:gap-2 transition-all">
              Show all jobs <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-white rounded-lg animate-pulse border border-border" />)}
            </div>
          ) : latestJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {latestJobs.map(job => <JobCard key={job._id} job={job} variant="list" />)}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-sub">
              No jobs yet.{' '}
              <Link href="/admin" className="text-primary underline">Post one from Admin →</Link>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}