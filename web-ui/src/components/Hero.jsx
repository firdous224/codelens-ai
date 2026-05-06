import { Zap, Shield, Sparkles, MessageSquare, ArrowRight } from 'lucide-react'

export default function Hero({ onGetStarted }) {
  return (
    <div style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      padding: '6rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Background Glows */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, transparent 70%)',
        zIndex: -1,
        animation: 'pulse-glow 10s infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '30vw',
        height: '30vw',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        zIndex: -1,
        animation: 'pulse-glow 15s infinite'
      }}></div>

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: -2,
        maskImage: 'radial-gradient(circle at center, black, transparent)'
      }}></div>

      <div className="container" style={{ textAlign: 'center', maxWidth: '1000px' }}>
        <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '100px', border: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--neon-blue)' }}>NEW</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Advanced History Tracking & Language Detection</span>
        </div>

        <h1 className="animate-fade-in" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1.1', marginBottom: '1.5rem' }}>
          Decode Code. <br />
          <span className="gradient-text" style={{ filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.3))' }}>Reveal Intent.</span>
        </h1>

        <p className="animate-fade-in" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
          CodeLens AI transforms complex source code into human-readable intent, detects hidden vulnerabilities, and provides optimized alternatives instantly.
        </p>

        <div className="animate-fade-in" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '6rem' }}>
          <button 
            className="btn-primary" 
            onClick={onGetStarted}
            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
          >
            Start Analyzing <ArrowRight size={20} />
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '2rem',
          textAlign: 'left'
        }}>
          <FeatureCard 
            icon={<Sparkles color="var(--neon-blue)" />}
            title="Intent Extraction"
            desc="Understand the 'why' behind the code, not just the 'what', with advanced reverse reasoning."
          />
          <FeatureCard 
            icon={<Shield color="var(--accent-green)" />}
            title="Bug vs Intent"
            desc="Identify where the implementation deviates from the intended logic to find deep-seated bugs."
          />
          <FeatureCard 
            icon={<Zap color="#f5a623" />}
            title="AI Suggestions"
            desc="Get production-ready code optimizations and more efficient implementation alternatives."
          />
          <FeatureCard 
            icon={<MessageSquare color="var(--neon-purple)" />}
            title="Human Explanation"
            desc="Break down complex logic into step-by-step simple explanations for your entire team."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: '12px', 
        background: 'rgba(255,255,255,0.03)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '1.5rem',
        border: '1px solid var(--glass-border)'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{desc}</p>
    </div>
  )
}
