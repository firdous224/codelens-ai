import { useState } from 'react'
import Hero from './components/Hero'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import Processing from './components/Processing'
import Results from './components/Results'
import History from './components/History'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [code, setCode] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)

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
    setAnalysisResult(null)
    navigateTo('home')
  }

  const handleAnalyze = (submittedCode) => {
    setCode(submittedCode)
    navigateTo('processing')
  }

  const handleProcessingComplete = (resultData) => {
    setAnalysisResult(resultData)
    navigateTo('results')
  }

  return (
    <>
      <header style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>

        {/* LOGO */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          onClick={() => navigateTo('home')}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-blue))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0b0f1a',
            fontWeight: 'bold'
          }}>
            CL
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
            CodeLens <span style={{ color: 'var(--neon-blue)' }}>AI</span>
          </h2>
        </div>

        {/* NAVBAR */}
        <nav>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

              <button
                className="btn-secondary"
                onClick={() => navigateTo('history')}
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                History
              </button>

              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Welcome, {user}
              </span>

              <button
                className="btn-secondary"
                onClick={handleLogout}
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                Logout
              </button>
            </div>
          ) : (
            currentPage !== 'login' && (
              <button
                className="btn-secondary"
                onClick={() => navigateTo('login')}
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                Sign In
              </button>
            )
          )}
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="page-wrapper">
        {currentPage === 'home' && <Hero onGetStarted={() => navigateTo('login')} />}
        {currentPage === 'login' && <Login onLogin={handleLogin} onNavigateToSignUp={() => navigateTo('signup')} />}
        {currentPage === 'signup' && <SignUp onSignUp={handleLogin} onNavigateToLogin={() => navigateTo('login')} />}

        {/* 🔥 FIXED DASHBOARD */}
        {currentPage === 'dashboard' && (
          <Dashboard
            user={user}
            onAnalyze={handleAnalyze}
            onNavigate={navigateTo}   // ✅ IMPORTANT FIX
          />
        )}

        {currentPage === 'processing' && <Processing code={code} user={user} onComplete={handleProcessingComplete} onBack={() => navigateTo('dashboard')} />}
        {currentPage === 'results' && <Results code={code} result={analysisResult} onBack={() => navigateTo('dashboard')} />}
        {currentPage === 'history' && <History user={user} />}
      </main>
    </>
  )
}

export default App