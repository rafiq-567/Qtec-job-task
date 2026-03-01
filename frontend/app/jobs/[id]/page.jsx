'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, CheckCircle } from 'lucide-react';
import { api, badgeColor, avatarColor } from '../../../lib/api';

function JobDetailContent() {
  const { id }   = useParams();
  const router   = useRouter();
  const [job,        setJob]        = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [form,       setForm]       = useState({ name:'', email:'', resumeLink:'', coverNote:'' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    api.getJobById(id).then(res => {
      if (res.success) setJob(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const res = await api.submitApplication({ jobId: id, ...form });
    if (res.success) setSubmitted(true);
    else setError(res.message || 'Something went wrong. Please try again.');
    setSubmitting(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#4640DE] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!job) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl font-semibold text-[#202430]">Job not found</p>
      <Link href="/jobs" className="bg-[#4640DE] text-white px-5 py-2 rounded font-semibold">Back to Jobs</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F8FD]">

      <div className="bg-white border-b border-[#D6DDEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[#515B6F] hover:text-[#4640DE] transition-colors">
            <ArrowLeft size={16} /> Back to Jobs
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left: Job info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#D6DDEB] rounded-lg p-6">
              <div className="flex items-start gap-4 flex-wrap">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl shrink-0 ${avatarColor(job.company)}`}>
                  {job.company?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-[#202430]">{job.title}</h1>
                  <p className="text-[#515B6F] text-sm mt-1 flex flex-wrap items-center gap-3">
                    <span className="font-medium">{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={13} />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={13} />{new Date(job.createdAt).toLocaleDateString()}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium border text-emerald-600 border-emerald-300 bg-emerald-50">{job.jobType}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeColor(job.category)}`}>{job.category}</span>
                    {job.salary && <span className="px-3 py-1 rounded-full text-xs font-medium border text-amber-600 border-amber-300 bg-amber-50">{job.salary}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#D6DDEB] rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#202430] mb-4">Job Description</h2>
              <p className="text-[#515B6F] text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {job.requirements && (
              <div className="bg-white border border-[#D6DDEB] rounded-lg p-6">
                <h2 className="text-lg font-bold text-[#202430] mb-4">Requirements</h2>
                <p className="text-[#515B6F] text-sm leading-relaxed whitespace-pre-line">{job.requirements}</p>
              </div>
            )}
          </div>

          {/* Right: Apply form */}
          <div>
            <div className="bg-white border border-[#D6DDEB] rounded-lg p-6 sticky top-24">
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                  <h3 className="font-bold text-[#202430] text-lg">Application Sent!</h3>
                  <p className="text-[#7C8493] text-sm mt-2">Good luck! They'll be in touch if there's a match.</p>
                  <Link href="/jobs" className="bg-[#4640DE] text-white px-5 py-2 rounded font-semibold mt-6 block text-center text-sm hover:bg-indigo-700 transition-colors">
                    Browse More Jobs
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-[#202430] mb-1">Apply Now</h2>
                  <p className="text-[#7C8493] text-sm mb-5">Fill in the form below to apply.</p>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm mb-4">{error}</div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#202430] mb-1">Full Name *</label>
                      <input type="text" required placeholder="John Doe"
                        value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#202430] mb-1">Email *</label>
                      <input type="email" required placeholder="john@email.com"
                        value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#202430] mb-1">Resume Link *</label>
                      <input type="url" required placeholder="https://drive.google.com/..."
                        value={form.resumeLink} onChange={e => setForm({...form, resumeLink: e.target.value})}
                        className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]" />
                      <p className="text-xs text-[#7C8493] mt-1">Google Drive, Dropbox, or portfolio URL</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#202430] mb-1">Cover Note</label>
                      <textarea rows={4} placeholder="Why are you a great fit?"
                        value={form.coverNote} onChange={e => setForm({...form, coverNote: e.target.value})}
                        className="w-full border border-[#D6DDEB] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE] resize-none" />
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full bg-[#4640DE] text-white py-3 rounded font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60">
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ✅ Wrap with Suspense
export default function JobDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#7C8493]">Loading...</div>}>
      <JobDetailContent />
    </Suspense>
  );
}