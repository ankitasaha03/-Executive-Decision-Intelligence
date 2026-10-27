"use client";

import * as React from "react";
import {
  Sliders,
  RotateCcw,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  BookmarkCheck,
  Zap,
} from "lucide-react";
import { ScenarioInputs, ScenarioOutcome } from "@/types";
import { calculateScenario } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface ScenarioSimulatorProps {
  onOpenAiQuery: (prompt: string) => void;
}

const DEFAULT_INPUTS: ScenarioInputs = {
  churnDeltaPct: 0,
  leadResponseDeltaPct: 0,
  ticketResolutionDeltaPct: 0,
  cacEfficiencyDeltaPct: 0,
  serverUptimeTarget: 99.88,
};

export function ScenarioSimulator({ onOpenAiQuery }: ScenarioSimulatorProps) {
  const [inputs, setInputs] = React.useState<ScenarioInputs>(DEFAULT_INPUTS);
  const [outcome, setOutcome] = React.useState<ScenarioOutcome>(() => calculateScenario(DEFAULT_INPUTS));

  // Recalculate whenever inputs change
  React.useEffect(() => {
    setOutcome(calculateScenario(inputs));
  }, [inputs]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
  };

  const applyPreset = (presetInputs: Partial<ScenarioInputs>) => {
    setInputs((prev) => ({ ...prev, ...presetInputs }));
  };

  const isModified =
    inputs.churnDeltaPct !== 0 ||
    inputs.leadResponseDeltaPct !== 0 ||
    inputs.ticketResolutionDeltaPct !== 0 ||
    inputs.cacEfficiencyDeltaPct !== 0 ||
    inputs.serverUptimeTarget !== 99.88;

  return (
    <Card className="border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden">
      <CardHeader className="p-4 sm:p-5 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sliders className="h-4 w-4" />
              </span>
              <CardTitle className="text-base text-white">
                Executive Scenario Simulator & What-If Engine
              </CardTitle>
              {isModified && (
                <Badge variant="warning" className="text-[10px]">
                  Simulated State
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Adjust operational inputs to simulate mathematical ripple effects through ARR, EBITDA, and Gross Margin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isModified && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset to Actuals</span>
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                const prompt = `Perform an executive evaluation of our current simulated scenario:
- Churn delta: ${inputs.churnDeltaPct}%
- Lead response time delta: ${inputs.leadResponseDeltaPct}%
- Ticket resolution time delta: ${inputs.ticketResolutionDeltaPct}%
- CAC marketing efficiency: +${inputs.cacEfficiencyDeltaPct}%
- Uptime SLA target: ${inputs.serverUptimeTarget}%

Projected financial outcomes:
- ARR moves from $84.25M to ${formatCurrency(outcome.projectedARR)} (${formatCurrency(outcome.arrDelta, true)})
- EBITDA moves from $18.62M to ${formatCurrency(outcome.projectedEBITDA)} (${formatPercent(outcome.ebitdaMarginProjected - outcome.ebitdaMarginBaseline, true)} margin shift)
- Projected NRR: ${outcome.projectedNRR.toFixed(1)}%

What operational bottlenecks must be addressed to achieve these outcomes in the next 2 quarters?`;
                onOpenAiQuery(prompt);
              }}
              className="text-xs gap-1.5 shadow-cyan-500/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Analyze with AI</span>
            </Button>
          </div>
        </div>

        {/* Quick Scenario Preset Chips */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto text-xs">
          <span className="text-[11px] text-slate-400 font-medium shrink-0">Executive Presets:</span>
          <button
            onClick={() =>
              applyPreset({
                churnDeltaPct: -1.5,
                leadResponseDeltaPct: -20,
                ticketResolutionDeltaPct: -25,
                cacEfficiencyDeltaPct: 10,
                serverUptimeTarget: 99.95,
              })
            }
            className="px-2.5 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs shrink-0 font-medium flex items-center gap-1 transition-colors"
          >
            <Zap className="h-3 w-3 text-indigo-400" />
            <span>Target Plan (-1.5% Churn, -20% LRT)</span>
          </button>
          <button
            onClick={() =>
              applyPreset({
                churnDeltaPct: -2.0,
                leadResponseDeltaPct: -40,
                ticketResolutionDeltaPct: -45,
                cacEfficiencyDeltaPct: 20,
                serverUptimeTarget: 99.98,
              })
            }
            className="px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs shrink-0 font-medium flex items-center gap-1 transition-colors"
          >
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <span>Aggressive Expansion (+20% CAC eff, -40% LRT)</span>
          </button>
          <button
            onClick={() =>
              applyPreset({
                churnDeltaPct: -2.2,
                leadResponseDeltaPct: 0,
                ticketResolutionDeltaPct: -40,
                cacEfficiencyDeltaPct: 0,
                serverUptimeTarget: 99.99,
              })
            }
            className="px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs shrink-0 font-medium flex items-center gap-1 transition-colors"
          >
            <BookmarkCheck className="h-3 w-3 text-cyan-400" />
            <span>Retention First (-2.2% Churn, 99.99% Uptime)</span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Operational Sliders (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                Operational Input Levers
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Live Inputs</span>
            </div>

            {/* Slider 1: Customer Churn */}
            <Slider
              label="Customer Churn Delta"
              description="Logo contract cancellation rate"
              min={-3.0}
              max={3.0}
              step={0.1}
              value={inputs.churnDeltaPct}
              onChange={(val) => setInputs((prev) => ({ ...prev, churnDeltaPct: val }))}
              formatValue={(val) => `${val > 0 ? "+" : ""}${val.toFixed(1)}%`}
            />

            {/* Slider 2: Lead Response Time */}
            <Slider
              label="Lead Response Time Delta"
              description="Speed of qualification engagement (Current: 46m)"
              min={-50}
              max={50}
              step={5}
              value={inputs.leadResponseDeltaPct}
              onChange={(val) => setInputs((prev) => ({ ...prev, leadResponseDeltaPct: val }))}
              formatValue={(val) => `${val > 0 ? "+" : ""}${val}%`}
            />

            {/* Slider 3: Support Ticket Resolution Time */}
            <Slider
              label="Support Resolution Time Delta"
              description="Mean time to resolve P1/P2 tickets (Current: 19.4h)"
              min={-50}
              max={50}
              step={5}
              value={inputs.ticketResolutionDeltaPct}
              onChange={(val) => setInputs((prev) => ({ ...prev, ticketResolutionDeltaPct: val }))}
              formatValue={(val) => `${val > 0 ? "+" : ""}${val}%`}
            />

            {/* Slider 4: CAC Efficiency */}
            <Slider
              label="CAC Marketing Efficiency Delta"
              description="Sales & marketing acquisition productivity"
              min={-20}
              max={30}
              step={5}
              value={inputs.cacEfficiencyDeltaPct}
              onChange={(val) => setInputs((prev) => ({ ...prev, cacEfficiencyDeltaPct: val }))}
              formatValue={(val) => `${val > 0 ? "+" : ""}${val}%`}
            />

            {/* Slider 5: Server Uptime Target */}
            <Slider
              label="Platform Core Uptime Target"
              description="Production infrastructure availability (Baseline: 99.88%)"
              min={99.50}
              max={99.99}
              step={0.01}
              value={inputs.serverUptimeTarget}
              onChange={(val) => setInputs((prev) => ({ ...prev, serverUptimeTarget: val }))}
              formatValue={(val) => `${val.toFixed(2)}%`}
            />
          </div>

          {/* Right Column: Visual Projection of Financial Outcomes (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                Simulated Financial Projection
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                PROJECTION MODEL RUNTIME
              </span>
            </div>

            {/* 4 Financial Outcome Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* ARR Outcome */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 relative overflow-hidden">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Projected ARR
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-bold font-mono text-white">
                    {formatCurrency(outcome.projectedARR, true)}
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                      outcome.arrDelta >= 0
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {outcome.arrDelta >= 0 ? "+" : ""}
                    {formatCurrency(outcome.arrDelta, true)} ({formatPercent(outcome.arrDeltaPct, true)})
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex justify-between">
                  <span>Baseline: $84.25M</span>
                  <span>Target: $88.00M</span>
                </div>
              </div>

              {/* EBITDA Outcome */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 relative overflow-hidden">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Projected EBITDA
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-bold font-mono text-white">
                    {formatCurrency(outcome.projectedEBITDA, true)}
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                      outcome.ebitdaDelta >= 0
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {outcome.ebitdaDelta >= 0 ? "+" : ""}
                    {formatCurrency(outcome.ebitdaDelta, true)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex justify-between">
                  <span>Margin: {outcome.ebitdaMarginProjected.toFixed(1)}%</span>
                  <span className="text-cyan-400">
                    {formatPercent(outcome.ebitdaMarginProjected - outcome.ebitdaMarginBaseline, true)} pts
                  </span>
                </div>
              </div>

              {/* Gross Profit Margin */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 relative overflow-hidden">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Projected Gross Profit
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xl font-bold font-mono text-white">
                    {formatCurrency(outcome.projectedGrossProfit, true)}
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                      outcome.grossProfitDelta >= 0
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {outcome.grossProfitDelta >= 0 ? "+" : ""}
                    {formatCurrency(outcome.grossProfitDelta, true)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex justify-between">
                  <span>Gross Margin: 73.5%</span>
                  <span>COGS leverage</span>
                </div>
              </div>

              {/* Net Retention Rate */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 relative overflow-hidden">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Projected Net Retention (NRR)
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xl font-bold font-mono text-white">
                    {outcome.projectedNRR.toFixed(1)}%
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                      outcome.nrrDelta >= 0
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {outcome.nrrDelta >= 0 ? "+" : ""}
                    {outcome.nrrDelta.toFixed(1)} pts
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex justify-between">
                  <span>Current: 111.4%</span>
                  <span>Target: 116.0%</span>
                </div>
              </div>
            </div>

            {/* Waterfall Bridge Chart from Baseline to Projected ARR */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  ARR Impact Attribution Waterfall
                </span>
                <span className="text-[11px] text-slate-400">
                  Operational Step Contributions
                </span>
              </div>

              <div className="space-y-2">
                {outcome.waterfallSteps.map((step, idx) => {
                  const isPositive = step.amount >= 0;
                  const isTotal = step.isTotal;

                  return (
                    <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                      <div className="flex items-center gap-2 w-44">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isTotal
                              ? "bg-cyan-400"
                              : isPositive
                              ? "bg-emerald-400"
                              : "bg-rose-400"
                          }`}
                        />
                        <span className={isTotal ? "font-semibold text-white" : "text-slate-300"}>
                          {step.name}
                        </span>
                      </div>

                      <div className="flex-1 mx-3 hidden sm:block">
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isTotal
                                ? "bg-cyan-500"
                                : isPositive
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                            }`}
                            style={{
                              width: `${Math.min(100, (Math.abs(step.amount) / 90000000) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                      <span
                        className={`font-mono text-xs font-semibold ${
                          isTotal
                            ? "text-white"
                            : isPositive
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {isTotal
                          ? formatCurrency(step.amount, true)
                          : `${isPositive ? "+" : ""}${formatCurrency(step.amount, true)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
