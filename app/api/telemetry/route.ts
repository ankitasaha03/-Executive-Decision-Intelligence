import { NextResponse } from 'next/server';
import { INITIAL_METRICS, CAUSAL_LINKS, TOP_DRIVERS, EXECUTIVE_INSIGHTS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    metrics: INITIAL_METRICS,
    causalLinks: CAUSAL_LINKS,
    topDrivers: TOP_DRIVERS,
    insights: EXECUTIVE_INSIGHTS,
    status: 'healthy',
    engineVersion: '2.4.0-causal-telemetry'
  });
}
