import Reveal from './Reveal';

export interface Stat {
  value: string;
  label: string;
}

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats-strip">
      {stats.map((stat, idx) => (
        <Reveal key={stat.label} delay={idx * 0.06} y={16}>
          <div className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
