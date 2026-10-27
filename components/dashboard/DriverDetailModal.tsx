"use client";

import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Sparkles,
  Database,
  GitBranch,
  ArrowRight,
  Target,
  Clock,
  Layers,
} from "lucide-react";
import { Metric, CausalLink } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

interface DriverDetailModalProps {
  metric: Metric | null;
  isOpen: boolean;
  onClose: () => void;
  causalLinks: CausalLink[];
  onOpenAiQuery: (prompt: string) => void;
}

export function DriverDetailModal({
  metric,
  isOpen,
  onClose,
  causalLinks,
  onOpenAiQuery,
}: DriverDetailModalProps) {
  if (!metric) return null;

  const isPositiveChange = metric.changePct > 0;
  const isGoodChange = metric.isPositiveDeltaGood ? isPositiveChange : !isPositiveChange;

  // Format value string
  let displayVal = "";
  let targetVal = "";
  if (metric.unit === "$") {
    displayVal = formatCurrency(metric.currentValue, false);
    targetVal = formatCurrency(metric.targetValue, false);
  } else if (metric.unit === "%") {
    displayVal = `${metric.currentValue.toFixed(1)}%`;
    targetVal = `${metric.targetValue.toFixed(1)}%`;
  } else {
    displayVal = `${formatNumber(metric.currentValue, false)} ${metric.unit}`;
    targetVal = `${formatNumber(metric.targetValue, false)} ${metric.unit}`;
  }

  // Find incoming & outgoing causal relationships
  const outgoingLinks = causalLinks.filter((l) => l.sourceMetricId === metric.id);
  const incomingLinks = causalLinks.filter((l) => l.targetMetricId === metric.id);

  // SVG Chart points
  const series = metric.historicalSeries;
  const values = series.map((s) => s.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  const chartHeight = 120;
  const chartWidth = 500;

  const points = series
    .map((pt, idx) => {
      const x = (idx / (series.length - 1)) * chartWidth;
      const y = chartHeight - ((pt.value - minVal) / range) * (chartHeight - 20) - 10;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="font-mono text-xs">
              {metric.code}
            </Badge>
            <Badge variant="outline" className="text-xs uppercase">
              {metric.category}
            </Badge>
            {metric.anomaly && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                Active Anomaly Alert
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl text-white font-bold">
            {metric.name}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {metric.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Key Metric Headline Values */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Current Telemetry
              </span>
              <span className="text-xl font-bold font-mono text-white mt-1 block">
                {displayVal}
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Plan Target
              </span>
              <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">
                {targetVal}
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                YoY Variance
              </span>
              <span
                className={`text-xl font-bold font-mono mt-1 block ${
                  isGoodChange ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {formatPercent(metric.changePct, true)}
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                System of Record
              </span>
              <span className="text-xs font-medium text-slate-300 truncate mt-1 block">
                {metric.dataSource}
              </span>
            </div>
          </div>

          {/* Anomaly Box */}
          {metric.anomaly && metric.anomalyDetails && (
            <div className="p-3.5 rounded-lg border border-rose-900/50 bg-rose-950/30 text-xs space-y-1">
              <div className="flex items-center gap-2 text-rose-300 font-semibold">
                <ShieldAlert className="h-4 w-4" />
                <span>Operational Anomaly Detected ({metric.anomalyDetails.severity})</span>
              </div>
              <p className="text-slate-300">{metric.anomalyDetails.description}</p>
              <p className="text-[11px] text-slate-400">
                Timestamp: {metric.anomalyDetails.detectedAt}
              </p>
            </div>
          )}

          {/* 12-Month Historical Trend Chart */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/90 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">
                12-Month Historical Run Rate & Trajectory
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Nov 2023 - Oct 2024
              </span>
            </div>

            <div className="w-full h-32 pt-2">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                {/* Horizontal baseline */}
                <line
                  x1="0"
                  y1={chartHeight / 2}
                  x2={chartWidth}
                  y2={chartHeight / 2}
                  stroke="#334155"
                  strokeDasharray="4 4"
                />
                <polyline
                  fill="none"
                  stroke={isGoodChange ? "#10b981" : "#f43f5e"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />
              </svg>
            </div>

            <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
              <span>{series[0]?.date}</span>
              <span>{series[Math.floor(series.length / 2)]?.date}</span>
              <span>{series[series.length - 1]?.date}</span>
            </div>
          </div>

          {/* Causal Transmission Chain */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Causal Model Transmission Links
            </span>

            {outgoingLinks.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400">Downstream Financial Impacts:</span>
                {outgoingLinks.map((link) => (
                  <div
                    key={link.id}
                    className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-medium text-white flex items-center gap-1.5">
                        <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
                        {link.targetName}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">{link.mechanism}</p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono">
                      <span className="text-cyan-300">r = {link.correlation}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {link.unitLabel}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {incomingLinks.length > 0 && (
              <div className="space-y-1.5 mt-2">
                <span className="text-[11px] text-slate-400">Upstream Operational Roots:</span>
                {incomingLinks.map((link) => (
                  <div
                    key={link.id}
                    className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-medium text-white flex items-center gap-1.5">
                        <ArrowRight className="h-3.5 w-3.5 text-indigo-400" />
                        {link.sourceName}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">{link.mechanism}</p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono">
                      <span className="text-indigo-300">r = {link.correlation}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {link.unitLabel}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">
            Close
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => {
              onClose();
              onOpenAiQuery(
                `Provide an executive briefing on ${metric.name}: explain current performance (${displayVal} vs target ${targetVal}), correlation with corporate ARR and EBITDA, and recommended action steps.`
              );
            }}
            className="gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Consult AI on {metric.code}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
