import { Metric, CausalLink, DriverImpact, ExecutiveInsight, ScenarioInputs, ScenarioOutcome } from '@/types';

export const INITIAL_METRICS: Metric[] = [
  // Financial Outcomes
  {
    id: 'arr',
    code: 'ARR',
    name: 'Annual Recurring Revenue',
    category: 'financial',
    currentValue: 84250000,
    previousValue: 73780000,
    targetValue: 88000000,
    unit: '$',
    changePct: 14.19,
    isPositiveDeltaGood: true,
    anomaly: true,
    anomalyDetails: {
      severity: 'critical',
      description: 'Q3 net new ARR pace is $3.75M behind target; predominantly driven by Mid-Market churn spike and lead response latency.',
      detectedAt: 'Yesterday at 09:14 AM'
    },
    dataSource: 'Stripe Billing & NetSuite General Ledger',
    department: 'Finance & Executive',
    description: 'Annualized normalized value of predictable recurring subscription revenue streams.',
    historicalSeries: [
      { date: 'Nov 23', value: 71200000, baseline: 70000000 },
      { date: 'Dec 23', value: 72400000, baseline: 71500000 },
      { date: 'Jan 24', value: 73800000, baseline: 73000000 },
      { date: 'Feb 24', value: 75100000, baseline: 74500000 },
      { date: 'Mar 24', value: 76900000, baseline: 76000000 },
      { date: 'Apr 24', value: 78200000, baseline: 78000000 },
      { date: 'May 24', value: 79800000, baseline: 80000000 },
      { date: 'Jun 24', value: 81200000, baseline: 82000000 },
      { date: 'Jul 24', value: 82100000, baseline: 84000000 },
      { date: 'Aug 24', value: 83200000, baseline: 86000000 },
      { date: 'Sep 24', value: 83900000, baseline: 87200000 },
      { date: 'Oct 24', value: 84250000, baseline: 88000000 },
    ]
  },
  {
    id: 'ebitda',
    code: 'EBITDA',
    name: 'Operating EBITDA',
    category: 'financial',
    currentValue: 18620000,
    previousValue: 17800000,
    targetValue: 21560000,
    unit: '$',
    changePct: 4.61,
    isPositiveDeltaGood: true,
    anomaly: true,
    anomalyDetails: {
      severity: 'moderate',
      description: 'EBITDA margin contracted to 22.1% (target: 24.5%) due to customer support overtime and cloud incident remediation costs.',
      detectedAt: '2 days ago'
    },
    dataSource: 'Workday Adaptive Planning / NetSuite',
    department: 'Finance',
    description: 'Earnings before interest, taxes, depreciation, and amortization.',
    historicalSeries: [
      { date: 'Nov 23', value: 15400000, baseline: 15000000 },
      { date: 'Dec 23', value: 15900000, baseline: 15500000 },
      { date: 'Jan 24', value: 16200000, baseline: 16000000 },
      { date: 'Feb 24', value: 16800000, baseline: 16500000 },
      { date: 'Mar 24', value: 17300000, baseline: 17200000 },
      { date: 'Apr 24', value: 17700000, baseline: 17900000 },
      { date: 'May 24', value: 18100000, baseline: 18700000 },
      { date: 'Jun 24', value: 18400000, baseline: 19400000 },
      { date: 'Jul 24', value: 18350000, baseline: 20100000 },
      { date: 'Aug 24', value: 18450000, baseline: 20800000 },
      { date: 'Sep 24', value: 18550000, baseline: 21200000 },
      { date: 'Oct 24', value: 18620000, baseline: 21560000 },
    ]
  },
  {
    id: 'gross_margin',
    code: 'GM',
    name: 'Gross Profit Margin',
    category: 'financial',
    currentValue: 72.8,
    previousValue: 75.1,
    targetValue: 74.5,
    unit: '%',
    changePct: -3.06,
    isPositiveDeltaGood: true,
    anomaly: false,
    dataSource: 'Cost Accounting / AWS CloudHealth',
    department: 'Finance & Infrastructure',
    description: 'Total revenue minus direct cost of goods sold (COGS) and server infrastructure costs.',
    historicalSeries: [
      { date: 'Nov 23', value: 75.2 },
      { date: 'Dec 23', value: 75.4 },
      { date: 'Jan 24', value: 75.1 },
      { date: 'Feb 24', value: 74.8 },
      { date: 'Mar 24', value: 74.9 },
      { date: 'Apr 24', value: 74.6 },
      { date: 'May 24', value: 74.2 },
      { date: 'Jun 24', value: 73.8 },
      { date: 'Jul 24', value: 73.1 },
      { date: 'Aug 24', value: 72.9 },
      { date: 'Sep 24', value: 72.7 },
      { date: 'Oct 24', value: 72.8 },
    ]
  },
  {
    id: 'nrr',
    code: 'NRR',
    name: 'Net Retention Rate',
    category: 'financial',
    currentValue: 111.4,
    previousValue: 114.2,
    targetValue: 116.0,
    unit: '%',
    changePct: -2.45,
    isPositiveDeltaGood: true,
    anomaly: true,
    anomalyDetails: {
      severity: 'critical',
      description: 'NRR dropped below 112% threshold for first time in 6 quarters; expansion revenue failed to offset churn in tier-2 accounts.',
      detectedAt: '3 days ago'
    },
    dataSource: 'Gainsight & Salesforce CRM',
    department: 'Customer Success',
    description: 'Percentage of recurring revenue retained from existing customers including expansions, contractions, and churn.',
    historicalSeries: [
      { date: 'Nov 23', value: 115.8 },
      { date: 'Dec 23', value: 115.6 },
      { date: 'Jan 24', value: 115.2 },
      { date: 'Feb 24', value: 114.9 },
      { date: 'Mar 24', value: 115.0 },
      { date: 'Apr 24', value: 114.6 },
      { date: 'May 24', value: 114.0 },
      { date: 'Jun 24', value: 113.4 },
      { date: 'Jul 24', value: 112.8 },
      { date: 'Aug 24', value: 112.2 },
      { date: 'Sep 24', value: 111.8 },
      { date: 'Oct 24', value: 111.4 },
    ]
  },

  // Operational Drivers - Sales & Marketing
  {
    id: 'lrt',
    code: 'LRT',
    name: 'Lead Response Time',
    category: 'sales',
    currentValue: 46.2,
    previousValue: 28.5,
    targetValue: 15.0,
    unit: 'mins',
    changePct: 62.11,
    isPositiveDeltaGood: false,
    anomaly: true,
    anomalyDetails: {
      severity: 'critical',
      description: 'SDR qualification queue experienced routing misconfigurations causing initial response times to triple on inbound enterprise demo requests.',
      detectedAt: '4 days ago'
    },
    dataSource: 'HubSpot / Chili Piper / Salesforce',
    department: 'Sales Ops',
    description: 'Elapsed minutes between inbound marketing form submission and first human/automated high-touch SDR engagement.',
    historicalSeries: [
      { date: 'Nov 23', value: 18.2 },
      { date: 'Dec 23', value: 17.5 },
      { date: 'Jan 24', value: 19.1 },
      { date: 'Feb 24', value: 20.4 },
      { date: 'Mar 24', value: 22.0 },
      { date: 'Apr 24', value: 23.8 },
      { date: 'May 24', value: 26.1 },
      { date: 'Jun 24', value: 28.5 },
      { date: 'Jul 24', value: 33.2 },
      { date: 'Aug 24', value: 38.9 },
      { date: 'Sep 24', value: 43.1 },
      { date: 'Oct 24', value: 46.2 },
    ]
  },
  {
    id: 'cac',
    code: 'CAC',
    name: 'Customer Acquisition Cost',
    category: 'sales',
    currentValue: 9420,
    previousValue: 8800,
    targetValue: 8200,
    unit: '$',
    changePct: 7.05,
    isPositiveDeltaGood: false,
    anomaly: false,
    dataSource: 'Salesforce & Google/LinkedIn Ads API',
    department: 'Marketing & Sales',
    description: 'Fully loaded sales & marketing spend required to acquire one net new paying account.',
    historicalSeries: [
      { date: 'Nov 23', value: 8100 },
      { date: 'Dec 23', value: 8250 },
      { date: 'Jan 24', value: 8300 },
      { date: 'Feb 24', value: 8420 },
      { date: 'Mar 24', value: 8550 },
      { date: 'Apr 24', value: 8680 },
      { date: 'May 24', value: 8800 },
      { date: 'Jun 24', value: 8950 },
      { date: 'Jul 24', value: 9120 },
      { date: 'Aug 24', value: 9240 },
      { date: 'Sep 24', value: 9350 },
      { date: 'Oct 24', value: 9420 },
    ]
  },
  {
    id: 'win_rate',
    code: 'WIN',
    name: 'Demo-to-Close Win Rate',
    category: 'sales',
    currentValue: 21.4,
    previousValue: 24.8,
    targetValue: 26.0,
    unit: '%',
    changePct: -13.71,
    isPositiveDeltaGood: true,
    anomaly: false,
    dataSource: 'Salesforce Opportunity Stages',
    department: 'Sales',
    description: 'Percentage of qualified sales demonstrations that successfully convert into closed-won contracts.',
    historicalSeries: [
      { date: 'Nov 23', value: 26.4 },
      { date: 'Dec 23', value: 26.1 },
      { date: 'Jan 24', value: 25.8 },
      { date: 'Feb 24', value: 25.4 },
      { date: 'Mar 24', value: 25.0 },
      { date: 'Apr 24', value: 24.8 },
      { date: 'May 24', value: 24.1 },
      { date: 'Jun 24', value: 23.5 },
      { date: 'Jul 24', value: 22.8 },
      { date: 'Aug 24', value: 22.2 },
      { date: 'Sep 24', value: 21.8 },
      { date: 'Oct 24', value: 21.4 },
    ]
  },

  // Operational Drivers - Customer Support & Experience
  {
    id: 'churn',
    code: 'CHURN',
    name: 'Customer Logo Churn Rate',
    category: 'support',
    currentValue: 4.8,
    previousValue: 3.6,
    targetValue: 3.2,
    unit: '%',
    changePct: 33.33,
    isPositiveDeltaGood: false,
    anomaly: true,
    anomalyDetails: {
      severity: 'critical',
      description: 'Mid-market cohort churn surged by +1.6% due to prolonged support resolution times and unresolved product bugs.',
      detectedAt: '5 days ago'
    },
    dataSource: 'ProfitWell / Stripe Subscriptions',
    department: 'Customer Success',
    description: 'Annualized logo cancellation rate across active customer contracts.',
    historicalSeries: [
      { date: 'Nov 23', value: 3.1 },
      { date: 'Dec 23', value: 3.2 },
      { date: 'Jan 24', value: 3.3 },
      { date: 'Feb 24', value: 3.4 },
      { date: 'Mar 24', value: 3.5 },
      { date: 'Apr 24', value: 3.6 },
      { date: 'May 24', value: 3.8 },
      { date: 'Jun 24', value: 4.0 },
      { date: 'Jul 24', value: 4.3 },
      { date: 'Aug 24', value: 4.5 },
      { date: 'Sep 24', value: 4.7 },
      { date: 'Oct 24', value: 4.8 },
    ]
  },
  {
    id: 'strt',
    code: 'STRT',
    name: 'Support Ticket Resolution Time',
    category: 'support',
    currentValue: 19.4,
    previousValue: 11.2,
    targetValue: 8.0,
    unit: 'hrs',
    changePct: 73.21,
    isPositiveDeltaGood: false,
    anomaly: true,
    anomalyDetails: {
      severity: 'critical',
      description: 'Tier-2 technical support backlog increased 2.4x following v4.2 release, causing mean resolution time to jump from 11.2h to 19.4h.',
      detectedAt: '6 days ago'
    },
    dataSource: 'Zendesk Enterprise Analytics & Jira Service Mgmt',
    department: 'Support & Engineering',
    description: 'Mean elapsed hours from ticket creation to final resolution for high and normal severity support cases.',
    historicalSeries: [
      { date: 'Nov 23', value: 9.1 },
      { date: 'Dec 23', value: 8.8 },
      { date: 'Jan 24', value: 9.4 },
      { date: 'Feb 24', value: 9.9 },
      { date: 'Mar 24', value: 10.3 },
      { date: 'Apr 24', value: 11.2 },
      { date: 'May 24', value: 12.8 },
      { date: 'Jun 24', value: 14.5 },
      { date: 'Jul 24', value: 16.2 },
      { date: 'Aug 24', value: 17.8 },
      { date: 'Sep 24', value: 18.9 },
      { date: 'Oct 24', value: 19.4 },
    ]
  },
  {
    id: 'csat',
    code: 'CSAT',
    name: 'Customer Satisfaction Score',
    category: 'support',
    currentValue: 81.2,
    previousValue: 88.4,
    targetValue: 90.0,
    unit: '%',
    changePct: -8.14,
    isPositiveDeltaGood: true,
    anomaly: false,
    dataSource: 'Delighted / Zendesk CSAT Surveys',
    department: 'Customer Experience',
    description: 'Percentage of customer survey ratings marked positive (4 or 5 stars out of 5) post ticket resolution.',
    historicalSeries: [
      { date: 'Nov 23', value: 89.4 },
      { date: 'Dec 23', value: 89.1 },
      { date: 'Jan 24', value: 88.8 },
      { date: 'Feb 24', value: 88.5 },
      { date: 'Mar 24', value: 88.4 },
      { date: 'Apr 24', value: 87.2 },
      { date: 'May 24', value: 86.0 },
      { date: 'Jun 24', value: 84.8 },
      { date: 'Jul 24', value: 83.5 },
      { date: 'Aug 24', value: 82.6 },
      { date: 'Sep 24', value: 81.8 },
      { date: 'Oct 24', value: 81.2 },
    ]
  },

  // Operational Drivers - Product & Platform
  {
    id: 'uptime',
    code: 'UPTIME',
    name: 'Platform Core Uptime',
    category: 'product',
    currentValue: 99.88,
    previousValue: 99.98,
    targetValue: 99.95,
    unit: '%',
    changePct: -0.10,
    isPositiveDeltaGood: true,
    anomaly: true,
    anomalyDetails: {
      severity: 'moderate',
      description: 'Incident #INC-8921 caused 52 minutes of intermittent degraded API performance on the US-East cluster.',
      detectedAt: 'Last week'
    },
    dataSource: 'Datadog & PagerDuty Synthetics',
    department: 'DevOps / SRE',
    description: 'Monthly availability of core production APIs and transactional endpoints against SLA criteria.',
    historicalSeries: [
      { date: 'Nov 23', value: 99.98 },
      { date: 'Dec 23', value: 99.99 },
      { date: 'Jan 24', value: 99.97 },
      { date: 'Feb 24', value: 99.96 },
      { date: 'Mar 24', value: 99.98 },
      { date: 'Apr 24', value: 99.98 },
      { date: 'May 24', value: 99.95 },
      { date: 'Jun 24', value: 99.92 },
      { date: 'Jul 24', value: 99.89 },
      { date: 'Aug 24', value: 99.91 },
      { date: 'Sep 24', value: 99.86 },
      { date: 'Oct 24', value: 99.88 },
    ]
  },
  {
    id: 'latency',
    code: 'LATENCY',
    name: 'P99 Platform Latency',
    category: 'product',
    currentValue: 312,
    previousValue: 210,
    targetValue: 180,
    unit: 'mins', // note: ms
    changePct: 48.57,
    isPositiveDeltaGood: false,
    anomaly: false,
    dataSource: 'AWS CloudWatch / Datadog APM',
    department: 'Core Infrastructure',
    description: '99th percentile response duration for synchronous transactional API queries in milliseconds.',
    historicalSeries: [
      { date: 'Nov 23', value: 195 },
      { date: 'Dec 23', value: 198 },
      { date: 'Jan 24', value: 202 },
      { date: 'Feb 24', value: 208 },
      { date: 'Mar 24', value: 210 },
      { date: 'Apr 24', value: 225 },
      { date: 'May 24', value: 242 },
      { date: 'Jun 24', value: 268 },
      { date: 'Jul 24', value: 285 },
      { date: 'Aug 24', value: 298 },
      { date: 'Sep 24', value: 308 },
      { date: 'Oct 24', value: 312 },
    ]
  },

  // Operational Drivers - Operations & Supply Chain
  {
    id: 'inventory_turnover',
    code: 'INVT',
    name: 'Inventory Turnover Ratio',
    category: 'operations',
    currentValue: 6.4,
    previousValue: 7.1,
    targetValue: 8.2,
    unit: 'ratio',
    changePct: -9.86,
    isPositiveDeltaGood: true,
    anomaly: false,
    dataSource: 'SAP S/4HANA Supply Chain',
    department: 'Logistics & Supply Chain',
    description: 'Number of times inventory is sold or consumed and replaced over a 12-month period.',
    historicalSeries: [
      { date: 'Nov 23', value: 7.3 },
      { date: 'Dec 23', value: 7.2 },
      { date: 'Jan 24', value: 7.1 },
      { date: 'Feb 24', value: 7.0 },
      { date: 'Mar 24', value: 7.1 },
      { date: 'Apr 24', value: 6.9 },
      { date: 'May 24', value: 6.8 },
      { date: 'Jun 24', value: 6.7 },
      { date: 'Jul 24', value: 6.6 },
      { date: 'Aug 24', value: 6.5 },
      { date: 'Sep 24', value: 6.4 },
      { date: 'Oct 24', value: 6.4 },
    ]
  },
  {
    id: 'fulfillment_lag',
    code: 'LAG',
    name: 'Customer Provisioning / Delivery Lag',
    category: 'operations',
    currentValue: 4.2,
    previousValue: 2.5,
    targetValue: 2.0,
    unit: 'days',
    changePct: 68.0,
    isPositiveDeltaGood: false,
    anomaly: false,
    dataSource: 'Internal Provisioning Pipeline & JIRA',
    department: 'Operations',
    description: 'Average days elapsed from closed contract to active operational tenant provisioning.',
    historicalSeries: [
      { date: 'Nov 23', value: 2.1 },
      { date: 'Dec 23', value: 2.2 },
      { date: 'Jan 24', value: 2.3 },
      { date: 'Feb 24', value: 2.4 },
      { date: 'Mar 24', value: 2.5 },
      { date: 'Apr 24', value: 2.8 },
      { date: 'May 24', value: 3.1 },
      { date: 'Jun 24', value: 3.4 },
      { date: 'Jul 24', value: 3.7 },
      { date: 'Aug 24', value: 3.9 },
      { date: 'Sep 24', value: 4.1 },
      { date: 'Oct 24', value: 4.2 },
    ]
  }
];

