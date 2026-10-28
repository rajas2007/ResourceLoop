import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const trustFlowSteps = [
    { num: "01", name: "Resource Discovery", desc: "Catalog search across departments and labs" },
    { num: "02", name: "Eligibility Verification", desc: "Automated check for certified operator training" },
    { num: "03", name: "Booking Request", desc: "Transparent slot reservation with documented purpose" },
    { num: "04", name: "Manager Approval", desc: "Designated custodian authorization review" },
    { num: "05", name: "Fair Allocation", desc: "Rules preventing monopolization across teams" },
    { num: "06", name: "Equipment Check-In", desc: "Physical handoff and custodial transfer" },
    { num: "07", name: "Initial Condition", desc: "Baseline state and calibration mutual signoff" },
    { num: "08", name: "Equipment Return", desc: "Scheduled session handback and turnover" },
    { num: "09", name: "Final Condition", desc: "Post-operation verification against initial baseline" },
    { num: "10", name: "Auditable History", desc: "Immutable transaction logs and incident tracking" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">
            Institutional Resource Sharing
          </Badge>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Resource<span className="text-teal-700">Loop</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            An intelligent resource-sharing platform that helps institutions share underused
            equipment, laboratories, technical devices, and spaces with verified custody and accountability.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/resources">
              <Button size="lg" className="w-full sm:w-auto font-semibold px-8 py-3 text-base shadow-sm">
                Explore Resource Catalog
              </Button>
            </Link>
            <a href="#trustflow">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold px-6 py-3 text-base">
                View TrustFlow Lifecycle
              </Button>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Accountability</div>
              <div className="mt-1 font-semibold text-slate-900">Dual Condition Attestation</div>
              <p className="mt-1 text-xs text-slate-500">Documented baseline condition at check-in verified against return condition.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Efficiency</div>
              <div className="mt-1 font-semibold text-slate-900">Fair Utilization Rules</div>
              <p className="mt-1 text-xs text-slate-500">Prevent equipment hoarding and optimize capital investment across departments.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Governance</div>
              <div className="mt-1 font-semibold text-slate-900">Auditable Custodial Chain</div>
              <p className="mt-1 text-xs text-slate-500">Complete historical logging for grant compliance, maintenance, and disputes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TrustFlow Section */}
      <section id="trustflow" className="py-16 bg-slate-50 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The TrustFlow Protocol
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              A 10-stage custodial lifecycle that guarantees mutual trust, qualified usage, and auditable responsibility between equipment owners and requesters.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trustFlowSteps.map((step) => (
              <Card key={step.num} className="border-slate-200 bg-white hover:border-teal-300 transition-colors">
                <CardHeader className="p-4 pb-2">
                  <span className="text-xs font-bold text-teal-700">{step.num}</span>
                  <CardTitle className="text-sm font-semibold text-slate-900">{step.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-1">
                  <CardDescription className="text-xs text-slate-500 leading-snug">{step.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/resources">
              <Button variant="secondary" size="md">
                Browse Resources Ready for TrustFlow Booking &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
