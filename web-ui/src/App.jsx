import { useState } from 'react'
import Hero from './components/Hero'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Processing from './components/Processing'
import Results from './components/Results'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [code, setCode] = useState('')

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const handleLogin = (username) => {
    setUser(username)
    navigateTo('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setCode('')
    navigateTo('home')
  }

  const handleAnalyze = (submittedCode) => {
    setCode(submittedCode)
    navigateTo('processing')
  }

  const handleProcessingComplete = () => {
    navigateTo('results')
  }

  return (
    <>
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          onClick={() => navigateTo('home')}
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0b0f1a', fontWeight: 'bold' }}>
            CL
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
            CodeLens <span style={{ color: 'var(--neon-blue)' }}>AI</span>
          </h2>
        </div>
        
        <nav>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome, {user}</span>
              <button className="btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
            </div>
          ) : (
            currentPage !== 'login' && (
              <button className="btn-secondary" onClick={() => navigateTo('login')} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Sign In</button>
            )
          )}
        </nav>
      </header>

      <main className="page-wrapper">
        {currentPage === 'home' && <Hero onGetStarted={() => navigateTo('login')} />}
        {currentPage === 'login' && <Login onLogin={handleLogin} />}
        {currentPage === 'dashboard' && <Dashboard user={user} onAnalyze={handleAnalyze} />}
        {currentPage === 'processing' && <Processing onComplete={handleProcessingComplete} />}
        {currentPage === 'results' && <Results code={code} onBack={() => navigateTo('dashboard')} />}
      </main>
    </>
  )
}

export default App