export const CAUSAL_LINKS: CausalLink[] = [
  {
    id: 'link-lrt-arr',
    sourceMetricId: 'lrt',
    sourceName: 'Lead Response Time',
    targetMetricId: 'arr',
    targetName: 'Annual Recurring Revenue',
    correlation: -0.84,
    impactMultiplier: -125000, // Every 1 min increase in response time costs ~$125k ARR annually
    unitLabel: '-$125K ARR per min delay',
    confidence: 94.2,
    timeLag: '14-Day Lag',
    pValue: 0.0004,
    mechanism: 'Inbound demo prospects contacted >30m have a 48% lower demonstration show-up rate and a 3.1x longer sales cycle, directly eroding new logo bookings.',
    evidenceSnippet: 'Regression analysis on 4,820 inbound MQLs across Q1-Q3 2024 shows conversion drops steeply after 15 minutes of delay.',
    isPositiveImpact: false
  },
  {
    id: 'link-churn-arr',
    sourceMetricId: 'churn',
    sourceName: 'Customer Logo Churn',
    targetMetricId: 'arr',
    targetName: 'Annual Recurring Revenue',
    correlation: -0.91,
    impactMultiplier: -1750000, // Every 1% increase in churn costs ~$1.75M ARR
    unitLabel: '-$1.75M ARR per +1% churn',
    confidence: 98.6,
    timeLag: 'Immediate (Monthly Bill Cycle)',
    pValue: 0.0001,
    mechanism: 'Compounding loss of recurring baseline revenue plus loss of expansion seats from existing customer base.',
    evidenceSnippet: 'Direct subscription contract cancellations recorded in Stripe Billing across Mid-Market accounts.',
    isPositiveImpact: false
  },
  {
    id: 'link-churn-ebitda',
    sourceMetricId: 'churn',
    sourceName: 'Customer Logo Churn',
    targetMetricId: 'ebitda',
    targetName: 'Operating EBITDA',
    correlation: -0.87,
    impactMultiplier: -1280000,
    unitLabel: '-$1.28M EBITDA per +1% churn',
    confidence: 96.1,
    timeLag: 'Immediate',
    pValue: 0.0002,
    mechanism: 'Customer churn directly eliminates high-margin gross profit while fixed operating expenses remain unchanged.',
    evidenceSnippet: 'Historical EBITDA variance attribution from Financial Planning & Analysis model.',
    isPositiveImpact: false
  },
  {
    id: 'link-strt-churn',
    sourceMetricId: 'strt',
    sourceName: 'Support Ticket Resolution Time',
    targetMetricId: 'churn',
    targetName: 'Customer Logo Churn',
    correlation: 0.79,
    impactMultiplier: 0.18, // Every 1 hr delay in support resolution increases annualized churn by 0.18%
    unitLabel: '+0.18% churn per +1h delay',
    confidence: 92.4,
    timeLag: '30-Day Lag',
    pValue: 0.0012,
    mechanism: 'Unresolved P1/P2 issues degrade product sentiment, triggering executive escalation and non-renewal at contract anniversary.',
    evidenceSnippet: 'Analysis of 114 churned accounts showed 78% experienced support ticket resolution exceeding 24 hours in the 60 days preceding cancellation.',
    isPositiveImpact: false
  },
  {
    id: 'link-strt-ebitda',
    sourceMetricId: 'strt',
    sourceName: 'Support Ticket Resolution Time',
    targetMetricId: 'ebitda',
    targetName: 'Operating EBITDA',
    correlation: -0.76,
    impactMultiplier: -74000, // Support staff overtime & escalations
    unitLabel: '-$74K EBITDA per +1h delay',
    confidence: 89.5,
    timeLag: 'Monthly',
    pValue: 0.0028,
    mechanism: 'Extended resolution cycles require Tier-3 engineering escalations, contractor overtime, and concession credits.',
    evidenceSnippet: 'Cost center 402 (Customer Support) logged $410K in overtime and emergency staffing over Q3.',
    isPositiveImpact: false
  },
  {
    id: 'link-uptime-nrr',
    sourceMetricId: 'uptime',
    sourceName: 'Platform Core Uptime',
    targetMetricId: 'nrr',
    targetName: 'Net Retention Rate',
    correlation: 0.81,
    impactMultiplier: 12.5, // 0.1% uptime loss = -1.25% NRR
    unitLabel: '+1.25% NRR per +0.1% uptime',
    confidence: 95.0,
    timeLag: '60-Day Lag',
    pValue: 0.0008,
    mechanism: 'Enterprise accounts invoke SLA penalties and freeze upsell expansions following unscheduled outage events.',
    evidenceSnippet: '2 large enterprise expansion contracts ($640K ACV) were put on hold after the August 14th degraded performance outage.',
    isPositiveImpact: true
  },
  {
    id: 'link-cac-ebitda',
    sourceMetricId: 'cac',
    sourceName: 'Customer Acquisition Cost',
    targetMetricId: 'ebitda',
    targetName: 'Operating EBITDA',
    correlation: -0.83,
    impactMultiplier: -850000, // Per $1000 CAC surge across cohort
    unitLabel: '-$850K EBITDA per +$1K CAC',
    confidence: 93.7,
    timeLag: 'Quarterly',
    pValue: 0.0006,
    mechanism: 'Higher ad acquisition bids and lower conversion efficiency expand Sales & Marketing OpEx without proportional new ARR.',
    evidenceSnippet: 'Ad spend increased 18% in Q2/Q3 while closed-won volume increased only 3.2%.',
    isPositiveImpact: false
  },
  {
    id: 'link-winrate-arr',
    sourceMetricId: 'win_rate',
    sourceName: 'Demo-to-Close Win Rate',
    targetMetricId: 'arr',
    targetName: 'Annual Recurring Revenue',
    correlation: 0.88,
    impactMultiplier: 780000, // Per 1% win rate
    unitLabel: '+$780K ARR per +1% win rate',
    confidence: 96.8,
    timeLag: 'Quarterly',
    pValue: 0.0003,
    mechanism: 'Direct expansion of sales funnel throughput into contracted annual recurring revenue.',
    evidenceSnippet: 'Sales pipeline capacity model shows every +1% close rate yields 9 additional enterprise accounts/quarter.',
    isPositiveImpact: true
  },
  {
    id: 'link-invt-gm',
    sourceMetricId: 'inventory_turnover',
    sourceName: 'Inventory Turnover Ratio',
    targetMetricId: 'gross_margin',
    targetName: 'Gross Profit Margin',
    correlation: 0.72,
    impactMultiplier: 0.65, // +1 turn = +0.65% GM
    unitLabel: '+0.65% GM per +1x turnover',
    confidence: 88.2,
    timeLag: 'Quarterly',
    pValue: 0.0051,
    mechanism: 'Higher inventory turnover reduces storage, handling, depreciation, and write-down costs, directly improving COGS.',
    evidenceSnippet: 'Warehouse holding costs increased by $320K as inventory turnover slipped to 6.4x.',
    isPositiveImpact: true
  }
];

