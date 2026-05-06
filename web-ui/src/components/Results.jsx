import { ArrowLeft, Brain, Bug, CheckCircle, Lightbulb, MessageSquare, Repeat } from 'lucide-react'

export default function Results({ code, result, onBack }) {
  
  if (!result) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p>No results available. Please try analyzing again.</p>
        <button className="btn-secondary" onClick={onBack} style={{ width: 'fit-content', marginTop: '1rem' }}>Go Back</button>
      </div>
    )
  }

  const { score, bugs, intent, suggestions, alternatives, explanation } = result
  const hasBugs = bugs && bugs.length > 0
  const color = score > 80 ? 'var(--accent-green)' : (score > 60 ? '#f5a623' : 'var(--accent-red)')

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn-secondary" onClick={onBack} style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Analysis Results</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem', flex: 1 }}>
        
        {/* Left Column: Score */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Quality Score</h3>
            
            <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle 
                  cx="80" cy="80" r="70" fill="transparent" stroke={color} strokeWidth="12" 
                  strokeDasharray="439.8" 
                  strokeDashoffset={439.8 - (score / 100) * 439.8} 
                  strokeLinecap="round" 
                  style={{ transition: 'stroke-dashoffset 1.5s ease-out', filter: `drop-shadow(0 0 8px ${color})` }}
                />
              </svg>
              <div style={{ position: 'absolute', fontSize: '2.5rem', fontWeight: '800' }}>{score}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>%</span></div>
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p style={{ fontWeight: '600', color: color }}>{score > 80 ? 'Excellent' : (score > 60 ? 'Needs Work' : 'Critical Issues')}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Confidence: 94%</p>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Brain color="var(--neon-blue)" />
              <h3 style={{ fontSize: '1.25rem' }}>Extracted Intent</h3>
            </div>
            <div style={{ background: 'rgba(0, 242, 254, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--neon-blue)' }}>
              <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
                {intent || "No intent extracted."}
              </p>
            </div>
          </div>

          <div className="card" style={{ borderColor: hasBugs ? 'rgba(255, 75, 75, 0.3)' : 'rgba(255, 255, 255, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Bug color={hasBugs ? 'var(--accent-red)' : 'var(--text-muted)'} />
              <h3 style={{ fontSize: '1.25rem' }}>Vulnerabilities & Bugs</h3>
            </div>
            {hasBugs ? (
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
                {bugs.map((bug, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255, 75, 75, 0.05)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 75, 75, 0.2)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-red)', marginTop: '0.5rem' }}></div>
                    <span style={{ color: '#ff8a8a' }}>{bug}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)' }}>
                <CheckCircle size={18} />
                <span>No major issues found in the logical flow.</span>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Lightbulb color="#f5a623" />
                <h3 style={{ fontSize: '1.1rem' }}>Suggestions</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {suggestions && suggestions.map((s, i) => <span key={i}>{s}<br/></span>)}
              </p>
            </div>
            
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Repeat color="var(--neon-cyan)" />
                <h3 style={{ fontSize: '1.1rem' }}>Alternatives</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {alternatives && alternatives.map((a, i) => <span key={i}>{a}<br/></span>)}
              </p>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <MessageSquare color="var(--neon-blue)" />
              <h3 style={{ fontSize: '1.1rem' }}>Simple Explanation</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {explanation || "No explanation provided."}
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
