import { ArrowLeft, Brain, Bug, CheckCircle, Lightbulb, MessageSquare, Repeat, Zap, Shield, BarChart3, Clock } from 'lucide-react'

export default function Results({ code, result, onBack }) {
  
  if (!result) {
    return (
      <div className="flex-center" style={{ flex: 1, flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>No results available. Please try analyzing again.</p>
        <button className="btn-secondary" onClick={onBack}>Go Back</button>
      </div>
    )
  }

  const { score, bugs, intent, suggestions, alternatives, explanation, language } = result
  const hasBugs = bugs && bugs.length > 0
  const color = score > 80 ? 'var(--accent-green)' : (score > 60 ? 'var(--accent-yellow)' : 'var(--accent-red)')

  return (
    <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button className="btn-secondary" onClick={onBack} style={{ padding: '0.6rem', borderRadius: '12px' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Analysis Report</h1>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} /> {new Date().toLocaleDateString()}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--neon-blue)', fontWeight: '600' }}>
                {language || 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', flex: 1 }}>
        
        {/* Left Column: Score */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '2.5rem 1.5rem',
          }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.7rem', fontWeight: '700' }}>Reliability Score</h3>
            
            <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="80" cy="80" r="72" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                <circle 
                  cx="80" cy="80" r="72" fill="transparent" stroke={color} strokeWidth="8" 
                  strokeDasharray="452.4" 
                  strokeDashoffset={452.4 - (score / 100) * 452.4} 
                  strokeLinecap="round" 
                  style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: '900' }}>{score}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Neural Match</div>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'center', width: '100%' }}>
              <div style={{ 
                padding: '0.5rem', 
                borderRadius: '8px', 
                background: `${color}10`, 
                border: `1px solid ${color}20`,
                color: color,
                fontWeight: '700',
                fontSize: '0.9rem'
              }}>
                {score > 80 ? 'EXCELLENT' : (score > 60 ? 'OPTIMIZATION NEEDED' : 'CRITICAL ERRORS')}
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={14} /> CORE METRICS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <MetricRow label="Logic Efficiency" value="O(n)" />
              <MetricRow label="Vulnerability Risk" value={hasBugs ? "High" : "Low"} color={hasBugs ? 'var(--accent-red)' : 'var(--accent-green)'} />
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <Brain color="var(--neon-blue)" size={20} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Logic Intent</h3>
            </div>
            <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.9 }}>
              {intent || "Intent analysis pending..."}
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <Bug color={hasBugs ? 'var(--accent-red)' : 'var(--accent-green)'} size={20} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Vulnerability Report</h3>
            </div>
            {hasBugs ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {bugs.map((bug, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 75, 75, 0.04)', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 75, 75, 0.1)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-red)' }}></div>
                    <span style={{ color: '#fca5a5', fontSize: '0.9rem' }}>{bug}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-green)', background: 'rgba(0, 230, 118, 0.04)', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle size={18} />
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>No logical vulnerabilities detected.</span>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <Lightbulb color="var(--accent-yellow)" size={18} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>AI Suggestions</h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {suggestions && suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <Repeat color="var(--neon-cyan)" size={18} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Alternative Flows</h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {alternatives && alternatives.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <MessageSquare color="var(--neon-purple)" size={20} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Simplified Explanation</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7' }}>
              {explanation || "No explanation provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricRow({ label, value, color = 'var(--text-main)' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: color }}>{value}</span>
    </div>
  )
}
