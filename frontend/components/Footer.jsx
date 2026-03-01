import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="w-3 h-3 bg-white rounded-full block" />
              </span>
              QuickHire
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-5">About</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {['Companies','Pricing','Terms','Advice','Privacy Policy'].map(l => (
                <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-5">Resources</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {['Help Docs','Guide','Updates','Contact Us'].map(l => (
                <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-2">Get job notifications</h4>
            <p className="text-gray-400 text-sm mb-4">The latest job news, articles, sent to your inbox weekly.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email Address" className="flex-1 bg-white text-navy px-3 py-2 rounded text-sm focus:outline-none" />
              <button className="bg-primary px-4 py-2 rounded text-sm font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">2021 @ QuickHire. All rights reserved.</p>
          <div className="flex gap-3">
            {['f','in','tw','ig','◎'].map((icon, i) => (
              <span key={i} className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-xs cursor-pointer hover:bg-primary transition-colors">{icon}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}