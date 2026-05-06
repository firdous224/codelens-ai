import { Bot, Clock, HardDrive, Info } from 'lucide-react'

export default function Explanations({ result }) {
  if (!result) {
    return <p>No explanation available.</p>
  }

  const { explanation, step_by_step_explanation, time_complexity, space_complexity } = result;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Human Readable Explanation</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          AI explains the code in simple, easy to understand language.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Step-by-Step */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            What the code is trying to do
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {step_by_step_explanation ? step_by_step_explanation.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'var(--neon-blue)', 
                  color: '#0b0f1a', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}>
                  {idx + 1}
                </div>
                <div style={{ paddingTop: '0.2rem' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{step.title}</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)' }}>No step-by-step explanation generated.</p>
            )}
          </div>
        </div>

        {/* Right Column: Summary & Complexity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ background: 'rgba(0, 242, 254, 0.05)', borderColor: 'rgba(0, 242, 254, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Bot color="var(--neon-blue)" size={24} />
              <h3 style={{ fontSize: '1.2rem' }}>In Simple Words</h3>
            </div>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {explanation || "Code logic summary not available."}
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Time & Space Complexity</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock color="#f5a623" size={20} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Time Complexity</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#f5a623' }}>{time_complexity || "Unknown"}</div>
                </div>
              </div>
              
              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <HardDrive color="var(--accent-green)" size={20} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Space Complexity</div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--accent-green)' }}>{space_complexity || "Unknown"}</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

      </div>

    </div>
  )
}
