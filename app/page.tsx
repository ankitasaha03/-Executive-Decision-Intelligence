"use client";

import * as React from "react";
import {
  INITIAL_METRICS,
  CAUSAL_LINKS,
  TOP_DRIVERS,
  EXECUTIVE_INSIGHTS,
} from "@/lib/data";
import { Metric, CausalLink, DriverImpact, ExecutiveInsight } from "@/types";
import { ExecutiveHeader } from "@/components/dashboard/ExecutiveHeader";
import { ExecutiveMetricCards } from "@/components/dashboard/ExecutiveMetricCards";
import { CausalRelationshipMap } from "@/components/dashboard/CausalRelationshipMap";
import { ScenarioSimulator } from "@/components/dashboard/ScenarioSimulator";
import { RootCauseFeed } from "@/components/dashboard/RootCauseFeed";
import { OperationalDriverGrid } from "@/components/dashboard/OperationalDriverGrid";
import { DriverDetailModal } from "@/components/dashboard/DriverDetailModal";
import { ExecutiveBriefModal } from "@/components/dashboard/ExecutiveBriefModal";
import { AiExecutiveChat } from "@/components/chat/AiExecutiveChat";
import {
  Activity,
  AlertTriangle,
  Database,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";

export default function DashboardPage() {
  const [metrics, setMetrics] = React.useState<Metric[]>(INITIAL_METRICS);
  const [isStreaming, setIsStreaming] = React.useState(true);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isBriefModalOpen, setIsBriefModalOpen] = React.useState(false);
  const [selectedMetricForModal, setSelectedMetricForModal] = React.useState<Metric | null>(null);
  const [chatPromptFromExternal, setChatPromptFromExternal] = React.useState<string | null>(null);

  const [selectedQuarter, setSelectedQuarter] = React.useState("Q3 2024");
  const [selectedDepartment, setSelectedDepartment] = React.useState("all");
  const [lastUpdated, setLastUpdated] = React.useState("Just now");
  const [liveNotification, setLiveNotification] = React.useState<string | null>(null);

  // Real-time data streaming simulator
  React.useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          // Add subtle realistic fluctuation to operational metrics
          if (m.id === "lrt") {
            const jitter = (Math.random() - 0.48) * 0.4;
            const newVal = parseFloat(Math.max(15, m.currentValue + jitter).toFixed(1));
            return { ...m, currentValue: newVal };
          }
          if (m.id === "strt") {
            const jitter = (Math.random() - 0.5) * 0.15;
            const newVal = parseFloat(Math.max(8, m.currentValue + jitter).toFixed(1));
            return { ...m, currentValue: newVal };
          }
          if (m.id === "arr") {
            // subtle ARR micro-increment
            const delta = Math.floor((Math.random() - 0.4) * 8000);
            return { ...m, currentValue: m.currentValue + delta };
          }
          return m;
        })
      );

      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

      // Occasional live notification
      if (Math.random() > 0.75) {
        const events = [
          "Live Telemetry: Inbound Lead Queue routed 34 enterprise prospects via Chili Piper",
          "Telemetry Update: Zendesk Tier-2 escalation queue MTTR adjusted to 19.3h",
          "Stripe Billing Webhook: Enterprise expansion detected (+$45,000 ARR in Cloud Tier)",
          "Datadog Synthetics: US-East API latency stabilized at 310ms"
        ];
        const randomEvt = events[Math.floor(Math.random() * events.length)];
        setLiveNotification(randomEvt);
        setTimeout(() => setLiveNotification(null), 4000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Open AI Chat with a specific question
  const handleOpenAiQuery = (prompt: string) => {
    setChatPromptFromExternal(prompt);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Executive Header */}
      <ExecutiveHeader
        isStreaming={isStreaming}
        onToggleStreaming={() => setIsStreaming(!isStreaming)}
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onOpenReportModal={() => setIsBriefModalOpen(true)}
        selectedQuarter={selectedQuarter}
        onSelectQuarter={setSelectedQuarter}
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
        lastUpdated={lastUpdated}
      />

      {/* Live Stream Telemetry Banner (when active notification occurs) */}
      {liveNotification && (
        <div className="bg-cyan-950/80 border-b border-cyan-800/40 text-cyan-200 text-xs py-1.5 px-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono">{liveNotification}</span>
            </div>
            <span className="text-[10px] text-cyan-400 uppercase font-mono">Live Ingestion Event</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Section 1: Executive Financial Outcomes Overview Cards */}
        <ExecutiveMetricCards
          metrics={metrics}
          onSelectMetric={(m) => setSelectedMetricForModal(m)}
          onOpenAiQueryForMetric={(m) =>
            handleOpenAiQuery(
              `Analyze the performance of ${m.name} (${m.code}). Current value is ${m.currentValue} ${m.unit} vs plan target of ${m.targetValue} ${m.unit}. What are the primary operational drivers causing this variance?`
            )
          }
        />

        {/* Section 2: Visual Focus - KPI Relationship & Driver Map */}
        <CausalRelationshipMap
          metrics={metrics}
          causalLinks={CAUSAL_LINKS}
          topDrivers={TOP_DRIVERS}
          onSelectMetric={(m) => setSelectedMetricForModal(m)}
          onOpenAiQuery={handleOpenAiQuery}
        />

        {/* Section 3: Scenario Simulator & What-If Engine */}
        <ScenarioSimulator onOpenAiQuery={handleOpenAiQuery} />

        {/* Section 4: Root-Cause Analysis Feed (Top 3 Performance Drivers) */}
        <RootCauseFeed
          insights={EXECUTIVE_INSIGHTS}
          onOpenAiQuery={handleOpenAiQuery}
        />

        {/* Section 5: Operational Driver Deep-Dive Panels */}
        <OperationalDriverGrid
          metrics={metrics}
          onSelectMetric={(m) => setSelectedMetricForModal(m)}
          onOpenAiQuery={handleOpenAiQuery}
        />
      </main>

      {/* Modal: Metric / Driver Detail Inspector */}
      <DriverDetailModal
        metric={selectedMetricForModal}
        isOpen={!!selectedMetricForModal}
        onClose={() => setSelectedMetricForModal(null)}
        causalLinks={CAUSAL_LINKS}
        onOpenAiQuery={handleOpenAiQuery}
      />

      {/* Modal: Executive Briefing Export */}
      <ExecutiveBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        quarter={selectedQuarter}
      />

      {/* Embedded AI Assistant Chat Panel */}
      <AiExecutiveChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        externalPrompt={chatPromptFromExternal}
        onClearExternalPrompt={() => setChatPromptFromExternal(null)}
      />

      {/* Executive Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-300">SYNAPSE DECISION INTELLIGENCE</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> All Telemetry Pipelines Operational
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>SOC2 Type II Certified</span>
            <span>GCP & AWS FinOps Verified</span>
            <span>Regression Engine p &lt; 0.005</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
