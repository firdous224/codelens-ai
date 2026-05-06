import { useState } from 'react'
import { LogIn } from 'lucide-react'
import axios from 'axios'

export default function Login({ onLogin, onNavigateToSignUp }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username.trim()) return

    setLoading(true)
    setError(null)

    try {
      console.log("Sending login request:", { username, password })

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          username: username.trim(),
          password: password
        }
      )

      console.log("LOGIN RESPONSE:", response.data)

      // ✅ Handle both backend formats
      if (
        response.data.status === "success" ||
        response.data.msg === "Success"
      ) {
        onLogin(username.trim())
      } else {
        setError(
          response.data.message ||
          response.data.msg ||
          "Login failed"
        )
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err)

      if (err.response) {
        setError(
          err.response.data?.detail ||
          err.response.data?.message ||
          "Server error"
        )
      } else {
        setError("Cannot connect to backend")
      }
    }

    setLoading(false)
  }

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '3rem 2rem'
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(0, 242, 254, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <LogIn size={28} color="var(--neon-blue)" />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>
            Welcome Back
          </h2>

          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Enter your details to access your workspace.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* USERNAME */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: 'var(--text-muted)'
              }}
            >
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ background: 'var(--bg-dark)' }}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: 'var(--text-muted)'
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ background: 'var(--bg-dark)' }}
            />
          </div>

          {/* ERROR */}
          {error && (
            <p
              style={{
                color: 'var(--accent-red)',
                fontSize: '0.875rem',
                textAlign: 'center'
              }}
            >
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              marginTop: '1rem',
              width: '100%',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            marginTop: '2rem'
          }}
        >
          Don't have an account?{" "}
          <span
            style={{ color: 'var(--neon-cyan)', cursor: 'pointer' }}
            onClick={onNavigateToSignUp}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}