'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { api, CATEGORIES, JOB_TYPES } from '../../lib/api';
import JobCard from '../../components/JobCard';

function JobsContent() {
  const searchParams = useSearchParams();

  const [jobs,     setJobs]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState(searchParams.get('search')   || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [jobType,  setJobType]  = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    const params = {};
    if (search)   params.search   = search;
    if (location) params.location = location;
    if (category) params.category = category;
    if (jobType)  params.jobType  = jobType;
    const res = await api.getJobs(params);
    if (res.success) setJobs(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, [category, jobType]);

  const handleSearch = (e) => { e.preventDefault(); fetchJobs(); };
  const clearAll = () => { setSearch(''); setLocation(''); setCategory(''); setJobType(''); };

  return (
    <div className="min-h-screen bg-[#F8F8FD]">

      {/* Page header */}
      <div className="bg-white border-b border-[#D6DDEB] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#202430]">
            Find your <span className="text-[#4640DE]">dream job</span>
          </h1>
          <p className="text-[#515B6F] mt-1 mb-6">Browse all open positions</p>

          <form onSubmit={handleSearch} className="bg-white border border-[#D6DDEB] rounded-lg p-2 flex flex-col sm:flex-row gap-2 max-w-3xl shadow-sm">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={18} className="text-[#7C8493] shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Job title or keyword"
                className="flex-1 focus:outline-none text-sm py-2 placeholder-[#7C8493]" />
            </div>
            <div className="flex items-center gap-2 flex-1 px-3 sm:border-l border-[#D6DDEB]">
              <MapPin size={18} className="text-[#7C8493] shrink-0" />
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location"
                className="flex-1 focus:outline-none text-sm py-2 placeholder-[#7C8493]" />
            </div>
            <button type="submit" className="bg-[#4640DE] text-white text-sm py-2 px-6 rounded font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">

        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white border border-[#D6DDEB] rounded-lg p-5">
            <h3 className="font-semibold text-[#202430] mb-5 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Filters
            </h3>
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#202430] uppercase tracking-wide mb-3">Category</p>
              {['', ...CATEGORIES].map(c => (
                <label key={c} className="flex items-center gap-2 py-1 cursor-pointer">
                  <input type="radio" name="cat" value={c} checked={category === c} onChange={() => setCategory(c)} className="accent-[#4640DE]" />
                  <span className="text-sm text-[#515B6F]">{c || 'All Categories'}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#202430] uppercase tracking-wide mb-3">Job Type</p>
              {['', ...JOB_TYPES].map(t => (
                <label key={t} className="flex items-center gap-2 py-1 cursor-pointer">
                  <input type="radio" name="type" value={t} checked={jobType === t} onChange={() => setJobType(t)} className="accent-[#4640DE]" />
                  <span className="text-sm text-[#515B6F]">{t || 'All Types'}</span>
                </label>
              ))}
            </div>
            {(category || jobType) && (
              <button onClick={clearAll} className="mt-4 w-full text-sm text-[#4640DE] border border-[#4640DE] rounded py-2 hover:bg-indigo-50 transition-colors">
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Job results */}
        <div className="flex-1">
          <div className="lg:hidden mb-4 flex gap-2">
            <select value={category} onChange={e => setCategory(e.target.value)} className="flex-1 border border-[#D6DDEB] rounded px-3 py-2 text-sm focus:outline-none">
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={jobType} onChange={e => setJobType(e.target.value)} className="flex-1 border border-[#D6DDEB] rounded px-3 py-2 text-sm focus:outline-none">
              <option value="">All Types</option>
              {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <p className="text-sm text-[#515B6F] mb-5">
            Showing <strong className="text-[#202430]">{jobs.length}</strong> results
            {search && <span> for "<span className="text-[#4640DE]">{search}</span>"</span>}
          </p>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-white rounded-lg animate-pulse border border-[#D6DDEB]" />)}
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => <JobCard key={job._id} job={job} variant="list" />)}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-[#D6DDEB]">
              <p className="text-4xl mb-3">🔍</p>
              <h3 className="font-semibold text-[#202430] text-lg">No jobs found</h3>
              <p className="text-[#7C8493] text-sm mt-1">Try different keywords or filters</p>
              <button onClick={clearAll} className="bg-[#4640DE] text-white px-5 py-2 rounded font-semibold mt-4 text-sm hover:bg-indigo-700 transition-colors">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ Wrap with Suspense — required by Next.js when using useSearchParams()
export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#7C8493]">Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}