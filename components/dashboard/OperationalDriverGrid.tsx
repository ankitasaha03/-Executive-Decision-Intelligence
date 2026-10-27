"use client";

import * as React from "react";
import {
  Activity,
  TrendingDown,
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  ShieldAlert,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { Metric } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

interface OperationalDriverGridProps {
  metrics: Metric[];
  onSelectMetric: (metric: Metric) => void;
  onOpenAiQuery: (prompt: string) => void;
}

export function OperationalDriverGrid({
  metrics,
  onSelectMetric,
  onOpenAiQuery,
}: OperationalDriverGridProps) {
  const [activeFilter, setActiveFilter] = React.useState<string>("all");

  // Operational metrics exclude purely high-level financial outcomes
  const operationalMetrics = metrics.filter((m) => m.category !== "financial");

  const filteredMetrics = operationalMetrics.filter((m) => {
    if (activeFilter === "all") return true;
    return m.category === activeFilter;
  });

  return (
    <Card className="border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden">
      <CardHeader className="p-4 sm:p-5 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Activity className="h-4 w-4" />
              </span>
              <CardTitle className="text-base text-white">
                Operational Telemetry & Driver Deep-Dive
              </CardTitle>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cross-department operational lead indicators feeding directly into the causal financial model.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs">
            {[
              { id: "all", label: "All Operational Drivers" },
              { id: "sales", label: "Sales & Marketing" },
              { id: "support", label: "Support & CX" },
              { id: "product", label: "Platform & Tech" },
              { id: "operations", label: "Ops & Logistics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? "bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/60"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMetrics.map((metric) => {
            const isPositiveChange = metric.changePct > 0;
            const isGoodChange = metric.isPositiveDeltaGood
              ? isPositiveChange
              : !isPositiveChange;

            let displayVal = "";
            let targetVal = "";
            if (metric.unit === "$") {
              displayVal = formatCurrency(metric.currentValue, false);
              targetVal = formatCurrency(metric.targetValue, false);
            } else if (metric.unit === "%") {
              displayVal = `${metric.currentValue.toFixed(1)}%`;
              targetVal = `${metric.targetValue.toFixed(1)}%`;
            } else if (metric.unit === "mins") {
              displayVal = `${metric.currentValue} mins`;
              targetVal = `${metric.targetValue} mins`;
            } else if (metric.unit === "hrs") {
              displayVal = `${metric.currentValue} hrs`;
              targetVal = `${metric.targetValue} hrs`;
            } else if (metric.unit === "days") {
              displayVal = `${metric.currentValue} days`;
              targetVal = `${metric.targetValue} days`;
            } else {
              displayVal = `${metric.currentValue} ${metric.unit}`;
              targetVal = `${metric.targetValue} ${metric.unit}`;
            }

            return (
              <div
                key={metric.id}
                onClick={() => onSelectMetric(metric)}
                className="group relative rounded-xl border border-slate-800 bg-slate-950/70 p-4 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/30 transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Header row */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                          {metric.code}
                        </span>
                        <span className="text-[10px] text-slate-400">• {metric.department}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                        {metric.name}
                      </h4>
                    </div>

                    {metric.anomaly ? (
                      <Badge variant="destructive" className="text-[10px] animate-pulse px-1.5 py-0.5">
                        Anomaly
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] uppercase font-mono">
                        {metric.category}
                      </Badge>
                    )}
                  </div>

                  {/* Value & Delta */}
                  <div className="flex items-baseline justify-between mt-3 mb-2">
                    <span className="text-2xl font-bold font-mono text-white">
                      {displayVal}
                    </span>
                    <span
                      className={`text-xs font-mono font-semibold flex items-center gap-1 ${
                        isGoodChange ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {isPositiveChange ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {formatPercent(metric.changePct, true)}
                    </span>
                  </div>

                  {/* Benchmark target line */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>Target: <span className="text-slate-300 font-mono">{targetVal}</span></span>
                    <span className="truncate max-w-[150px]">{metric.dataSource}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {metric.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-cyan-400/90 group-hover:text-cyan-300 flex items-center gap-1">
                    Inspect Driver <ArrowUpRight className="h-3 w-3" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAiQuery(
                        `How does ${metric.name} (${displayVal}) impact our overall quarterly profitability and EBITDA? Give me the regression formula.`
                      );
                    }}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="h-3 w-3 text-cyan-400" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
