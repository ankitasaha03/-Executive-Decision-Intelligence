export type MetricCategory = 'financial' | 'sales' | 'support' | 'product' | 'operations';

export interface MetricDataPoint {
  date: string;
  value: number;
  baseline?: number;
  target?: number;
}

export interface Metric {
  id: string;
  name: string;
  code: string;
  category: MetricCategory;
  currentValue: number;
  unit: '$' | '%' | 'hrs' | 'mins' | 'ratio' | 'pts' | 'days';
  previousValue: number;
  targetValue: number;
  changePct: number;
  isPositiveDeltaGood: boolean;
  historicalSeries: MetricDataPoint[];
  anomaly: boolean;
  anomalyDetails?: {
    severity: 'critical' | 'moderate' | 'low';
    description: string;
    detectedAt: string;
  };
  dataSource: string;
  department: string;
  description: string;
}

export interface CausalLink {
  id: string;
  sourceMetricId: string;
  sourceName: string;
  targetMetricId: string;
  targetName: string;
  correlation: number; // -1 to 1
  impactMultiplier: number; // Dollar or margin leverage per unit shift
  unitLabel: string;
  confidence: number; // 0-100%
  timeLag: string; // e.g. "14-day lag", "Real-time"
  pValue: number;
  mechanism: string;
  evidenceSnippet: string;
  isPositiveImpact: boolean; // whether an increase in source has positive effect on financial outcome
}

export interface DriverImpact {
  metricId: string;
  name: string;
  category: MetricCategory;
  correlation: number;
  impactDollars: number;
  impactPercent: number;
  direction: 'positive' | 'negative';
  elasticityLabel: string;
  keyFinding: string;
  confidence: number;
  dataSource: string;
}

export interface ScenarioInputs {
  churnDeltaPct: number; // e.g. -1.5%
  leadResponseDeltaPct: number; // e.g. -20%
  ticketResolutionDeltaPct: number; // e.g. -25%
  cacEfficiencyDeltaPct: number; // e.g. +10%
  serverUptimeTarget: number; // e.g. 99.95%
}

export interface ScenarioOutcome {
  baselineARR: number;
  projectedARR: number;
  arrDelta: number;
  arrDeltaPct: number;

  baselineEBITDA: number;
  projectedEBITDA: number;
  ebitdaDelta: number;
  ebitdaMarginBaseline: number;
  ebitdaMarginProjected: number;

  baselineGrossProfit: number;
  projectedGrossProfit: number;
  grossProfitDelta: number;

  baselineNRR: number;
  projectedNRR: number;
  nrrDelta: number;

  waterfallSteps: {
    name: string;
    amount: number;
    isTotal?: boolean;
    category?: string;
  }[];
}

export interface ExecutiveInsight {
  id: string;
  title: string;
  category: 'risk' | 'opportunity' | 'anomaly';
  severity: 'critical' | 'warning' | 'positive';
  summary: string;
  detailedAnalysis: string;
  financialImpact: string;
  confidenceScore: number;
  dataSources: string[];
  recommendedAction: string;
  relevantMetricIds: string[];
  quarter: string;
  publishedDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  confidenceInterval?: string;
  dataReferences?: {
    title: string;
    source: string;
    metric: string;
    value: string;
  }[];
  visualCard?: {
    type: 'metric_compare' | 'driver_breakdown' | 'scenario_preview' | 'correlation_badge' | 'kpi_matrix';
    title: string;
    data: any;
  };
  followUps?: string[];
  isStreaming?: boolean;
}
