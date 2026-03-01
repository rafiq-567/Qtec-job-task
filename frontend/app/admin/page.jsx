'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, X, CheckCircle, Briefcase, Users } from 'lucide-react';
import { api, CATEGORIES, JOB_TYPES } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

const EMPTY = { title:'', company:'', location:'', category:'Design', jobType:'Full-Time', description:'', requirements:'', salary:'', isFeatured:false };

export default function AdminPage() {
  const { token } = useAuth(); // ✅ GET TOKEN

  const [jobs,         setJobs]         = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [showModal,    setShowModal]    = useState(false);
  const [form,         setForm]         = useState(EMPTY);
  const [submitting,   setSubmitting]   = useState(false);
  const [toast,        setToast]        = useState('');
  const [formError,    setFormError]    = useState('');
  const [activeTab,    setActiveTab]    = useState('jobs');

  const load = async () => {
    setLoading(true);
    const [j, a] = await Promise.all([
      api.getJobs(),
      api.getApplications(token), // ✅ PASS TOKEN
    ]);
    if (j.success) setJobs(j.data);
    if (a.success) setApplications(a.data);
    setLoading(false);
  };

  useEffect(() => { if (token) load(); }, [token]); // ✅ WAIT FOR TOKEN

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    const res = await api.createJob(form, token); // ✅ PASS TOKEN
    if (res.success) {
      showToast('Job posted successfully!');
      setForm(EMPTY);
      setShowModal(false);
      load();
    } else {
      setFormError(res.message || 'Failed to post job.');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    const res = await api.deleteJob(id, token); // ✅ PASS TOKEN
    if (res.success) { setJobs(j => j.filter(x => x._id !== id)); showToast('Job deleted.'); }
  };

  return (
    <div className="min-h-screen bg-[#F8F8FD]">

      {/* Header */}
      <div className="bg-white border-b border-[#D6DDEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#202430]">Admin Panel</h1>
            <p className="text-[#515B6F] text-sm mt-1">Manage job listings and applications</p>
          </div>
          <button onClick={() => { setShowModal(true); setFormError(''); }}
            className="bg-[#4640DE] text-white px-5 py-2.5 rounded font-semibold text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Plus size={16} /> Post a Job
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Toast */}
        {toast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded p-3 text-sm mb-6 flex items-center gap-2">
            <CheckCircle size={16} /> {toast}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Briefcase size={22} className="text-[#4640DE]" />,  label: 'Total Jobs',    value: jobs.length },
            { icon: <Users size={22} className="text-emerald-500" />,    label: 'Applications',  value: applications.length },
            { icon: <Briefcase size={22} className="text-amber-500" />,  label: 'Featured Jobs', value: jobs.filter(j => j.isFeatured).length },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#D6DDEB] rounded-lg p-5">
              {s.icon}
              <div className="text-3xl font-bold text-[#202430] mt-2">{s.value}</div>
              <div className="text-[#7C8493] text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#D6DDEB] mb-6">
          {['jobs','applications'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? 'border-[#4640DE] text-[#4640DE]'
                  : 'border-transparent text-[#515B6F] hover:text-[#202430]'
              }`}>
              {tab} ({tab === 'jobs' ? jobs.length : applications.length})
            </button>
          ))}
        </div>

        {/* Jobs table */}
        {activeTab === 'jobs' && (
          <div className="bg-white border border-[#D6DDEB] rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-[#7C8493]">Loading...</div>
            ) : jobs.length === 0 ? (
              <div className="p-12 text-center">
                <Briefcase size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-[#202430]">No jobs yet</p>
                <p className="text-[#7C8493] text-sm mt-1">Click "Post a Job" to add your first listing.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8F8FD] border-b border-[#D6DDEB]">
                    <tr>
                      {['Title','Company','Category','Type','Featured',''].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-[#7C8493] font-semibold text-xs uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D6DDEB]">
                    {jobs.map(job => (
                      <tr key={job._id} className="hover:bg-[#F8F8FD] transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-[#202430]">{job.title}</div>
                          <div className="text-[#7C8493] text-xs">{job.location}</div>
                        </td>
                        <td className="px-5 py-4 text-[#515B6F]">{job.company}</td>
                        <td className="px-5 py-4">
                          <span className="px-2 py-1 rounded text-xs bg-indigo-50 text-[#4640DE] font-medium">{job.category}</span>
                        </td>
                        <td className="px-5 py-4 text-[#515B6F]">{job.jobType}</td>
                        <td className="px-5 py-4 text-xs font-medium">
                          {job.isFeatured
                            ? <span className="text-emerald-600">★ Yes</span>
                            : <span className="text-[#7C8493]">No</span>}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button onClick={() => handleDelete(job._id)}
                            className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Applications table */}
        {activeTab === 'applications' && (
          <div className="bg-white border border-[#D6DDEB] rounded-lg overflow-hidden">
            {applications.length === 0 ? (
              <div className="p-12 text-center">
                <Users size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-[#202430]">No applications yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8F8FD] border-b border-[#D6DDEB]">
                    <tr>
                      {['Name','Email','Job Applied','Date','Resume'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-[#7C8493] font-semibold text-xs uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D6DDEB]">
                    {applications.map(app => (
                      <tr key={app._id} className="hover:bg-[#F8F8FD] transition-colors">
                        <td className="px-5 py-4 font-semibold text-[#202430]">{app.name}</td>
                        <td className="px-5 py-4 text-[#515B6F]">{app.email}</td>
                        <td className="px-5 py-4 text-[#515B6F]">{app.job?.title || '—'}</td>
                        <td className="px-5 py-4 text-[#7C8493] text-xs">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="px-5 py-4">
                          <a href={app.resumeLink} target="_blank" rel="noopener noreferrer"
                            className="text-[#4640DE] text-xs hover:underline">View →</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-5 border-b border-[#D6DDEB]">
              <h2 className="text-lg font-bold text-[#202430]">Post a New Job</h2>
              <button onClick={() => setShowModal(false)} className="text-[#7C8493] hover:text-[#202430]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm">{formError}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#202430] mb-1">Job Title *</label>
                  <input required placeholder="e.g. Frontend Developer"
                    value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#202430] mb-1">Company *</label>
                  <input required placeholder="e.g. Google"
                    value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                    className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#202430] mb-1">Location *</label>
                  <input required placeholder="e.g. Dhaka, Bangladesh"
                    value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                    className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#202430] mb-1">Salary</label>
                  <input placeholder="e.g. $50k–$70k"
                    value={form.salary} onChange={e => setForm({...form, salary: e.target.value})}
                    className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#202430] mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE]">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#202430] mb-1">Job Type *</label>
                  <select value={form.jobType} onChange={e => setForm({...form, jobType: e.target.value})}
                    className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE]">
                    {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202430] mb-1">Description *</label>
                <textarea required rows={4} placeholder="Describe the role and responsibilities..."
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE] resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202430] mb-1">Requirements</label>
                <textarea rows={3} placeholder="Skills and qualifications needed..."
                  value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})}
                  className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE] resize-none" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured}
                  onChange={e => setForm({...form, isFeatured: e.target.checked})}
                  className="w-4 h-4 accent-[#4640DE]" />
                <span className="text-sm text-[#202430]">Mark as Featured Job (shows on homepage)</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 border border-[#D6DDEB] text-[#515B6F] py-3 rounded font-semibold hover:bg-[#F8F8FD] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 bg-[#4640DE] text-white py-3 rounded font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60">
                  {submitting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}