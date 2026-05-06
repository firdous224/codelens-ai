import { AlertTriangle, Plus, Minus, Info } from 'lucide-react'

export default function Comparisons({ result }) {
  if (!result) {
    return <p>No data to compare.</p>
  }

  const { actual_code, intended_code, gap_summary } = result;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Code vs Intended Logic</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Side-by-side comparison of actual implementation vs intended logic.
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={14} color="var(--accent-green)" />
          <span>Match</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={14} color="#f5a623" />
          <span>Partial Match</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Minus size={14} color="var(--accent-red)" />
          <span>Mismatch</span>
        </div>
      </div>

      {/* Code Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Actual Code */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '500' }}>Actual Code <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>(Source)</span></span>
            <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Python</span>
          </div>
          <div style={{ padding: '1rem', overflowX: 'auto' }}>
            <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              {actual_code || "No actual code provided."}
            </pre>
          </div>
        </div>

        {/* Intended Logic */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', borderColor: 'rgba(0, 242, 254, 0.3)' }}>
          <div style={{ background: 'rgba(0, 242, 254, 0.05)', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '500', color: 'var(--neon-blue)' }}>Intended Logic <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>(AI Inferred)</span></span>
            <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Python</span>
          </div>
          <div style={{ padding: '1rem', overflowX: 'auto' }}>
            <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--accent-green)' }}>
              {intended_code || "No intended code generated."}
            </pre>
          </div>
        </div>

      </div>

      {/* Gap Summary */}
      {gap_summary && gap_summary.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Gap Summary</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {gap_summary.map((gap, idx) => (
              <div key={idx} style={{ 
                border: `1px solid ${gap.color}40`, 
                background: `${gap.color}10`, 
                padding: '0.75rem 1rem', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                minWidth: '200px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: gap.color }}>
                  <Info size={14} />
                  <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{gap.issue}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: gap.color, opacity: 0.8 }}>{gap.impact} Impact</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
