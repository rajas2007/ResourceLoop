import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              ResourceLoop Institutional Platform
            </p>
            <p className="text-xs text-slate-400">
              Controlled asset sharing, eligibility verification & auditable condition attestation.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/resources" className="hover:text-slate-900 transition-colors">
              Resource Discovery
            </Link>
            <Link href="/#trustflow" className="hover:text-slate-900 transition-colors">
              TrustFlow Lifecycle
            </Link>
            <span className="text-slate-300">|</span>
            <span>MIT License &bull; 48h Sprint</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