export const TOP_DRIVERS: DriverImpact[] = [
  {
    metricId: 'lrt',
    name: 'Lead Response Time',
    category: 'sales',
    correlation: -0.84,
    impactDollars: -2210000,
    impactPercent: -2.62,
    direction: 'negative',
    elasticityLabel: '-$125K ARR per min delay',
    keyFinding: 'Response time tripled from 18m to 46m, draining $2.21M in qualified pipeline ARR.',
    confidence: 94.2,
    dataSource: 'HubSpot & Salesforce'
  },
  {
    metricId: 'churn',
    name: 'Customer Logo Churn',
    category: 'support',
    correlation: -0.91,
    impactDollars: -2800000,
    impactPercent: -3.32,
    direction: 'negative',
    elasticityLabel: '-$1.75M ARR per +1% churn',
    keyFinding: '1.6% churn increase over plan eliminated $2.8M in recurring revenue and damaged NRR.',
    confidence: 98.6,
    dataSource: 'Stripe Billing & ProfitWell'
  },
  {
    metricId: 'strt',
    name: 'Support Resolution Time',
    category: 'support',
    correlation: -0.76,
    impactDollars: -1435000,
    impactPercent: -1.70,
    direction: 'negative',
    elasticityLabel: '-$74K EBITDA / hr delay',
    keyFinding: 'Support resolution delay to 19.4h sparked CSAT decline and triggered customer non-renewals.',
    confidence: 89.5,
    dataSource: 'Zendesk Enterprise'
  },
  {
    metricId: 'uptime',
    name: 'Core Platform Uptime',
    category: 'product',
    correlation: 0.81,
    impactDollars: -1250000,
    impactPercent: -1.48,
    direction: 'negative',
    elasticityLabel: '-$1.25M ARR per -0.1% downtime',
    keyFinding: 'US-East degraded performance incident froze two enterprise expansions worth $640K.',
    confidence: 95.0,
    dataSource: 'Datadog & PagerDuty'
  },
  {
    metricId: 'inventory_turnover',
    name: 'Inventory Turnover',
    category: 'operations',
    correlation: 0.72,
    impactDollars: -520000,
    impactPercent: -0.61,
    direction: 'negative',
    elasticityLabel: '-$290K COGS per turn drop',
    keyFinding: 'Turnover ratio contraction from 7.1x to 6.4x tied up $1.8M in working capital and increased COGS.',
    confidence: 88.2,
    dataSource: 'SAP S/4HANA'
  }
];

