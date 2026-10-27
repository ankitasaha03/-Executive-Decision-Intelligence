"use client";

import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  HelpCircle,
  Target,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { Metric } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/utils";

interface ExecutiveMetricCardsProps {
  metrics: Metric[];
  onSelectMetric: (metric: Metric) => void;
  onOpenAiQueryForMetric: (metric: Metric) => void;
}

export function ExecutiveMetricCards({
  metrics,
  onSelectMetric,
  onOpenAiQueryForMetric,
}: ExecutiveMetricCardsProps) {
  // Financial outcome cards
  const financialMetrics = metrics.filter((m) => m.category === "financial");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span>Executive Financial Outcomes</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
              BOARDROOM KPI SUITE
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time corporate performance metrics connected to underlying operational drivers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialMetrics.map((metric) => {
          const isPositiveChange = metric.changePct > 0;
          const isGoodChange = metric.isPositiveDeltaGood
            ? isPositiveChange
            : !isPositiveChange;

          // Format value string
          let displayVal = "";
          let targetVal = "";
          if (metric.unit === "$") {
            displayVal = formatCurrency(metric.currentValue, true);
            targetVal = formatCurrency(metric.targetValue, true);
          } else if (metric.unit === "%") {
            displayVal = `${metric.currentValue.toFixed(1)}%`;
            targetVal = `${metric.targetValue.toFixed(1)}%`;
          } else {
            displayVal = `${formatNumber(metric.currentValue, true)} ${metric.unit}`;
            targetVal = `${formatNumber(metric.targetValue, true)} ${metric.unit}`;
          }

          // Generate SVG Sparkline
          const series = metric.historicalSeries;
          const values = series.map((s) => s.value);
          const minVal = Math.min(...values);
          const maxVal = Math.max(...values);
          const range = maxVal - minVal || 1;
          const height = 36;
          const width = 120;
          const points = series
            .map((pt, idx) => {
              const x = (idx / (series.length - 1)) * width;
              const y = height - ((pt.value - minVal) / range) * (height - 8) - 4;
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ");

          const strokeColor = isGoodChange ? "#10b981" : "#f43f5e";
          const fillColor = isGoodChange ? "rgba(16, 185, 129, 0.12)" : "rgba(244, 63, 94, 0.12)";

          return (
            <Card
              key={metric.id}
              onClick={() => onSelectMetric(metric)}
              className="relative overflow-hidden cursor-pointer group hover:border-cyan-500/50 hover:shadow-cyan-950/40 transition-all duration-300"
            >
              {/* Top accent glow line */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  metric.anomaly
                    ? "bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 animate-pulse"
                    : isGoodChange
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
                    : "bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600"
                }`}
              />

              <CardContent className="p-4 sm:p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-mono font-medium uppercase text-slate-400 block tracking-wider">
                      {metric.code}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {metric.name}
                    </h3>
                  </div>

                  {metric.anomaly && (
                    <Tooltip
                      content={
                        <div className="p-1 space-y-1">
                          <p className="font-semibold text-rose-300 flex items-center gap-1">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            Anomaly Alert ({metric.anomalyDetails?.severity})
                          </p>
                          <p className="text-[11px] text-slate-300">
                            {metric.anomalyDetails?.description}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Detected: {metric.anomalyDetails?.detectedAt}
                          </p>
                        </div>
                      }
                    >
                      <Badge variant="destructive" className="animate-pulse cursor-help text-[10px] px-2 py-0.5">
                        <AlertCircle className="h-3 w-3 mr-0.5" /> Anomaly
                      </Badge>
                    </Tooltip>
                  )}
                </div>

                {/* Primary Metric Value & Sparkline */}
                <div className="flex items-baseline justify-between mt-3 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                    {displayVal}
                  </span>

                  {/* Sparkline SVG */}
                  <div className="w-24 h-9">
                    <svg
                      viewBox={`0 0 ${width} ${height}`}
                      className="w-full h-full overflow-visible"
                    >
                      <polygon
                        points={`0,${height} ${points} ${width},${height}`}
                        fill={fillColor}
                      />
                      <polyline
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                      />
                    </svg>
                  </div>
                </div>

                {/* Variance and Target Breakdown */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1.5 font-medium">
                    {isPositiveChange ? (
                      <TrendingUp
                        className={`h-3.5 w-3.5 ${
                          isGoodChange ? "text-emerald-400" : "text-rose-400"
                        }`}
                      />
                    ) : (
                      <TrendingDown
                        className={`h-3.5 w-3.5 ${
                          isGoodChange ? "text-emerald-400" : "text-rose-400"
                        }`}
                      />
                    )}
                    <span
                      className={
                        isGoodChange ? "text-emerald-400 font-mono" : "text-rose-400 font-mono"
                      }
                    >
                      {formatPercent(metric.changePct, true)} YoY
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Target className="h-3 w-3 text-slate-400" />
                    <span>Plan: <span className="font-mono text-slate-300">{targetVal}</span></span>
                  </div>
                </div>

                {/* Footer action hint */}
                <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[11px] text-slate-400 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="truncate max-w-[170px] text-slate-400">{metric.dataSource}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAiQueryForMetric(metric);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 hover:underline font-medium"
                  >
                    Analyze <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
