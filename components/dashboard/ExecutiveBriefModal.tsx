"use client";

import * as React from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExecutiveBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  quarter: string;
}

export function ExecutiveBriefModal({ isOpen, onClose, quarter }: ExecutiveBriefModalProps) {
  const [copied, setCopied] = React.useState(false);

  const briefMarkdown = `# SYNAPSE EXECUTIVE DECISION INTELLIGENCE BRIEF
Generated: October 28, 2024 | Scope: Enterprise Consolidated (${quarter})
Confidence Score: 96.4% | Causal Attribution Engine v2.4

---

## 1. Executive Summary & Boardroom Synthesis
- **ARR:** $84.25M (+14.2% YoY, -$3.75M vs Board Target of $88.00M)
- **Operating EBITDA:** $18.62M (22.1% margin vs Target of 24.5%)
- **Net Retention Rate (NRR):** 111.4% (degraded from 114.2% prior year)
- **Gross Profit Margin:** 72.8% (Target: 74.5%)

Causal telemetry confirms that the primary reason for top-line and margin compression is not market softness or demand shortfall, but **two specific internal operational bottlenecks: Lead Response Latency and Support Ticket Resolution Delays.**

---

## 2. Top Causal Drivers of Financial Variance

### Driver 1: Lead Response Time Drift (-$2.21M ARR Impact)
- **Telemetry:** Inbound SDR qualification response slipped from 18.2m to 46.2m (+62.1% worse).
- **Causal Mechanism (r = -0.84):** Form-to-demo show-up rates fell from 79% to 52%. Demo-to-close win rate declined from 24.8% to 21.4%.
- **Source of Record:** HubSpot Inbound API & Salesforce CRM Opportunity Pipeline.

### Driver 2: Support Resolution Delay & Mid-Market Churn (-$2.80M ARR, -$1.28M EBITDA)
- **Telemetry:** MTTR for P1/P2 customer tickets increased from 11.2h to 19.4h (+73.2%) following release v4.2.
- **Causal Mechanism (r = -0.79 with NRR):** 78% of Q3 churned accounts had unresolved support tickets exceeding 24 hours. Logo churn rose to 4.8%.
- **Source of Record:** Zendesk Enterprise SLA Logs & Stripe Subscriptions.

### Driver 3: Support Overtime & Cloud Infrastructure Incident (-$1.00M EBITDA Margin Drag)
- **Telemetry:** Support engineer overtime ($410K) and US-East cloud failover remediation costs ($320K) compressed EBITDA margin to 22.1%.

---

## 3. High-Leverage Strategic Action Plan (Next 60 Days)
1. **Automated Lead Routing & SLA Enforcement:**
   - Deploy AI-assisted instant lead routing in HubSpot/Chili Piper to guarantee < 12m response time.
   - Projected Financial Lift: **+$3.45M ARR recovery**.
2. **Support Bug-Bash & Capacity Rebalancing:**
   - Execute targeted engineering sprint on top 5 customer-facing regressions in v4.2.
   - Authorize temporary tier-2 surge capacity to restore MTTR under 8.0 hours.
   - Projected Financial Lift: **+$1.75M ARR retention + $650K EBITDA recovery**.
3. **Cloud FinOps Caching Modernization:**
   - Convert over-provisioned idle compute to 3-year savings plans and deploy Redis query caching.
   - Projected Financial Lift: **+$1.45M EBITDA expansion**.

---
*Verified by Synapse Causal Telemetry Engine | NetSuite / Stripe / Salesforce / Datadog Verified*`;

  const handleCopy = () => {
    navigator.clipboard.writeText(briefMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([briefMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Executive_Decision_Brief_${quarter.replace(" ", "_")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="h-4 w-4" />
            </span>
            <DialogTitle className="text-xl text-white font-bold">
              Boardroom Executive Brief: {quarter}
            </DialogTitle>
            <Badge variant="success" className="text-[10px] ml-auto">
              <ShieldCheck className="h-3 w-3 mr-1" /> Audit Verified
            </Badge>
          </div>
          <DialogDescription className="text-slate-300">
            Synthesized causal summary prepared for executive leadership and board review.
          </DialogDescription>
        </DialogHeader>

        {/* Formatted Report Preview Box */}
        <div className="max-h-[60vh] overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text selection:bg-cyan-500/30 selection:text-white">
          {briefMarkdown}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">
            Close
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 text-slate-200"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Markdown</span>
                </>
              )}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
              className="gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Report (.md)</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