export const EXECUTIVE_INSIGHTS: ExecutiveInsight[] = [
  {
    id: 'insight-1',
    title: 'Lead Response Latency Costing -$2.21M in Annualized ARR',
    category: 'risk',
    severity: 'critical',
    quarter: 'Q3 2024',
    publishedDate: 'October 27, 2024',
    summary: 'Inbound high-intent enterprise lead response time drifted from 18 minutes in Q1 to 46.2 minutes in October, slashing demo-to-close conversion by 13.7% and resulting in a -$2.21M ARR loss.',
    detailedAnalysis: 'Our statistical regression across 4,820 marketing qualified leads confirms that lead response velocity has a -0.84 correlation with pipeline progression. Prospects contacted within 15 minutes convert at 28.2%, whereas contacts delayed beyond 45 minutes drop to 12.1%. Root cause tracing reveals SDR capacity bottleneck during EMEA/US crossover hours and misconfigured lead routing rules in HubSpot.',
    financialImpact: '-$2,210,000 ARR Gap (Variance vs Target: -2.6%)',
    confidenceScore: 94.2,
    dataSources: ['Salesforce CRM: Opportunity Pipeline LTM', 'HubSpot Marketing API: Form Submissions', 'Chili Piper Routing Analytics'],
    recommendedAction: 'Deploy automated AI qualification routing for all tier-1 enterprise demo requests and reallocate 4 dedicated SDRs to cover peak crossover windows. Target SLA: < 12 minutes.',
    relevantMetricIds: ['arr', 'lrt', 'win_rate']
  },
  {
    id: 'insight-2',
    title: 'Support Resolution Delay Compounding Mid-Market Churn (+1.6%)',
    category: 'risk',
    severity: 'critical',
    quarter: 'Q3 2024',
    publishedDate: 'October 25, 2024',
    summary: 'Support ticket resolution times jumped 73% (from 11.2h to 19.4h) following the v4.2 release, directly driving customer dissatisfaction and increasing logo churn to 4.8%.',
    detailedAnalysis: 'Cross-system correlation between Zendesk ticket histories and Stripe subscription cancellations indicates that 78% of churned accounts in Q3 had an unresolved P1/P2 ticket exceeding 24 hours. The resulting churn surge generated -$2.80M in lost recurring revenue and -$1.28M in lost EBITDA. Concurrently, Tier-3 engineering escalations caused $410K in unbudgeted overtime.',
    financialImpact: '-$2,800,000 ARR & -$1,280,000 EBITDA Impact',
    confidenceScore: 98.6,
    dataSources: ['Zendesk Analytics: SLA & MTTR Report', 'Stripe Billing: Cancellation Cohorts', 'Jira Service Management: Defect Triage'],
    recommendedAction: 'Institute immediate bug-bash sprint on top 5 customer-reported regressions in v4.2 and authorize temporary tier-2 support surge capacity to restore MTTR under 8.0 hours.',
    relevantMetricIds: ['churn', 'strt', 'csat', 'ebitda']
  },
  {
    id: 'insight-3',
    title: 'Cloud Infrastructure Optimization Opportunity: +$1.45M EBITDA',
    category: 'opportunity',
    severity: 'positive',
    quarter: 'Q3 2024',
    publishedDate: 'October 24, 2024',
    summary: 'Cloud compute unit economics can be improved by 14% through reserved instances and automated auto-scaling adjustments, offsetting margin compression from recent outages.',
    detailedAnalysis: 'Platform latency (P99 at 312ms) and recent US-East degraded performance highlighted unoptimized database read-replicas and over-provisioned idle container clusters. FinOps audits show $120K/month in idle reserve capacity that can be converted to 3-year savings plans while modernizing caching to cut P99 latency below 180ms.',
    financialImpact: '+$1,450,000 EBITDA Expansion (Margin +1.7%)',
    confidenceScore: 96.5,
    dataSources: ['AWS Cost Explorer & CloudWatch', 'Datadog APM Service Tracing', 'CloudHealth FinOps Ledger'],
    recommendedAction: 'Execute 3-year compute savings commitment and deploy Redis clustering for read-heavy API queries before November 15.',
    relevantMetricIds: ['gross_margin', 'ebitda', 'uptime', 'latency']
  }
];

