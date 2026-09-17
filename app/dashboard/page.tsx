import {redirect} from 'next/navigation';
import {getSessionUser} from '@/lib/auth';
import Nav from '@/components/Nav';
import Link from 'next/link';

const data = [
  {m: 'Apr', v: 19},
  {m: 'May', v: 21},
  {m: 'Jun', v: 22},
  {m: 'Jul', v: 25},
  {m: 'Aug', v: 24},
  {m: 'Sep', v: 26},
];

function FreightTrendChart() {
  const width = 900;
  const height = 300;
  const left = 48;
  const right = 24;
  const top = 24;
  const bottom = 44;
  const min = 18;
  const max = 27;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const points = data.map((item, index) => ({
    ...item,
    x: left + (index * plotWidth) / (data.length - 1),
    y: top + ((max - item.v) / (max - min)) * plotHeight,
  }));

  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const gridValues = [18, 20, 22, 24, 26];

  return (
    <div className="chart" style={{width: '100%', height: 300}}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="Freight trend from April to September">
        {gridValues.map((value) => {
          const y = top + ((max - value) / (max - min)) * plotHeight;
          return (
            <g key={value}>
              <line x1={left} x2={width - right} y1={y} y2={y} stroke="#213149" strokeDasharray="3 3" />
              <text x={left - 10} y={y + 4} textAnchor="end" fill="#7f91a7" fontSize="12">{value}</text>
            </g>
          );
        })}
        <path d={path} fill="none" stroke="#55d6be" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.m}>
            <circle cx={point.x} cy={point.y} r="5" fill="#0d1a2b" stroke="#55d6be" strokeWidth="3" />
            <text x={point.x} y={height - 16} textAnchor="middle" fill="#7f91a7" fontSize="12">{point.m}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default async function Dashboard() {
  const u = await getSessionUser();
  if (!u) redirect('/login');

  return (
    <div>
      <Nav name={u.name} />
      <main className="container">
        <div className="eyebrow">Planning workspace</div>
        <h1>Good to see you, {u.name.split(' ')[0]}.</h1>
        <p className="muted">East Coast bulk cargo intelligence at a glance.</p>

        <div className="grid" style={{marginTop: 24}}>
          <div className="card"><div className="muted">Next-month freight</div><div className="kpi">$26/t</div><span className="badge">+8.3% forecast</span></div>
          <div className="card"><div className="muted">Demand</div><div className="kpi">52k t</div><span className="muted">monthly forecast</span></div>
          <div className="card"><div className="muted">Best route</div><div className="kpi">IDN → PRD</div><span className="muted">illustrative corridor</span></div>
          <div className="card"><div className="muted">Risk</div><div className="kpi">Medium</div><span className="muted">market + port</span></div>
        </div>

        <div className="sectiontitle"><h2>Freight trend</h2><Link className="btn secondary" href="/forecast">Open forecast</Link></div>
        <div className="card"><FreightTrendChart /></div>

        <div className="grid2" style={{marginTop: 18}}>
          <div className="card"><h3>Quick optimization</h3><p className="muted">Generate a vessel and procurement plan for an overseas bulk cargo shipment.</p><Link className="btn" href="/optimize">Run optimizer</Link></div>
          <div className="card"><h3>Scenario lab</h3><p className="muted">Stress-test fuel, freight and demand assumptions.</p><Link className="btn secondary" href="/scenarios">Open scenarios</Link></div>
        </div>
      </main>
    </div>
  );
}
