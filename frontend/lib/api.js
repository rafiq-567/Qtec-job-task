// All API calls go through this file.
// Change NEXT_PUBLIC_API_URL in .env.local to point to your backend.

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  getJobs: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return fetch(`${BASE}/jobs${q ? '?' + q : ''}`, { cache: 'no-store' }).then(r => r.json());
  },
  getFeaturedJobs: () =>
    fetch(`${BASE}/jobs/featured`, { cache: 'no-store' }).then(r => r.json()),
  getJobById: (id) =>
    fetch(`${BASE}/jobs/${id}`, { cache: 'no-store' }).then(r => r.json()),
  createJob: (data) =>
    fetch(`${BASE}/jobs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  deleteJob: (id) =>
    fetch(`${BASE}/jobs/${id}`, { method: 'DELETE' }).then(r => r.json()),
  submitApplication: (data) =>
    fetch(`${BASE}/applications`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  getApplications: () =>
    fetch(`${BASE}/applications`, { cache: 'no-store' }).then(r => r.json()),
};

export const CATEGORIES = ['Design','Sales','Marketing','Finance','Technology','Engineering','Business','Human Resource'];
export const JOB_TYPES  = ['Full-Time','Part-Time','Contract','Remote'];

// Returns the right color class for each category badge
export const badgeColor = (cat) => ({
  Design:           'text-violet-600 border-violet-300 bg-violet-50',
  Sales:            'text-emerald-600 border-emerald-300 bg-emerald-50',
  Marketing:        'text-amber-600 border-amber-300 bg-amber-50',
  Finance:          'text-emerald-600 border-emerald-300 bg-emerald-50',
  Technology:       'text-violet-600 border-violet-300 bg-violet-50',
  Engineering:      'text-violet-600 border-violet-300 bg-violet-50',
  Business:         'text-amber-600 border-amber-300 bg-amber-50',
  'Human Resource': 'text-pink-600 border-pink-300 bg-pink-50',
}[cat] || 'text-violet-600 border-violet-300 bg-violet-50');

// Returns a consistent color for company avatar based on company name
const COLORS = ['bg-blue-500','bg-emerald-500','bg-violet-500','bg-amber-500','bg-rose-500','bg-cyan-500','bg-indigo-500'];
export const avatarColor = (name = '') => {
  let hash = 0;
  for (const c of name) hash = c.charCodeAt(0) + hash;
  return COLORS[hash % COLORS.length];
};