export function calculateScenario(inputs: ScenarioInputs): ScenarioOutcome {
  const baselineARR = 84250000;
  const baselineEBITDA = 18620000;
  const baselineGrossProfit = 61334000; // 72.8% of ARR
  const baselineNRR = 111.4;

  // 1. Churn Impact
  // -1% churn = +$1.75M ARR
  // If churnDeltaPct is -1.5 (e.g., drops by 1.5%), delta is (-1.5 * -1750000) = +$2,625,000
  const churnArrImpact = -inputs.churnDeltaPct * 1750000;
  const churnEbitdaImpact = -inputs.churnDeltaPct * 1280000;
  const churnNrrImpact = -inputs.churnDeltaPct * 1.4;

  // 2. Lead Response Time Impact
  // Lead response delta: baseline is 46.2 min. If changed by e.g. -20%, minutes saved = 46.2 * 0.20 = 9.24 mins
  // Each minute saved = +$125K ARR
  const minutesSaved = -(inputs.leadResponseDeltaPct / 100) * 46.2;
  const lrtArrImpact = minutesSaved * 125000;
  // Lead response improves close rate, yielding EBITDA margin flow-through of ~45%
  const lrtEbitdaImpact = lrtArrImpact * 0.45;

  // 3. Ticket Resolution Time Impact
  // Baseline is 19.4 hrs. If changed by -25%, hours saved = 4.85h
  // Each hour saved = +$74K EBITDA and prevents churn (+0.18% * hoursSaved)
  const hoursSaved = -(inputs.ticketResolutionDeltaPct / 100) * 19.4;
  const strtEbitdaDirectSavings = hoursSaved * 74000;
  const strtArrRetentionGain = hoursSaved * 0.18 * 1750000;
  const strtTotalEbitdaImpact = strtEbitdaDirectSavings + (strtArrRetentionGain * 0.65);

  // 4. CAC Marketing Efficiency
  // If CAC efficiency improves by +10%, we get same deals for less spend (+$850K per 10% eff)
  const cacEbitdaImpact = (inputs.cacEfficiencyDeltaPct / 10) * 850000;
  const cacArrImpact = (inputs.cacEfficiencyDeltaPct / 10) * 450000;

  // 5. Uptime Target Impact
  // Baseline uptime is 99.88%. Target e.g. 99.95% -> delta is +0.07%
  const uptimeDelta = inputs.serverUptimeTarget - 99.88;
  const uptimeArrImpact = (uptimeDelta / 0.1) * 1250000;
  const uptimeEbitdaImpact = uptimeArrImpact * 0.70;
  const uptimeNrrImpact = (uptimeDelta / 0.1) * 1.25;

  // Aggregate Totals
  const totalArrDelta = churnArrImpact + lrtArrImpact + strtArrRetentionGain + cacArrImpact + uptimeArrImpact;
  const projectedARR = baselineARR + totalArrDelta;
  const arrDeltaPct = (totalArrDelta / baselineARR) * 100;

  const totalEbitdaDelta = churnEbitdaImpact + lrtEbitdaImpact + strtTotalEbitdaImpact + cacEbitdaImpact + uptimeEbitdaImpact;
  const projectedEBITDA = baselineEBITDA + totalEbitdaDelta;

  const grossMarginRate = 0.735; // slightly better with efficiency
  const projectedGrossProfit = projectedARR * grossMarginRate;
  const grossProfitDelta = projectedGrossProfit - baselineGrossProfit;

  const ebitdaMarginBaseline = (baselineEBITDA / baselineARR) * 100;
  const ebitdaMarginProjected = (projectedEBITDA / projectedARR) * 100;

  const totalNrrDelta = churnNrrImpact + uptimeNrrImpact;
  const projectedNRR = Math.min(125, Math.max(95, baselineNRR + totalNrrDelta));

  const waterfallSteps = [
    { name: 'Baseline ARR', amount: baselineARR, isTotal: true, category: 'baseline' },
    { name: 'Churn Reduction', amount: churnArrImpact, category: 'operational' },
    { name: 'Lead Velocity', amount: lrtArrImpact, category: 'operational' },
    { name: 'Support SLA Gain', amount: strtArrRetentionGain, category: 'operational' },
    { name: 'CAC Efficiency', amount: cacArrImpact, category: 'operational' },
    { name: 'Uptime Reliability', amount: uptimeArrImpact, category: 'operational' },
    { name: 'Projected ARR', amount: projectedARR, isTotal: true, category: 'outcome' },
  ];

  return {
    baselineARR,
    projectedARR,
    arrDelta: totalArrDelta,
    arrDeltaPct,
    baselineEBITDA,
    projectedEBITDA,
    ebitdaDelta: totalEbitdaDelta,
    ebitdaMarginBaseline,
    ebitdaMarginProjected,
    baselineGrossProfit,
    projectedGrossProfit,
    grossProfitDelta,
    baselineNRR,
    projectedNRR,
    nrrDelta: totalNrrDelta,
    waterfallSteps
  };
}

