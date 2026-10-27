"use client";

import * as React from "react";
import {
  Sparkles,
  Activity,
  Bot,
  FileSpreadsheet,
  AlertTriangle,
  RefreshCw,
  Clock,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExecutiveHeaderProps {
  isStreaming: boolean;
  onToggleStreaming: () => void;
  isChatOpen: boolean;
  onToggleChat: () => void;
  onOpenReportModal: () => void;
  selectedQuarter: string;
  onSelectQuarter: (q: string) => void;
  selectedDepartment: string;
  onSelectDepartment: (dept: string) => void;
  lastUpdated: string;
}

export function ExecutiveHeader({
  isStreaming,
  onToggleStreaming,
  isChatOpen,
  onToggleChat,
  onOpenReportModal,
  selectedQuarter,
  onSelectQuarter,
  selectedDepartment,
  onSelectDepartment,
  lastUpdated,
}: ExecutiveHeaderProps) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 gap-3 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-blue-500 shadow-lg shadow-cyan-500/20">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  SYNAPSE <span className="text-cyan-400 font-extralight text-sm tracking-widest uppercase">Executive AI</span>
                </h1>
                <Badge variant="accent" className="hidden sm:inline-flex text-[10px] uppercase font-mono tracking-wider">
                  Causal Engine v2.4
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Bridging operational telemetry to financial performance & boardroom strategy
              </p>
            </div>
          </div>

          {/* Quick status & Actions */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Live Streaming Toggle */}
            <button
              onClick={onToggleStreaming}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isStreaming
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-sm shadow-emerald-500/20"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
              title="Toggle simulated real-time data streaming and anomaly alerts"
            >
              <Activity className={`h-3.5 w-3.5 ${isStreaming ? "animate-spin text-emerald-400" : ""}`} />
              <span className="font-mono text-[11px]">
                {isStreaming ? "LIVE STREAM ACTIVE" : "STREAM PAUSED"}
              </span>
            </button>

            {/* Export Executive Brief */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenReportModal}
              className="gap-1.5 text-xs text-slate-300"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export Brief</span>
            </Button>

            {/* AI Assistant Drawer Toggle */}
            <Button
              variant={isChatOpen ? "default" : "secondary"}
              size="sm"
              onClick={onToggleChat}
              className="gap-1.5 text-xs relative"
            >
              <Bot className="h-4 w-4" />
              <span>AI Assistant</span>
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping absolute -top-0.5 -right-0.5" />
            </Button>
          </div>
        </div>

        {/* Filter and Telemetry Ribbon */}
        <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Filter className="h-3 w-3 text-slate-400" /> Period:
            </span>
            {["Q3 2024", "Q4 Forecast", "LTM", "Full Year 2024"].map((quarter) => (
              <button
                key={quarter}
                onClick={() => onSelectQuarter(quarter)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedQuarter === quarter
                    ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold shadow-xs"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {quarter}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

            <span className="text-slate-400 font-medium hidden sm:inline">Scope:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => onSelectDepartment(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 rounded-md px-2.5 py-1 text-xs focus:ring-1 focus:ring-cyan-400 focus:outline-none"
            >
              <option value="all">Consolidated Enterprise (All Divisions)</option>
              <option value="b2b">Enterprise B2B Cloud</option>
              <option value="mid_market">Mid-Market Commercial</option>
              <option value="supply_chain">Operations & Fulfillment</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px] self-end sm:self-auto font-mono">
            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <AlertTriangle className="h-3 w-3" />
              <span>3 Critical Anomalies Active</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3 text-slate-400" />
              <span>Telemetry: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
