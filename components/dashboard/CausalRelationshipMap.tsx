"use client";

import * as React from "react";
import {
  GitMerge,
  ArrowRight,
  Zap,
  Layers,
  Sparkles,
  Info,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Network,
} from "lucide-react";
import { CausalLink, Metric, DriverImpact } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface CausalRelationshipMapProps {
  metrics: Metric[];
  causalLinks: CausalLink[];
  topDrivers: DriverImpact[];
  onSelectMetric: (metric: Metric) => void;
  onOpenAiQuery: (prompt: string) => void;
}

interface NodeDef {
  id: string;
  name: string;
  code: string;
  layer: "operational" | "transmission" | "outcome";
  metricId: string;
  x: number; // percentage in svg
  y: number; // percentage in svg
  category: string;
  impactScore: number; // positive or negative
  value: string;
}

export function CausalRelationshipMap({
  metrics,
  causalLinks,
  topDrivers,
  onSelectMetric,
  onOpenAiQuery,
}: CausalRelationshipMapProps) {
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>("lrt");
  const [hoveredNodeId, setHoveredNodeId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"network" | "matrix">("network");

  // Nodes definition laid out in a responsive 3-layer DAG
  const nodes: NodeDef[] = [
    // Layer 1: Operational Levers (Left column)
    {
      id: "lrt",
      name: "Lead Response Time",
      code: "LRT",
      layer: "operational",
      metricId: "lrt",
      x: 80,
      y: 70,
      category: "Sales",
      impactScore: -0.84,
      value: "46.2 mins",
    },
    {
      id: "cac",
      name: "Customer Acquisition Cost",
      code: "CAC",
      layer: "operational",
      metricId: "cac",
      x: 80,
      y: 160,
      category: "Sales",
      impactScore: -0.83,
      value: "$9,420",
    },
    {
      id: "strt",
      name: "Support Resolution Time",
      code: "STRT",
      layer: "operational",
      metricId: "strt",
      x: 80,
      y: 250,
      category: "Support",
      impactScore: -0.79,
      value: "19.4 hrs",
    },
    {
      id: "uptime",
      name: "Platform Uptime",
      code: "UPTIME",
      layer: "operational",
      metricId: "uptime",
      x: 80,
      y: 340,
      category: "Product",
      impactScore: 0.81,
      value: "99.88%",
    },
    {
      id: "invt",
      name: "Inventory Turnover",
      code: "INVT",
      layer: "operational",
      metricId: "inventory_turnover",
      x: 80,
      y: 430,
      category: "Operations",
      impactScore: 0.72,
      value: "6.4x",
    },

    // Layer 2: Intermediate Transmission / Pipeline Mechanisms (Middle column)
    {
      id: "win_rate",
      name: "Demo Win Rate",
      code: "WIN",
      layer: "transmission",
      metricId: "win_rate",
      x: 390,
      y: 110,
      category: "Pipeline",
      impactScore: 0.88,
      value: "21.4%",
    },
    {
      id: "churn",
      name: "Logo Churn Rate",
      code: "CHURN",
      layer: "transmission",
      metricId: "churn",
      x: 390,
      y: 270,
      category: "Retention",
      impactScore: -0.91,
      value: "4.8%",
    },
    {
      id: "gross_margin",
      name: "Gross Margin %",
      code: "GM",
      layer: "transmission",
      metricId: "gross_margin",
      x: 390,
      y: 400,
      category: "Unit Cost",
      impactScore: 0.74,
      value: "72.8%",
    },

    // Layer 3: Financial Outcomes (Right column)
    {
      id: "arr",
      name: "Annual Recurring Revenue",
      code: "ARR",
      layer: "outcome",
      metricId: "arr",
      x: 700,
      y: 130,
      category: "Top-Line",
      impactScore: 1.0,
      value: "$84.25M",
    },
    {
      id: "ebitda",
      name: "Operating EBITDA",
      code: "EBITDA",
      layer: "outcome",
      metricId: "ebitda",
      x: 700,
      y: 270,
      category: "Profitability",
      impactScore: 1.0,
      value: "$18.62M",
    },
    {
      id: "nrr",
      name: "Net Retention Rate",
      code: "NRR",
      layer: "outcome",
      metricId: "nrr",
      x: 700,
      y: 400,
      category: "Compounding",
      impactScore: 1.0,
      value: "111.4%",
    },
  ];

  // Visual Connections (Edges) with business causality weights
  const edges = [
    { from: "lrt", to: "win_rate", r: -0.84, lag: "14d", color: "#f43f5e", text: "-0.84" },
    { from: "win_rate", to: "arr", r: 0.88, lag: "Quarterly", color: "#10b981", text: "+0.88" },
    { from: "cac", to: "ebitda", r: -0.83, lag: "Monthly", color: "#f43f5e", text: "-0.83" },
    { from: "strt", to: "churn", r: 0.79, lag: "30d", color: "#f43f5e", text: "+0.79" },
    { from: "strt", to: "ebitda", r: -0.76, lag: "Immediate", color: "#f43f5e", text: "-0.76" },
    { from: "churn", to: "arr", r: -0.91, lag: "Monthly", color: "#f43f5e", text: "-0.91" },
    { from: "churn", to: "ebitda", r: -0.87, lag: "Monthly", color: "#f43f5e", text: "-0.87" },
    { from: "uptime", to: "nrr", r: 0.81, lag: "60d", color: "#10b981", text: "+0.81" },
    { from: "invt", to: "gross_margin", r: 0.72, lag: "Quarterly", color: "#10b981", text: "+0.72" },
    { from: "gross_margin", to: "ebitda", r: 0.89, lag: "Monthly", color: "#10b981", text: "+0.89" },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  const activeMetric = metrics.find((m) => m.id === activeNode.metricId);
  const activeCausalLink = causalLinks.find(
    (l) => l.sourceMetricId === activeNode.metricId || l.targetMetricId === activeNode.metricId
  );

  // Is an edge connected to the active node?
  const isEdgeHighlighted = (from: string, to: string) => {
    if (!selectedNodeId && !hoveredNodeId) return true;
    const target = hoveredNodeId || selectedNodeId;
    return from === target || to === target;
  };

  return (
    <Card className="border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden">
      <CardHeader className="p-4 sm:p-5 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Network className="h-4 w-4" />
              </span>
              <CardTitle className="text-base text-white">
                Causal Graph: Operational Telemetry to Financial Impact
              </CardTitle>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Interactive node graph mapping operational lead metrics through conversion channels to corporate financial outcomes.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-950/80 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode("network")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === "network"
                  ? "bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/60"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <GitMerge className="h-3.5 w-3.5" />
              <span>Causal Map</span>
            </button>
            <button
              onClick={() => setViewMode("matrix")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === "matrix"
                  ? "bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/60"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Driver Impact Matrix</span>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {viewMode === "network" ? (
          <div className="space-y-4">
            {/* Graph Legend & Instructions */}
            <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2 pb-1 border-b border-slate-800/60">
              <div className="flex items-center gap-4">
                <span className="text-slate-300 font-medium">Layers:</span>
                <span className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-cyan-400"></span> 1. Operational Inputs
                </span>
                <span className="flex items-center gap-1.5 text-indigo-400 font-mono text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-indigo-400"></span> 2. Pipeline / Unit Economics
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span> 3. Financial Outcomes
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-4 bg-emerald-500 rounded"></span> Lift (+)
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="h-1.5 w-4 bg-rose-500 rounded"></span> Drag (-)
                </span>
                <span className="text-slate-400 italic">Click node to inspect causal chain</span>
              </div>
            </div>

            {/* Interactive SVG Canvas */}
            <div className="relative w-full overflow-x-auto rounded-xl bg-slate-950/90 border border-slate-800/80 p-2 min-h-[490px]">
              <svg
                viewBox="0 0 850 490"
                className="w-full h-auto min-w-[750px] select-none"
              >
                <defs>
                  {/* Arrow markers */}
                  <marker
                    id="arrow-emerald"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                  </marker>
                  <marker
                    id="arrow-rose"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                  </marker>
                  <marker
                    id="arrow-cyan"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                  </marker>

                  {/* Linear gradient backgrounds */}
                  <linearGradient id="nodeGradOperational" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>

                {/* Layer column backdrops */}
                <rect x="15" y="15" width="220" height="460" rx="10" fill="#0b1120" stroke="#1e293b" strokeDasharray="3 3" />
                <rect x="290" y="15" width="240" height="460" rx="10" fill="#0b1120" stroke="#1e293b" strokeDasharray="3 3" />
                <rect x="580" y="15" width="255" height="460" rx="10" fill="#0b1120" stroke="#1e293b" strokeDasharray="3 3" />

                {/* Layer titles */}
                <text x="125" y="38" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="0.05em">
                  OPERATIONAL INPUTS
                </text>
                <text x="410" y="38" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="0.05em">
                  TRANSMISSION MECHANISMS
                </text>
                <text x="707" y="38" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="0.05em">
                  FINANCIAL OUTCOMES
                </text>

                {/* Draw Bezier Edges */}
                {edges.map((edge, idx) => {
                  const source = nodes.find((n) => n.id === edge.from)!;
                  const target = nodes.find((n) => n.id === edge.to)!;
                  const isHighlighted = isEdgeHighlighted(edge.from, edge.to);

                  // Node width is ~170px, height is ~50px
                  const startX = source.x + 85;
                  const startY = source.y + 24;
                  const endX = target.x - 85;
                  const endY = target.y + 24;

                  const midX = (startX + endX) / 2;
                  const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

                  const strokeColor = !isHighlighted
                    ? "#334155"
                    : edge.color === "#10b981"
                    ? "#10b981"
                    : "#f43f5e";

                  const strokeWidth = !isHighlighted ? 1.2 : Math.max(2, Math.abs(edge.r) * 3.5);
                  const strokeOpacity = !isHighlighted ? 0.25 : 0.95;

                  return (
                    <g key={idx} className="transition-all duration-300">
                      <path
                        d={path}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeOpacity={strokeOpacity}
                        strokeDasharray={!isHighlighted ? "4 4" : undefined}
                      />
                      {/* Causal coefficient badge on curve midpoint */}
                      {isHighlighted && (
                        <g transform={`translate(${midX}, ${(startY + endY) / 2})`}>
                          <rect
                            x="-22"
                            y="-9"
                            width="44"
                            height="18"
                            rx="4"
                            fill="#090d16"
                            stroke={strokeColor}
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill={strokeColor}
                            fontSize="9"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            {edge.text}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Draw Nodes */}
                {nodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;

                  const isOutcome = node.layer === "outcome";
                  const isTransmission = node.layer === "transmission";

                  let borderColor = "#334155";
                  let glowColor = "transparent";
                  if (isSelected) {
                    borderColor = "#06b6d4";
                    glowColor = "rgba(6, 182, 212, 0.3)";
                  } else if (isHovered) {
                    borderColor = "#94a3b8";
                  } else if (isOutcome) {
                    borderColor = "#059669";
                  }

                  const rectWidth = isOutcome ? 190 : 170;
                  const rectHeight = 52;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x - rectWidth / 2}, ${node.y})`}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedNodeId(node.id);
                        const metric = metrics.find((m) => m.id === node.metricId);
                        if (metric) onSelectMetric(metric);
                      }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Node Box */}
                      <rect
                        width={rectWidth}
                        height={rectHeight}
                        rx="10"
                        fill="#0f172a"
                        stroke={borderColor}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        style={{
                          filter: isSelected ? "drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))" : undefined,
                        }}
                      />

                      {/* Header strip */}
                      <rect
                        x="1"
                        y="1"
                        width={rectWidth - 2}
                        height="18"
                        rx="9"
                        fill={isOutcome ? "rgba(16, 185, 129, 0.15)" : isTransmission ? "rgba(99, 102, 241, 0.15)" : "rgba(6, 182, 212, 0.1)"}
                      />

                      {/* Category label */}
                      <text
                        x="10"
                        y="13"
                        fill={isOutcome ? "#34d399" : isTransmission ? "#a5b4fc" : "#67e8f9"}
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="monospace"
                        letterSpacing="0.05em"
                      >
                        {node.code} • {node.category}
                      </text>

                      {/* Node Title */}
                      <text
                        x="10"
                        y="33"
                        fill="#f8fafc"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {node.name.length > 21 ? `${node.name.substring(0, 19)}...` : node.name}
                      </text>

                      {/* Node Current Value */}
                      <text
                        x={rectWidth - 10}
                        y="44"
                        textAnchor="end"
                        fill="#94a3b8"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {node.value}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Deep-Dive Causal Card for the Selected Node */}
            {activeNode && (
              <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-slate-900/80 p-4 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="font-mono text-xs">
                        {activeNode.code}
                      </Badge>
                      <h4 className="text-sm font-semibold text-white">
                        {activeNode.name} ({activeNode.value})
                      </h4>
                      <Badge variant={activeNode.impactScore < 0 ? "destructive" : "success"} className="text-[10px]">
                        {activeNode.impactScore < 0 ? "Negative Drag" : "Positive Leverage"}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300">
                      {activeCausalLink ? activeCausalLink.mechanism : activeMetric?.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => activeMetric && onSelectMetric(activeMetric)}
                      className="text-xs text-slate-300"
                    >
                      Metric Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() =>
                        onOpenAiQuery(
                          `Explain the full causal transmission chain and financial impact of ${activeNode.name} on ARR and EBITDA.`
                        )
                      }
                      className="text-xs gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Ask AI</span>
                    </Button>
                  </div>
                </div>

                {activeCausalLink && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Correlation & Elasticity</span>
                      <span className="text-sm font-bold text-cyan-300 font-mono">
                        r = {activeCausalLink.correlation}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{activeCausalLink.unitLabel}</span>
                    </div>

                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Causal Lag & p-Value</span>
                      <span className="text-sm font-bold text-indigo-300 font-mono">
                        {activeCausalLink.timeLag}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">p = {activeCausalLink.pValue} (Statistically Significant)</span>
                    </div>

                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Model Confidence</span>
                      <span className="text-sm font-bold text-emerald-300 font-mono">
                        {activeCausalLink.confidence}%
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Empirical evidence from CRM & Billing</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Driver Impact Matrix View */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Operational Drivers Ranked by Q3 Financial Impact</span>
              <span>Total Estimated Variance: <span className="font-mono text-rose-400">-$6.98M</span></span>
            </div>

            <div className="space-y-3">
              {topDrivers.map((driver, idx) => {
                const isNegative = driver.direction === "negative";
                const barWidth = Math.min(100, (Math.abs(driver.impactDollars) / 3000000) * 100);

                return (
                  <div
                    key={driver.metricId}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all cursor-pointer"
                    onClick={() => {
                      const metric = metrics.find((m) => m.id === driver.metricId);
                      if (metric) onSelectMetric(metric);
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-mono text-slate-300 font-semibold">
                          #{idx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-white">{driver.name}</h4>
                        <Badge variant="secondary" className="text-[10px] uppercase font-mono">
                          {driver.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-mono">
                          r = {driver.correlation}
                        </span>
                        <span
                          className={`text-sm font-mono font-bold ${
                            isNegative ? "text-rose-400" : "text-emerald-400"
                          }`}
                        >
                          {formatCurrency(driver.impactDollars)}
                        </span>
                      </div>
                    </div>

                    {/* Impact Bar */}
                    <div className="w-full bg-slate-900 rounded-full h-2 mb-2 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isNegative ? "bg-gradient-to-r from-rose-500 to-amber-500" : "bg-gradient-to-r from-emerald-500 to-teal-400"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <p className="truncate max-w-md">{driver.keyFinding}</p>
                      <span className="text-[11px] text-cyan-400 font-mono shrink-0">
                        {driver.elasticityLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
