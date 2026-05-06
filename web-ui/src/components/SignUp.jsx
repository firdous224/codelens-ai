import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import axios from 'axios'

export default function SignUp({ onSignUp, onNavigateToLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username.trim()) {
      setLoading(true)
      setError(null)
      try {
        console.log("Sending POST /register with:", { username: username.trim(), password })
        const response = await axios.post('http://localhost:8000/register', {
          username: username.trim(),
          password: password
        })
        console.log("Register response:", response.data)
        
        if (response.data.status === "success") {
          onSignUp(response.data.username)
        } else {
          setError(response.data.message || 'Registration failed')
        }
      } catch (err) {
        console.error("Signup error:", err)
        setError('Sign up failed. Please check your connection and try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(0, 242, 254, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <UserPlus size={28} color="var(--neon-cyan)" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Create an Account</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Join CodeLens AI to analyze your code.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Username</label>
            <input 
              type="text" 
              placeholder="Create a username" 
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
              placeholder="Create a password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ background: 'var(--bg-dark)' }}
            />
          </div>

          {error && <p style={{ color: 'var(--accent-red)', fontSize: '0.875rem', textAlign: 'center' }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2rem' }}>
          Already have an account? <span style={{ color: 'var(--neon-blue)', cursor: 'pointer' }} onClick={onNavigateToLogin}>Sign in</span>
        </p>
      </div>
    </div>
  )
}
