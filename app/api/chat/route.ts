import { NextRequest, NextResponse } from 'next/server';
import { QA_KNOWLEDGE_BASE } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const lower = query.toLowerCase();
    const matchedEntry = QA_KNOWLEDGE_BASE.find((entry) =>
      entry.keywords.some((k) => lower.includes(k))
    );

    if (matchedEntry) {
      return NextResponse.json(matchedEntry.generateResponse());
    }

    // Default synthesis
    return NextResponse.json({
      content: `### Executive Analysis for: "${query}"\n\nCross-department telemetry links operational delays in Lead Response Time (46.2m) and Support Resolution (19.4h) to current ARR variance (-$3.75M vs target). Review the Scenario Simulator for projected recovery levers.`,
      confidenceInterval: 'Confidence: 94.0% | Cross-functional regression model',
      dataReferences: [
        { title: 'NetSuite General Ledger', source: 'ERP Financials', metric: 'ARR', value: '$84.25M' },
        { title: 'Salesforce CRM', source: 'Pipeline Health', metric: 'Win Rate', value: '21.4%' }
      ],
      followUps: [
        'Why did EBITDA margin dip in Q3 despite sales growth?',
        'Which operational metric had the highest negative correlation with net retention last month?',
        'What happens to ARR if we reduce lead response time to under 15 minutes?'
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal processing error' }, { status: 500 });
  }
}
