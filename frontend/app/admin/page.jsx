'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, X, CheckCircle, Briefcase, Users } from 'lucide-react';
import { api, CATEGORIES, JOB_TYPES } from '../../lib/api';

const EMPTY = { title:'', company:'', location:'', category:'Design', jobType:'Full-Time', description:'', requirements:'', salary:'', isFeatured:false };

export default function AdminPage() {
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
    const [j, a] = await Promise.all([api.getJobs(), api.getApplications()]);
    if (j.success) setJobs(j.data);
    if (a.success) setApplications(a.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    const res = await api.createJob(form);
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
    const res = await api.deleteJob(id);
    if (res.success) { setJobs(j => j.filter(x => x._id !== id)); showToast('Job deleted.'); }
  };

  return (
    <div className="min-h-screen bg-bg-light">

      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy">Admin Panel</h1>
            <p className="text-gray-body text-sm mt-1">Manage job listings and applications</p>
          </div>
          <button onClick={() => { setShowModal(true); setFormError(''); }} className="btn-primary flex items-center gap-2 text-sm">
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
            { icon: <Briefcase size={22} className="text-primary" />,      label: 'Total Jobs',     value: jobs.length },
            { icon: <Users size={22} className="text-emerald-500" />,      label: 'Applications',   value: applications.length },
            { icon: <Briefcase size={22} className="text-amber-500" />,    label: 'Featured Jobs',  value: jobs.filter(j => j.isFeatured).length },
          ].map(s => (
            <div key={s.label} className="bg-white border border-border rounded-lg p-5">
              {s.icon}
              <div className="text-3xl font-bold text-navy mt-2">{s.value}</div>
              <div className="text-gray-sub text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          {['jobs','applications'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-body hover:text-navy'
              }`}>
              {tab} ({tab === 'jobs' ? jobs.length : applications.length})
            </button>
          ))}
        </div>

        {/* Jobs table */}
        {activeTab === 'jobs' && (
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            {loading ? <div className="p-8 text-center text-gray-sub">Loading...</div>
            : jobs.length === 0 ? (
              <div className="p-12 text-center">
                <Briefcase size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-navy">No jobs yet</p>
                <p className="text-gray-sub text-sm mt-1">Click "Post a Job" to add your first listing.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-bg-light border-b border-border">
                  <tr>
                    {['Title','Company','Category','Type','Featured',''].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-gray-sub font-semibold text-xs uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {jobs.map(job => (
                    <tr key={job._id} className="hover:bg-bg-light transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-navy">{job.title}</div>
                        <div className="text-gray-sub text-xs">{job.location}</div>
                      </td>
                      <td className="px-5 py-4 text-gray-body">{job.company}</td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary font-medium">{job.category}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-body">{job.jobType}</td>
                      <td className="px-5 py-4 text-xs font-medium">
                        {job.isFeatured ? <span className="text-emerald-600">★ Yes</span> : <span className="text-gray-sub">No</span>}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => handleDelete(job._id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Applications table */}
        {activeTab === 'applications' && (
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            {applications.length === 0 ? (
              <div className="p-12 text-center">
                <Users size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-navy">No applications yet</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-bg-light border-b border-border">
                  <tr>
                    {['Name','Email','Job Applied','Date','Resume'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-gray-sub font-semibold text-xs uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {applications.map(app => (
                    <tr key={app._id} className="hover:bg-bg-light transition-colors">
                      <td className="px-5 py-4 font-semibold text-navy">{app.name}</td>
                      <td className="px-5 py-4 text-gray-body">{app.email}</td>
                      <td className="px-5 py-4 text-gray-body">{app.job?.title || '—'}</td>
                      <td className="px-5 py-4 text-gray-sub text-xs">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">View →</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* ── Post Job Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-bold text-navy">Post a New Job</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-sub hover:text-navy"><X size={20} /></button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4">
              {formError && <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm">{formError}</div>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Job Title *</label>
                  <input required placeholder="e.g. Frontend Developer" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Company *</label>
                  <input required placeholder="e.g. Google" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Location *</label>
                  <input required placeholder="e.g. Dhaka, Bangladesh" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Salary</label>
                  <input placeholder="e.g. $50k–$70k" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Job Type *</label>
                  <select value={form.jobType} onChange={e => setForm({...form, jobType: e.target.value})} className="input-field">
                    {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Description *</label>
                <textarea required rows={4} placeholder="Describe the role and responsibilities..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Requirements</label>
                <textarea rows={3} placeholder="Skills and qualifications needed..." value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} className="input-field resize-none" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} className="accent-primary w-4 h-4" />
                <span className="text-sm text-navy">Mark as Featured Job (shows on homepage)</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-border text-gray-body py-3 rounded font-semibold hover:bg-bg-light transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 btn-primary disabled:opacity-60">
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