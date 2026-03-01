import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { badgeColor, avatarColor } from '../lib/api';

// variant="grid"  → featured jobs section (card with description)
// variant="list"  → latest jobs section (horizontal row)

export default function JobCard({ job, variant = 'grid' }) {
  const avatar = (
    <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-lg ${avatarColor(job.company)}`}>
      {job.company?.[0]?.toUpperCase()}
    </div>
  );

  if (variant === 'list') {
    return (
      <Link href={`/jobs/${job._id}`}>
        <div className="bg-white border border-border rounded-lg p-5 hover:border-primary hover:shadow-sm transition-all flex items-center gap-4 cursor-pointer">
          {avatar}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-navy">{job.title}</h3>
            <p className="text-gray-sub text-sm mt-0.5 flex items-center gap-1">
              {job.company}
              <span className="mx-1">•</span>
              <MapPin size={12} className="inline" /> {job.location}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium border text-emerald-600 border-emerald-300 bg-emerald-50">{job.jobType}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeColor(job.category)}`}>{job.category}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white border border-border rounded-lg p-6 hover:border-primary hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          {avatar}
          <span className="px-3 py-1 rounded border border-primary text-primary text-xs font-medium">{job.jobType}</span>
        </div>
        <h3 className="font-semibold text-navy text-lg">{job.title}</h3>
        <p className="text-gray-sub text-sm mt-1 mb-3">{job.company} • {job.location}</p>
        <p className="text-gray-body text-sm line-clamp-2 flex-1">{job.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeColor(job.category)}`}>{job.category}</span>
        </div>
      </div>
    </Link>
  );
}