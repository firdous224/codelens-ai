import { X, Brain, Bug, Lightbulb, Repeat, MessageSquare, Clock, Code, ChevronRight } from 'lucide-react'

export default function ReportModal({ report, onClose }) {
  if (!report) return null

  const { result, code, language, created_at } = report
  const { score, bugs, intent, suggestions, alternatives, explanation, step_by_step_explanation, time_complexity, space_complexity } = result
  const hasBugs = bugs && bugs.length > 0
  const color = score > 80 ? 'var(--accent-green)' : (score > 60 ? '#f5a623' : 'var(--accent-red)')

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 15, 0.9)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: 0,
        background: 'rgba(21, 27, 43, 0.95)',
        border: '1px solid rgba(0, 242, 254, 0.2)',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 242, 254, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code size={24} color="var(--neon-blue)" /> Full Analysis Report
            </h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={14} /> {new Date(created_at).toLocaleString()}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-blue)' }}></div>
                {language || 'Unknown Language'}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: 'none', 
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Score Card */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.2)', 
                borderRadius: '16px', 
                padding: '2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="60" cy="60" r="54" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle 
                      cx="60" cy="60" r="54" fill="transparent" stroke={color} strokeWidth="8" 
                      strokeDasharray="339.3" 
                      strokeDashoffset={339.3 - (score / 100) * 339.3} 
                      strokeLinecap="round" 
                      style={{ transition: 'stroke-dashoffset 1.5s ease-out', filter: `drop-shadow(0 0 8px ${color})` }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', fontSize: '2rem', fontWeight: '800' }}>{score}%</div>
                </div>
                <p style={{ marginTop: '1rem', fontWeight: '600', color: color, fontSize: '1.1rem' }}>
                  {score > 80 ? 'Excellent' : (score > 60 ? 'Needs Work' : 'Critical Issues')}
                </p>
                
                <div style={{ width: '100%', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Complexity</span>
                    <span>{time_complexity || 'O(n)'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Space</span>
                    <span>{space_complexity || 'O(n)'}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div style={{ 
                background: 'rgba(0, 242, 254, 0.05)', 
                borderRadius: '12px', 
                padding: '1.25rem',
                borderLeft: '4px solid var(--neon-blue)'
              }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--neon-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Brain size={16} /> Analysis Summary
                </h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
                  {explanation}
                </p>
              </div>

              {/* Bugs */}
              <div style={{ 
                background: hasBugs ? 'rgba(255, 75, 75, 0.05)' : 'rgba(0, 230, 118, 0.05)', 
                borderRadius: '12px', 
                padding: '1.25rem',
                borderLeft: `4px solid ${hasBugs ? 'var(--accent-red)' : 'var(--accent-green)'}`
              }}>
                <h4 style={{ fontSize: '0.9rem', color: hasBugs ? 'var(--accent-red)' : 'var(--accent-green)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bug size={16} /> {hasBugs ? 'Vulnerabilities' : 'Logic Status'}
                </h4>
                {hasBugs ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {bugs.slice(0, 3).map((bug, i) => (
                      <div key={i} style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', display: 'flex', gap: '0.5rem' }}>
                        <span>•</span> {bug}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-green)' }}>No major logic errors detected.</p>
                )}
              </div>

            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Code Blocks */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Original Code</h3>
                </div>
                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.4)', 
                  borderRadius: '12px', 
                  padding: '1.25rem', 
                  maxHeight: '300px', 
                  overflow: 'auto',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre'
                }}>
                  {code}
                </div>
              </div>

              {/* Step by Step */}
              {step_by_step_explanation && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>How it works</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {step_by_step_explanation.map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          background: 'rgba(0, 242, 254, 0.1)', 
                          color: 'var(--neon-blue)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontSize: '0.8rem', 
                          fontWeight: '700',
                          flexShrink: 0,
                          border: '1px solid rgba(0, 242, 254, 0.3)'
                        }}>
                          {i + 1}
                        </div>
                        <div>
                          <p style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.2rem' }}>{step.title}</p>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: '#f5a623', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lightbulb size={16} /> Suggestions
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {suggestions.map((s, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--neon-cyan)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Repeat size={16} /> Alternatives
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {alternatives.map((a, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          <button 
            className="btn-primary" 
            onClick={onClose}
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  )
}
