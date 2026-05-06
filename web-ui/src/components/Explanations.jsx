import { Bot, Clock, HardDrive, Info, Brain, Zap, Terminal, ChevronRight } from 'lucide-react'

export default function Explanations({ result }) {
  if (!result) {
    return (
      <div className="flex-center" style={{ flex: 1, flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>No explanation available for this sequence.</p>
      </div>
    )
  }

  const { explanation, step_by_step_explanation, time_complexity, space_complexity } = result;

  return (
    <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Neural Decoding</h1>
        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain size={16} /> Advanced AI breakdown of implementation logic into simple human concepts.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
        
        {/* Left Column: Step-by-Step */}
        <div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            Logic Sequence Breakdown
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {step_by_step_explanation ? step_by_step_explanation.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '10px', 
                  background: 'rgba(0, 242, 254, 0.1)', 
                  color: 'var(--neon-blue)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '1rem',
                  flexShrink: 0,
                  border: '1px solid rgba(0, 242, 254, 0.2)'
                }}>
                  {idx + 1}
                </div>
                <div style={{ paddingTop: '0.3rem' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{step.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', fontSize: '1rem' }}>{step.desc}</p>
                </div>
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)' }}>No step-by-step decoding available.</p>
            )}
          </div>
        </div>

        {/* Right Column: Summary & Complexity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="card" style={{ background: 'rgba(0, 242, 254, 0.03)', borderLeft: '4px solid var(--neon-blue)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.25rem' }}>
              <Terminal color="var(--neon-blue)" size={22} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>In Plain Words</h3>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '1rem' }}>
              {explanation || "Sequence summary not available."}
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '2rem' }}>Complexity Metrics</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 166, 35, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock color="var(--accent-yellow)" size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time Complexity</div>
                  <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--accent-yellow)', marginTop: '0.1rem' }}>{time_complexity || "O(n)"}</div>
                </div>
              </div>
              
              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0, 230, 118, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HardDrive color="var(--accent-green)" size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Space Complexity</div>
                  <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--accent-green)', marginTop: '0.1rem' }}>{space_complexity || "O(n)"}</div>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '2.5rem', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Info size={14} style={{ marginBottom: '-3px', marginRight: '5px' }} />
              Complexity is estimated based on common algorithm patterns.
            </div>
          </div>
          
        </div>

      </div>

    </div>
  )
}
