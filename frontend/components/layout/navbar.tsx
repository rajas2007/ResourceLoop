import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-700 text-white font-bold text-sm">
              RL
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Resource<span className="text-teal-700">Loop</span>
            </span>
          </Link>
          <Badge variant="secondary" className="hidden sm:inline-flex text-[11px] font-medium text-slate-600">
            Institutional TrustFlow
          </Badge>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            href="/resources"
            className="transition-colors hover:text-slate-900"
          >
            Catalog
          </Link>
          <Link
            href="/#trustflow"
            className="transition-colors hover:text-slate-900"
          >
            Protocol
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-slate-900"
          >
            GitHub
          </a>
        </nav>

        {/* Status & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Core Active</span>
          </div>
          <Link
            href="/resources"
            className="inline-flex h-9 items-center justify-center rounded-md bg-teal-700 px-3.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-800 transition-colors"
          >
            Find Equipment
          </Link>
        </div>
      </div>
    </header>
  );
}
