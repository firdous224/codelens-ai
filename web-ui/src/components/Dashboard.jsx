import { FileCode2, Upload, Play } from 'lucide-react'

export default function Dashboard({ user, onAnalyze, code, setCode }) {
  const handleAnalyzeClick = () => {
    if (code?.trim()) {
      onAnalyze(code)
    }
  }

  const detectLanguage = (code) => {
    if (!code) return null;
    const patterns = {
      "Python": [/def \w+\(/, /import \w+/, /print\(/],
      "JavaScript": [/const \w+ =/, /let \w+ =/, /console\.log\(/, /function \w+\(/, /=>/],
      "Java": [/public class \w+/, /public static void main/],
      "C++": [/#include <iostream>/, /int main\(\)/],
      "C": [/#include <stdio\.h>/, /printf\(/],
      "Go": [/package main/, /func main\(\)/],
      "Rust": [/fn main\(\)/, /println!/],
      "PHP": [/<\?php/, /echo /]
    };

    let scores = {};
    for (const [lang, regexes] of Object.entries(patterns)) {
      scores[lang] = regexes.reduce((acc, regex) => acc + (regex.test(code) ? 1 : 0), 0);
    }

    const bestMatch = Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a);
    return bestMatch[1] > 0 ? bestMatch[0] : "Unknown";
  };

  const detectedLang = detectLanguage(code);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Code Analyzer</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Paste your code or upload a file to analyze intent and find bugs.
          </p>
        </div>
        {detectedLang && code?.trim() && (
          <div style={{ 
            padding: '0.4rem 0.8rem', 
            background: 'rgba(0, 242, 254, 0.1)', 
            border: '1px solid var(--neon-blue)', 
            borderRadius: '20px', 
            color: 'var(--neon-blue)',
            fontSize: '0.8rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-blue)', boxShadow: '0 0 5px var(--neon-blue)' }}></div>
            Detected: {detectedLang}
          </div>
        )}
      </div>

      {/* Code Input */}
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
          style={{ flex: 1, minHeight: '300px', resize: 'none', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5', padding: '1rem', background: 'var(--bg-dark)', border: 'none', color: 'var(--text-main)', outline: 'none' }}
          placeholder="// Paste your code here..."
          value={code || ''}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* Analyze Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button
          className="btn-primary"
          onClick={handleAnalyzeClick}
          disabled={!code?.trim()}
          style={{ opacity: code?.trim() ? 1 : 0.5, cursor: code?.trim() ? 'pointer' : 'not-allowed' }}
        >
          <Play size={18} fill="currentColor" /> Analyze Code
        </button>
      </div>
    </>
  )
}