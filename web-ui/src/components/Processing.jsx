import { useEffect, useState } from 'react'
import { BrainCircuit } from 'lucide-react'

export default function Processing({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 1
      })
    }, 30) // simulate ~3 seconds of processing

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '60vh' }}>
      
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, border: '4px solid rgba(0, 242, 254, 0.1)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', inset: 0, border: '4px solid var(--neon-cyan)', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1.5s linear infinite' }}></div>
        <div style={{ animation: 'pulse-glow 2s infinite', background: 'rgba(0, 242, 254, 0.1)', borderRadius: '50%', padding: '1rem' }}>
          <BrainCircuit size={48} color="var(--neon-blue)" />
        </div>
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Analyzing code...</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Decoding logic and extracting intent</p>

      <div style={{ width: '100%', maxWidth: '400px', background: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          width: `${progress}%`, 
          background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-blue))',
          boxShadow: '0 0 10px rgba(0, 242, 254, 0.5)',
          transition: 'width 0.1s ease'
        }}></div>
      </div>
      
      <div style={{ marginTop: '1rem', color: 'var(--neon-cyan)', fontWeight: 'bold', fontSize: '1.25rem' }}>
        {progress}%
      </div>
      
    </div>
  )
}
