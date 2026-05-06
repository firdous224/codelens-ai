import { X, Brain, Bug, Lightbulb, Repeat, Clock, Code, Shield, Zap, BarChart3, ChevronRight, Terminal } from 'lucide-react'

export default function ReportModal({ report, onClose }) {
  if (!report) return null

  const { result, code, language, created_at } = report
  const { score, bugs, intent, suggestions, alternatives, explanation, step_by_step_explanation, time_complexity, space_complexity } = result
  const hasBugs = bugs && bugs.length > 0
  const color = score > 80 ? 'var(--accent-green)' : (score > 60 ? 'var(--accent-yellow)' : 'var(--accent-red)')

  return (
    <div className="modal-overlay" onClick={onClose} style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 15, 0.95)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div className="card animate-fade-in" onClick={e => e.stopPropagation()} style={{
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: 0,
        background: '#0b0f1a',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 0 100px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 242, 254, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2.5rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <Terminal size={20} color="var(--neon-blue)" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Detailed Neural Report</h2>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} /> {new Date(created_at).toLocaleString()}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--neon-blue)', fontWeight: '600' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-blue)' }}></div>
                {language || 'Unknown Language'}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="btn-secondary"
            style={{ 
              width: '40px', 
              height: '40px', 
              padding: 0,
              borderRadius: '12px',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '2.5rem' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Score Card */}
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.02)', 
                borderRadius: '20px', 
                padding: '2.5rem 2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                border: '1px solid var(--glass-border)'
              }}>
                <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="70" cy="70" r="62" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                    <circle 
                      cx="70" cy="70" r="62" fill="transparent" stroke={color} strokeWidth="8" 
                      strokeDasharray="389.5" 
                      strokeDashoffset={389.5 - (score / 100) * 389.5} 
                      strokeLinecap="round" 
                      style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)', filter: `drop-shadow(0 0 10px ${color}44)` }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{score}%</div>
                  </div>
                </div>
                <div style={{ 
                  marginTop: '1.5rem', 
                  padding: '0.4rem 1.2rem', 
                  borderRadius: '100px', 
                  background: `${color}11`, 
                  border: `1px solid ${color}33`,
                  color: color,
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em'
                }}>
                  {score > 80 ? 'EXCELLENT' : 'NEEDS ATTENTION'}
                </div>
                
                <div style={{ width: '100%', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Complexity</span>
                    <span style={{ fontWeight: '700' }}>{time_complexity || 'O(n)'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Memory Arch</span>
                    <span style={{ fontWeight: '700' }}>{space_complexity || 'O(n)'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Summary */}
              <div style={{ 
                background: 'rgba(0, 242, 254, 0.03)', 
                borderRadius: '16px', 
                padding: '1.5rem',
                borderLeft: '4px solid var(--neon-blue)',
                border: '1px solid rgba(0, 242, 254, 0.05)'
              }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--neon-blue)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Brain size={16} /> NEURAL SUMMARY
                </h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
                  {explanation}
                </p>
              </div>

            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* Code Snapshot */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Code size={20} color="var(--neon-blue)" /> Analyzed Sequence
                  </h3>
                </div>
                <div style={{ 
                  background: '#05080f', 
                  borderRadius: '16px', 
                  padding: '1.5rem', 
                  maxHeight: '350px', 
                  overflow: 'auto',
                  border: '1px solid var(--glass-border)',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.9rem',
                  lineHeight: '1.7',
                  whiteSpace: 'pre',
                  color: 'rgba(255,255,255,0.8)',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
                }}>
                  {code}
                </div>
              </div>

              {/* Logic Flow */}
              {step_by_step_explanation && (
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>Execution Logic Flow</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {step_by_step_explanation.map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                        <div style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '8px', 
                          background: 'rgba(0, 242, 254, 0.1)', 
                          color: 'var(--neon-blue)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontSize: '0.85rem', 
                          fontWeight: '800',
                          flexShrink: 0,
                          border: '1px solid rgba(0, 242, 254, 0.2)'
                        }}>
                          {i + 1}
                        </div>
                        <div style={{ paddingTop: '0.2rem' }}>
                          <p style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--text-main)' }}>{step.title}</p>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.01)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-yellow)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Lightbulb size={18} /> RECOMMENDATIONS
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {suggestions.map((s, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.01)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--neon-cyan)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Repeat size={18} /> ALTERNATIVES
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {alternatives.map((a, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 2.5rem',
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          <button 
            className="btn-primary" 
            onClick={onClose}
            style={{ padding: '0.8rem 2rem' }}
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  )
}
