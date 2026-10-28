import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ResourcesPage() {
  const placeholderCategories = [
    "Laboratory Equipment",
    "Facility & Cleanrooms",
    "High-Performance Compute",
    "Field & Testing Devices",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header & Breadcrumb */}
      <div className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Resources</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Resource Discovery Catalog
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Institutional equipment and facilities directory with TrustFlow eligibility tracking.
          </p>
        </div>
        <div>
          <Badge variant="warning" className="px-3 py-1 text-xs">
            Phase 1 Foundation &bull; Data Source Not Connected
          </Badge>
        </div>
      </div>

      {/* Placeholder Notice Banner */}
      <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800 font-bold text-xs">
            !
          </div>
          <div>
            <span className="font-semibold">Discovery Catalog Placeholder:</span> Backend resource data endpoints (<code>/api/v1/resources</code>) will be integrated in Phase 2 once the database models are approved. No simulated data is being masqueraded as live inventory.
          </div>
        </div>
      </div>

      {/* Filter Bar Structure (Visual Specification) */}
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              type="text"
              disabled
              placeholder="Search by equipment model, lab, or capability (Disabled in initial foundation)..."
              className="w-full rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-400 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {placeholderCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 opacity-70"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Placeholder Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="border-dashed border-slate-300 bg-slate-50/50">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">PLANNED SLOT #{item}</span>
                <Badge variant="secondary" className="text-[10px]">Awaiting DB Schema</Badge>
              </div>
              <CardTitle className="text-base font-semibold text-slate-700 mt-2">
                Catalog Item Template #{item}
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Department, location, specifications, and custodian details will be rendered here dynamically upon API endpoint activation.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="space-y-2 border-t border-slate-200 pt-3 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>TrustFlow Stage:</span>
                  <span className="font-mono">ELIGIBILITY CHECK</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Induction:</span>
                  <span className="font-mono">PENDING SEED</span>
                </div>
              </div>
              <div className="mt-4">
                <Button disabled variant="outline" size="sm" className="w-full text-xs cursor-not-allowed">
                  Request via TrustFlow (Locked)
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Return to Landing Page */}
      <div className="mt-12 text-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-slate-600">
            &larr; Return to Platform Overview
          </Button>
        </Link>
      </div>
    </div>
  );
}