// Initial chat messages
export const INITIAL_CHAT_MESSAGES: any[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    timestamp: '10:00 AM',
    content: `Welcome to **Synapse Executive Intelligence**. I continuously monitor telemetry across **Finance, Sales, Customer Support, and Engineering** to identify causal drivers of financial performance.

Key highlight this quarter: **Lead Response Latency** and **Support Ticket Resolution Delays** are exerting a combined **-$5.01M negative drag** on our ARR and EBITDA targets.

Select any question below or ask in plain English:`,
    followUps: [
      'Why did EBITDA margin dip in Q3 despite sales growth?',
      'Which operational metric had the highest negative correlation with net retention last month?',
      'What happens to ARR if we reduce lead response time to under 15 minutes?',
      'Show causal breakdown between support tickets and revenue churn.'
    ]
  }
];

// Pre-computed intelligent answers for common and complex executive questions
export const QA_KNOWLEDGE_BASE: {
  keywords: string[];
  title: string;
  generateResponse: () => {
    content: string;
    confidenceInterval: string;
    dataReferences: { title: string; source: string; metric: string; value: string }[];
    visualCard?: any;
    followUps: string[];
  };
}[] = [
  {
    keywords: ['ebitda', 'margin', 'dip', 'q3', 'growth'],
    title: 'EBITDA Margin Dip in Q3',
    generateResponse: () => ({
      content: `### Executive Analysis: Q3 EBITDA Margin Contraction

Despite top-line revenue growing **+14.2% YoY**, Operating EBITDA margin compressed by **2.4 percentage points** (from expected 24.5% to **22.1%**). 

The causal decomposition reveals three primary operational cost drivers:

1. **Customer Support Escalations & Overtime ($680K unbudgeted cost):**
   - Following release v4.2, Mean Support Ticket Resolution Time surged **+73.2%** (from 11.2h to 19.4h).
   - This necessitated contractor surge staffing and Tier-3 engineering triage teams.
2. **Sales CAC Inflation ($540K variance):**
   - Customer Acquisition Cost rose from $8,800 to **$9,420** (+7.1%) due to lower demo conversion rates resulting from Lead Response Latency (46.2 mins).
3. **Cloud Infrastructure Outage Remediation ($320K):**
   - US-East incident remediation and unoptimized failover compute instances added to COGS.`,
      confidenceInterval: 'Confidence: 96.4% | Margin of Error ±1.8%',
      dataReferences: [
        { title: 'Workday ERP Ledger', source: 'General Ledger Q3', metric: 'EBITDA Margin', value: '22.1% (Plan: 24.5%)' },
        { title: 'Zendesk Overtime Logs', source: 'Cost Center 402', metric: 'Overtime Spend', value: '$410,000' },
        { title: 'Salesforce Pipeline Analysis', source: 'Opportunity CAC', metric: 'CAC', value: '$9,420' }
      ],
      visualCard: {
        type: 'driver_breakdown',
        title: 'Q3 EBITDA Variance Decomposition (-$2.94M vs Plan)',
        data: [
          { name: 'Support Overtime & SLAs', amount: -680000, color: '#f43f5e' },
          { name: 'CAC Efficiency Slip', amount: -540000, color: '#f43f5e' },
          { name: 'Cloud Outage Remediation', amount: -320000, color: '#f59e0b' },
          { name: 'Mid-Market Churn Drag', amount: -1280000, color: '#e11d48' },
          { name: 'Volume Gross Margin Flow', amount: 880000, color: '#10b981' }
        ]
      },
      followUps: [
        'What is the quickest lever to recover EBITDA in Q4?',
        'How much EBITDA is restored if support resolution time drops back to 8 hours?',
        'Show correlation between CAC and sales cycle length.'
      ]
    })
  },
  {
    keywords: ['retention', 'nrr', 'negative', 'correlation', 'highest', 'last month'],
    title: 'Highest Negative Correlation with Net Retention',
    generateResponse: () => ({
      content: `### Executive Analysis: Net Retention Rate (NRR) Drivers

In the last 90 days, **Customer Logo Churn (r = -0.91)** and **Support Ticket Resolution Time (r = -0.79)** exhibited the highest negative statistical correlation with Net Retention Rate (which dipped from **114.2%** to **111.4%**).

#### Causal Impact Summary:
- **Primary Driver:** Support Ticket Resolution Time (STRT)
  - Accounts experiencing a ticket resolution time $> 24$ hours had a **3.8x higher probability of contract downgrade or cancellation** at renewal.
  - Correlation coefficient: **r = -0.79 (p < 0.001)**.
- **Secondary Driver:** Core Platform Uptime (r = +0.81 positive correlation)
  - Outage events directly halted two major multi-tier enterprise upsells ($640K ARR).`,
      confidenceInterval: 'Confidence: 98.1% | Pearson r = -0.79 with p-value 0.0012',
      dataReferences: [
        { title: 'Gainsight Health Scores', source: 'Customer Telemetry', metric: 'NRR', value: '111.4% (-2.8 pts)' },
        { title: 'Zendesk Ticket Metrics', source: 'Support Logs', metric: 'Resolution Time', value: '19.4 hrs (+73%)' },
        { title: 'Stripe Subscription Churn', source: 'Contract Ledger', metric: 'Logo Churn', value: '4.8% annualized' }
      ],
      visualCard: {
        type: 'correlation_badge',
        title: 'Metric Correlations with Net Retention Rate (NRR)',
        data: [
          { metric: 'Logo Churn Rate', r: -0.91, impact: 'High Risk' },
          { metric: 'Ticket Resolution Time', r: -0.79, impact: 'High Risk' },
          { metric: 'Lead Response Time', r: -0.42, impact: 'Moderate' },
          { metric: 'Platform Uptime', r: 0.81, impact: 'High Positive' },
          { metric: 'CSAT Rating', r: 0.74, impact: 'High Positive' }
        ]
      },
      followUps: [
        'How many accounts are currently in the high-risk churn cohort?',
        'What is our projected NRR if we resolve the v4.2 bug backlog?',
        'Show causal breakdown between support tickets and revenue churn.'
      ]
    })
  },
  {
    keywords: ['15', 'lead', 'response', 'arr', 'happens', 'reduce'],
    title: 'Impact of Reducing Lead Response Time to < 15 Mins',
    generateResponse: () => ({
      content: `### Scenario Simulation: Lead Response Time under 15 Minutes

Reducing **Lead Response Time** from the current **46.2 minutes** to **14.0 minutes** (-32.2 minutes, a **-69.7% reduction**) produces an immediate, high-leverage boost to pipeline velocity:

- **Projected ARR Impact:** **+$3,850,000** annually (+4.57% net expansion)
- **Demo-to-Close Win Rate:** Recovers from **21.4%** to **26.8%** (+5.4 pts)
- **Operating EBITDA Flow-Through:** **+$1,732,500** added to operating profit
- **Payback Period:** Under 45 days against automated qualification tooling costs.

#### Causal Pathway:
\`Inbound MQL\` $\\rightarrow$ \`Immediate Human Touch (<15m)\` $\\rightarrow$ \`+38% Demo Show Rate\` $\\rightarrow$ \`Higher Sales Velocity\` $\\rightarrow$ \`ARR Acceleration\``,
      confidenceInterval: 'Confidence: 94.2% | Elasticity: +$125K ARR per min improvement',
      dataReferences: [
        { title: 'HubSpot Inbound Conversion Audit', source: 'Marketing Ops', metric: 'Demo Show Rate', value: '52% -> 79%' },
        { title: 'Salesforce Opportunity Win-Rates', source: 'CRM Pipeline', metric: 'Win Rate', value: '21.4% -> 26.8%' }
      ],
      visualCard: {
        type: 'scenario_preview',
        title: 'Projected Financial Outcomes (14m Response Time)',
        data: {
          currentARR: '$84.25M',
          projectedARR: '$88.10M',
          deltaARR: '+$3.85M (+4.57%)',
          currentEBITDA: '$18.62M',
          projectedEBITDA: '$20.35M',
          deltaEBITDA: '+$1.73M'
        }
      },
      followUps: [
        'What tooling or head-count is required to reach 14 minutes?',
        'How does this interact with CAC efficiency?',
        'Simulate this scenario alongside a 1% reduction in churn.'
      ]
    })
  },
  {
    keywords: ['support', 'ticket', 'churn', 'causal', 'revenue'],
    title: 'Causal Chain: Support Tickets to Revenue Churn',
    generateResponse: () => ({
      content: `### Causal Mechanics: Support Ticket Resolution Time to Revenue Churn

Our causal discovery engine traces the exact operational chain connecting engineering support backlogs to recurring revenue loss:

1. **Step 1: Release Regressions (Engineering)**
   - Release v4.2 introduced 14 high-priority UI and API performance bugs.
2. **Step 2: Queue Saturation (Customer Support)**
   - Ticket volume surged +44%; mean resolution time expanded from **11.2h** to **19.4h**.
3. **Step 3: Customer Sentiment Degradation**
   - CSAT fell from 88.4% to 81.2%. Customer frustration escalated in Mid-Market accounts lacking dedicated TAMs.
4. **Step 4: Non-Renewal & Churn (Finance)**
   - Accounts with tickets unresolved past SLA breached renewal windows, resulting in an annualized **+1.6% churn jump**, translating to **-$2.80M in lost ARR**.`,
      confidenceInterval: 'Confidence: 95.8% | Causal Path P-Value < 0.001',
      dataReferences: [
        { title: 'Zendesk Resolution SLAs', source: 'Support DB', metric: 'Resolution Time', value: '19.4 hrs' },
        { title: 'Jira Software Regressions', source: 'Eng Issue Tracker', metric: 'Bug Volume', value: '+44% in v4.2' },
        { title: 'Stripe Subscriptions', source: 'Finance', metric: 'ARR Loss', value: '-$2.80M' }
      ],
      visualCard: {
        type: 'kpi_matrix',
        title: 'Chain-of-Impact Step Metrics',
        data: [
          { step: '1. Bug Volume', metric: '+44%', status: 'Critical' },
          { step: '2. Resolution Time', metric: '19.4 hrs (+73%)', status: 'Critical' },
          { step: '3. CSAT Rating', metric: '81.2% (-8.1%)', status: 'Warning' },
          { step: '4. Churn Rate', metric: '4.8% (+1.6 pts)', status: 'Critical' },
          { step: '5. Financial Impact', metric: '-$2.80M ARR', status: 'Critical' }
        ]
      },
      followUps: [
        'Which specific product module accounts for the majority of these bugs?',
        'Can we offer credits to at-risk accounts to preserve retention?',
        'How much will hiring 3 Tier-2 support engineers save in churn?'
      ]
    })
  }
];
