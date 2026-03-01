'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { api, CATEGORIES, JOB_TYPES } from '../../lib/api';
import JobCard from '../../components/JobCard';

export default function JobsPage() {
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

  // Re-fetch when filters change
  useEffect(() => { fetchJobs(); }, [category, jobType]);

  const handleSearch = (e) => { e.preventDefault(); fetchJobs(); };

  const clearAll = () => { setSearch(''); setLocation(''); setCategory(''); setJobType(''); };

  return (
    <div className="min-h-screen bg-bg-light">

      {/* Page header */}
      <div className="bg-white border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-navy">
            Find your <span className="text-primary">dream job</span>
          </h1>
          <p className="text-gray-body mt-1 mb-6">Browse all open positions</p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="bg-white border border-border rounded-lg p-2 flex flex-col sm:flex-row gap-2 max-w-3xl shadow-sm">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={18} className="text-gray-sub shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Job title or keyword" className="flex-1 focus:outline-none text-sm py-2 placeholder-gray-sub" />
            </div>
            <div className="flex items-center gap-2 flex-1 px-3 sm:border-l border-border">
              <MapPin size={18} className="text-gray-sub shrink-0" />
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="flex-1 focus:outline-none text-sm py-2 placeholder-gray-sub" />
            </div>
            <button type="submit" className="btn-primary text-sm py-2 px-6 whitespace-nowrap">Search</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">

        {/* ── Sidebar Filters (desktop) ── */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white border border-border rounded-lg p-5">
            <h3 className="font-semibold text-navy mb-5 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Filters
            </h3>

            {/* Category filter */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Category</p>
              {['', ...CATEGORIES].map(c => (
                <label key={c} className="flex items-center gap-2 py-1 cursor-pointer">
                  <input type="radio" name="cat" value={c} checked={category === c} onChange={() => setCategory(c)} className="accent-primary" />
                  <span className="text-sm text-gray-body">{c || 'All Categories'}</span>
                </label>
              ))}
            </div>

            {/* Job type filter */}
            <div>
              <p className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Job Type</p>
              {['', ...JOB_TYPES].map(t => (
                <label key={t} className="flex items-center gap-2 py-1 cursor-pointer">
                  <input type="radio" name="type" value={t} checked={jobType === t} onChange={() => setJobType(t)} className="accent-primary" />
                  <span className="text-sm text-gray-body">{t || 'All Types'}</span>
                </label>
              ))}
            </div>

            {(category || jobType) && (
              <button onClick={clearAll} className="mt-4 w-full text-sm text-primary border border-primary rounded py-2 hover:bg-primary/5 transition-colors">
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* ── Job results ── */}
        <div className="flex-1">
          {/* Mobile filters */}
          <div className="lg:hidden mb-4 flex gap-2">
            <select value={category} onChange={e => setCategory(e.target.value)} className="input-field text-sm flex-1">
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={jobType} onChange={e => setJobType(e.target.value)} className="input-field text-sm flex-1">
              <option value="">All Types</option>
              {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <p className="text-sm text-gray-body mb-5">
            Showing <strong className="text-navy">{jobs.length}</strong> results
            {search && <span> for "<span className="text-primary">{search}</span>"</span>}
          </p>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-white rounded-lg animate-pulse border border-border" />)}
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => <JobCard key={job._id} job={job} variant="list" />)}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-border">
              <p className="text-4xl mb-3">🔍</p>
              <h3 className="font-semibold text-navy text-lg">No jobs found</h3>
              <p className="text-gray-sub text-sm mt-1">Try different keywords or filters</p>
              <button onClick={clearAll} className="btn-primary mt-4 text-sm">Clear all filters</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}