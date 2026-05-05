import { useState } from 'react'
import { FileCode2, Upload, Play, History, Settings } from 'lucide-react'

export default function Dashboard({ user, onAnalyze }) {
  const [code, setCode] = useState('')

  const handleAnalyzeClick = () => {
    if (code.trim()) {
      onAnalyze(code)
    }
  }

  return (
    <div className="container" style={{ display: 'flex', flex: 1, gap: '2rem', padding: '2rem 0' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '1rem', paddingLeft: '1rem' }}>Menu</h3>
        
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--neon-blue)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', textAlign: 'left' }}>
          <FileCode2 size={18} /> Analyzer
        </button>
        
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', color: 'var(--text-muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
          <History size={18} /> History
        </button>
        
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', color: 'var(--text-muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
          <Settings size={18} /> Settings
        </button>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Code Analyzer</h1>
            <p style={{ color: 'var(--text-muted)' }}>Paste your code or upload a file to analyze intent and find bugs.</p>
          </div>
        </div>

        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
            <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)' }}>
              <FileCode2 size={16} /> Paste Code
            </button>
            <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
              <Upload size={16} /> Upload File
            </button>
          </div>
          
          <textarea 
            style={{ flex: 1, minHeight: '300px', resize: 'none', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5', padding: '1rem', background: 'var(--bg-dark)', border: 'none' }}
            placeholder="// Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button 
            className="btn-primary" 
            onClick={handleAnalyzeClick}
            disabled={!code.trim()}
            style={{ opacity: code.trim() ? 1 : 0.5, cursor: code.trim() ? 'pointer' : 'not-allowed' }}
          >
            <Play size={18} fill="currentColor" /> Analyze Code
          </button>
        </div>
      </div>
    </div>
  )
}
