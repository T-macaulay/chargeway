"use client";

export default function Footer() {
  return (
    <footer className="bg-bark text-cream border-t border-cream/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold" >
                Drive<span className="text-coral">EV</span>
              </span>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed mb-4" >
              Nigeria&apos;s smartest way to buy an electric vehicle. Compare, bid, and drive away happy.
            </p>
            <div className="flex gap-3">
              {/* Social icons */}
              {[
                { label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                { label: "TikTok", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-cream/10 hover:bg-coral/20 flex items-center justify-center transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-cream/60">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-cream/80 mb-3 uppercase tracking-wider" >
              Marketplace
            </h4>
            <div className="flex flex-col gap-2">
              {["Browse EVs", "Active Deals", "Place a Bid", "Vendor Directory"].map((link) => (
                <a key={link} href="#" className="text-sm text-cream/40 hover:text-coral transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cream/80 mb-3 uppercase tracking-wider" >
              Resources
            </h4>
            <div className="flex flex-col gap-2">
              {["EV Buying Guide", "Cost Calculator", "Charging Guide", "Battery Health"].map((link) => (
                <a key={link} href="#" className="text-sm text-cream/40 hover:text-coral transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cream/80 mb-3 uppercase tracking-wider" >
              Company
            </h4>
            <div className="flex flex-col gap-2">
              {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((link) => (
                <a key={link} href="#" className="text-sm text-cream/40 hover:text-coral transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream/30" >
            &copy; {new Date().getFullYear()} DriveEV. All rights reserved.
          </p>
          <p className="text-sm text-cream/30 flex items-center gap-1.5" >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-coral">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
            </svg>
            Built in Lagos
          </p>
        </div>
      </div>
    </footer>
  );
}
