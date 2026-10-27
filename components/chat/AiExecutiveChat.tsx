"use client";

import * as React from "react";
import {
  Bot,
  Send,
  X,
  Sparkles,
  Maximize2,
  Minimize2,
  Database,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { ChatMessage } from "@/types";
import { INITIAL_CHAT_MESSAGES, QA_KNOWLEDGE_BASE } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface AiExecutiveChatProps {
  isOpen: boolean;
  onClose: () => void;
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
}

export function AiExecutiveChat({
  isOpen,
  onClose,
  externalPrompt,
  onClearExternalPrompt,
}: AiExecutiveChatProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle prompt passed from dashboard cards or insights
  React.useEffect(() => {
    if (externalPrompt) {
      handleSendMessage(externalPrompt);
      onClearExternalPrompt?.();
    }
  }, [externalPrompt]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // AI Intelligence Response Matching & Simulation
    setTimeout(() => {
      const lower = query.toLowerCase();

      // Find best matching answer in knowledge base
      let matchedEntry = QA_KNOWLEDGE_BASE.find((entry) =>
        entry.keywords.some((k) => lower.includes(k))
      );

      let responsePayload;

      if (matchedEntry) {
        responsePayload = matchedEntry.generateResponse();
      } else {
        // Fallback intelligent executive synthesis
        responsePayload = {
          content: `### Executive Telemetry Analysis

Based on current enterprise telemetry for **${query}**:

- **Causal Correlation:** Our statistical pipeline detects a **-0.81 cross-functional correlation** between operational execution and financial plan variance.
- **Primary Bottlenecks:**
  1. **Lead Response Time (46.2 mins):** Inbound velocity delay accounts for -$2.21M in pipeline slippage.
  2. **Support Ticket Resolution (19.4 hrs):** Backlog from release v4.2 caused a 1.6% churn increase and -$2.8M in lost recurring revenue.
  3. **Cloud FinOps Drag ($320K):** Infrastructure incident remediation impacted gross margins.

#### Recommended Next Step:
Review the **Scenario Simulator** to calculate the financial return of reducing response times below 15 minutes or stabilizing churn back to 3.2%.`,
          confidenceInterval: "Confidence: 93.8% | Source: Cross-system Regression Engine",
          dataReferences: [
            { title: "NetSuite ERP", source: "General Ledger", metric: "Consolidated ARR", value: "$84.25M" },
            { title: "Salesforce CRM", source: "Opportunity Pipeline", metric: "Win Rate", value: "21.4%" },
            { title: "Zendesk Analytics", source: "Support Operations", metric: "Resolution Time", value: "19.4 hrs" }
          ],
          visualCard: {
            type: "correlation_badge",
            title: "Operational Driver Correlation Matrix",
            data: [
              { metric: "Lead Response Time", r: -0.84, impact: "High Risk" },
              { metric: "Customer Churn", r: -0.91, impact: "Critical" },
              { metric: "Ticket Resolution", r: -0.79, impact: "High Risk" },
              { metric: "Platform Uptime", r: 0.81, impact: "High Positive" }
            ]
          },
          followUps: [
            "Why did EBITDA margin dip in Q3 despite sales growth?",
            "What happens to ARR if we reduce lead response time to under 15 minutes?",
            "Show causal breakdown between support tickets and revenue churn."
          ]
        };
      }

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content: responsePayload.content,
        confidenceInterval: responsePayload.confidenceInterval,
        dataReferences: responsePayload.dataReferences,
        visualCard: responsePayload.visualCard,
        followUps: responsePayload.followUps,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 750);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_CHAT_MESSAGES);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 flex flex-col shadow-2xl ${
        isExpanded
          ? "inset-4 sm:inset-10 rounded-2xl border border-slate-700/80 bg-slate-950/95 backdrop-blur-2xl"
          : "bottom-0 right-0 sm:right-6 sm:bottom-6 w-full sm:w-[480px] h-[90vh] sm:h-[650px] sm:rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur-2xl"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-slate-900/60 sm:rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 shadow-md shadow-cyan-500/20">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>SYNAPSE AI</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800/40">
                EXECUTIVE ASSISTANT
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Grounded in NetSuite, Salesforce, Stripe, Zendesk & Datadog
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-md hover:bg-slate-800 hover:text-white transition-colors hidden sm:inline-flex"
            title={isExpanded ? "Collapse window" : "Expand window"}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
            title="Close Assistant"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}
            >
              {/* Sender label and time */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 px-1">
                <span>{isUser ? "You" : "Synapse AI"}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-md ${
                  isUser
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-tr-xs"
                    : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-xs"
                }`}
              >
                {/* Render markdown text */}
                <div className="space-y-2 whitespace-pre-wrap selection:bg-cyan-500/30">
                  {msg.content.split("\n\n").map((paragraph, pIdx) => {
                    // Check if paragraph is heading
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h4 key={pIdx} className="text-sm font-bold text-cyan-300 pt-1">
                          {paragraph.replace("### ", "")}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith("#### ")) {
                      return (
                        <h5 key={pIdx} className="text-xs font-semibold text-slate-100 pt-0.5">
                          {paragraph.replace("#### ", "")}
                        </h5>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>

                {/* Embedded Micro-Chart / Visual Card */}
                {msg.visualCard && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-2">
                      <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-cyan-400" />
                        {msg.visualCard.title}
                      </span>

                      {/* Driver Breakdown Bar Chart */}
                      {msg.visualCard.type === "driver_breakdown" && (
                        <div className="space-y-1.5 pt-1">
                          {msg.visualCard.data.map((item: any, iIdx: number) => {
                            const isPositive = item.amount >= 0;
                            return (
                              <div key={iIdx} className="flex items-center justify-between text-[11px]">
                                <span className="text-slate-300 truncate max-w-[180px]">
                                  {item.name}
                                </span>
                                <span
                                  className={`font-mono font-semibold ${
                                    isPositive ? "text-emerald-400" : "text-rose-400"
                                  }`}
                                >
                                  {isPositive ? "+" : ""}
                                  {formatCurrency(item.amount)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Correlation Badge Matrix */}
                      {msg.visualCard.type === "correlation_badge" && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {msg.visualCard.data.map((item: any, cIdx: number) => (
                            <div
                              key={cIdx}
                              className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px]"
                            >
                              <span className="text-slate-300 block truncate">{item.metric}</span>
                              <div className="flex items-center justify-between mt-1">
                                <span className="font-mono font-bold text-cyan-300">
                                  r = {item.r}
                                </span>
                                <span
                                  className={`px-1 rounded text-[9px] ${
                                    item.impact.includes("Risk") || item.impact.includes("Critical")
                                      ? "text-rose-400 bg-rose-950"
                                      : "text-emerald-400 bg-emerald-950"
                                  }`}
                                >
                                  {item.impact}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Scenario Preview Card */}
                      {msg.visualCard.type === "scenario_preview" && (
                        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="p-2 bg-slate-900 rounded border border-slate-800">
                            <span className="text-[10px] text-slate-400 block">Projected ARR</span>
                            <span className="font-mono font-bold text-white text-sm">
                              {msg.visualCard.data.projectedARR}
                            </span>
                            <span className="text-emerald-400 font-mono text-[10px] block">
                              {msg.visualCard.data.deltaARR}
                            </span>
                          </div>
                          <div className="p-2 bg-slate-900 rounded border border-slate-800">
                            <span className="text-[10px] text-slate-400 block">Projected EBITDA</span>
                            <span className="font-mono font-bold text-white text-sm">
                              {msg.visualCard.data.projectedEBITDA}
                            </span>
                            <span className="text-emerald-400 font-mono text-[10px] block">
                              {msg.visualCard.data.deltaEBITDA}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Step by step causal table */}
                      {msg.visualCard.type === "kpi_matrix" && (
                        <div className="space-y-1 pt-1 text-[11px]">
                          {msg.visualCard.data.map((step: any, sIdx: number) => (
                            <div key={sIdx} className="flex justify-between items-center py-0.5">
                              <span className="text-slate-300">{step.step}</span>
                              <span className="font-mono font-bold text-rose-300">{step.metric}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Confidence Interval Pill */}
                {msg.confidenceInterval && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-cyan-400/90 font-mono">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{msg.confidenceInterval}</span>
                  </div>
                )}

                {/* Explicit Data Source Citations */}
                {msg.dataReferences && msg.dataReferences.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 text-[10px] space-y-1">
                    <span className="text-slate-400 uppercase font-mono flex items-center gap-1">
                      <Database className="h-3 w-3 text-slate-400" /> Evidence Citations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.dataReferences.map((ref, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300 font-mono"
                          title={`${ref.title}: ${ref.source} (${ref.value})`}
                        >
                          [{ref.title}: <span className="text-cyan-300">{ref.metric}</span>]
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contextual Follow-up Chips (only on last assistant message) */}
              {!isUser && msg.followUps && msg.followUps.length > 0 && (
                <div className="flex flex-col gap-1.5 pt-1 w-full max-w-[92%] sm:max-w-[85%]">
                  <span className="text-[10px] text-slate-400 uppercase font-mono px-1">
                    Suggested Executive Follow-ups:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.followUps.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleSendMessage(chip)}
                        className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1"
                      >
                        <Sparkles className="h-2.5 w-2.5 text-cyan-400 shrink-0" />
                        <span>{chip}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 p-2 text-xs">
            <Bot className="h-4 w-4 animate-spin text-cyan-400" />
            <span className="animate-pulse">Synthesizing causal telemetry & running regressions...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 sm:rounded-b-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask plain-English questions (e.g. Why did EBITDA dip in Q3?)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="rounded-xl px-3 h-8.5 gap-1"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Ask</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
