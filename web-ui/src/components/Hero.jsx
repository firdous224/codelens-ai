import { ArrowRight, Code2, ShieldAlert, Sparkles } from 'lucide-react'

export default function Hero({ onGetStarted }) {
  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '4rem 2rem', textAlign: 'center', position: 'relative' }}>
      
      {/* Background glow effects */}
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '300px', height: '300px', background: 'var(--neon-blue)', filter: 'blur(150px)', opacity: 0.1, zIndex: -1, borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '300px', height: '300px', background: 'var(--neon-cyan)', filter: 'blur(150px)', opacity: 0.1, zIndex: -1, borderRadius: '50%' }}></div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.2)', padding: '0.5rem 1rem', borderRadius: '2rem', marginBottom: '2rem' }}>
        <Sparkles size={16} color="var(--neon-blue)" />
        <span style={{ color: 'var(--neon-blue)', fontSize: '0.875rem', fontWeight: '500' }}>CodeLens AI v2.0 is live</span>
      </div>

      <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: '800', letterSpacing: '-2px', marginBottom: '1.5rem', maxWidth: '900px' }}>
        Decode Code. <br/>
        <span className="gradient-text">Reveal Intent.</span>
      </h1>
      
      <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem' }}>
        AI that analyzes messy or undocumented code and finds logical gaps. Upload, analyze, and instantly understand any codebase.
      </p>

      <button className="btn-primary" onClick={onGetStarted} style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
        Get Started <ArrowRight size={20} />
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '900px', marginTop: '5rem', textAlign: 'left' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'rgba(0, 242, 254, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Code2 color="var(--neon-blue)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Intent Extraction</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Instantly understand what any function or block of code is trying to achieve.</p>
        </div>
        
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'rgba(255, 75, 75, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <ShieldAlert color="var(--accent-red)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Gap Detection</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Identify hidden bugs, security vulnerabilities, and inefficient logic automatically.</p>
        </div>
        
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ background: 'rgba(79, 172, 254, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Sparkles color="var(--neon-cyan)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Smart Suggestions</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Get actionable alternatives and refactoring advice to improve code quality.</p>
        </div>
      </div>
    </div>
  )
}
