"use client";

import * as React from "react";
import {
  ShieldAlert,
  Sparkles,
  TrendingUp,
  FileText,
  Database,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ExecutiveInsight } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RootCauseFeedProps {
  insights: ExecutiveInsight[];
  onOpenAiQuery: (prompt: string) => void;
}

export function RootCauseFeed({ insights, onOpenAiQuery }: RootCauseFeedProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(insights[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Card className="border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden">
      <CardHeader className="p-4 sm:p-5 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <FileText className="h-4 w-4" />
              </span>
              <CardTitle className="text-base text-white">
                Executive Root-Cause Analysis Brief
              </CardTitle>
              <Badge variant="accent" className="text-[10px] uppercase font-mono">
                Automated Synthesis
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Top 3 performance drivers detected this quarter with empirical statistical backing and data source citations.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Synthesized: Q3 2024 Audit
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4">
        {insights.map((insight, idx) => {
          const isExpanded = expandedId === insight.id;
          const isCritical = insight.severity === "critical";

          return (
            <div
              key={insight.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isCritical
                  ? "border-rose-900/40 bg-gradient-to-r from-rose-950/20 via-slate-950/60 to-slate-950/80 hover:border-rose-700/60"
                  : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
              }`}
            >
              {/* Card Header clickable */}
              <div
                className="p-4 cursor-pointer flex items-start justify-between gap-3 select-none"
                onClick={() => toggleExpand(insight.id)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold font-mono mt-0.5 ${
                      isCritical
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors">
                        {insight.title}
                      </h4>
                      <Badge
                        variant={isCritical ? "destructive" : "success"}
                        className="text-[10px]"
                      >
                        {isCritical ? "Critical Drag" : "High Opportunity"}
                      </Badge>
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        Confidence: {insight.confidenceScore}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {insight.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold hidden sm:inline text-slate-200">
                    {insight.financialImpact.split(" ")[0]}
                  </span>
                  <button className="p-1 text-slate-400 hover:text-slate-200">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Detailed Analysis */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-slate-800/60 text-xs">
                  {/* Detailed Analysis Text */}
                  <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-slate-300 leading-relaxed">
                    <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                      Detailed Causal Analysis & Mechanism:
                    </p>
                    <p>{insight.detailedAnalysis}</p>
                  </div>

                  {/* Financial Impact & Recommended Action */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Quantified Financial Impact
                      </span>
                      <p className="text-sm font-bold font-mono text-rose-300">
                        {insight.financialImpact}
                      </p>
                    </div>

                    <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Recommended Executive Intervention
                      </span>
                      <p className="text-xs text-slate-200">
                        {insight.recommendedAction}
                      </p>
                    </div>
                  </div>

                  {/* Underlying Data Source Citations */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <Database className="h-3 w-3 text-slate-400" /> Underlying Data Sources:
                      </span>
                      {insight.dataSources.map((source, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/30"
                        >
                          {source}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="cyan"
                      size="sm"
                      onClick={() =>
                        onOpenAiQuery(
                          `Explain the full root cause, data evidence, and step-by-step mitigation plan for: "${insight.title}". Reference sources: ${insight.dataSources.join(", ")}.`
                        )
                      }
                      className="text-xs gap-1.5 shrink-0"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Deep Dive in AI Chat</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
