import { useState } from 'react'
import { LogIn } from 'lucide-react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username)
    }
  }

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(0, 242, 254, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <LogIn size={28} color="var(--neon-blue)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Enter your details to access your workspace.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Username</label>
            <input 
              type="text" 
              placeholder="e.g. dev_ninja" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ background: 'var(--bg-dark)' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ background: 'var(--bg-dark)' }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            Sign In
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2rem' }}>
          Don't have an account? <span style={{ color: 'var(--neon-cyan)', cursor: 'pointer' }}>Sign up</span>
        </p>
      </div>
    </div>
  )
}
