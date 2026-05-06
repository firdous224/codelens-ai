import { Play, Terminal, Info } from 'lucide-react'

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
    <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Neural Analyzer</h1>
        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={16} /> Paste your source code below to extract logical intent and find vulnerabilities.
        </p>
      </div>

      <div className="card" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '0', 
        overflow: 'hidden',
        background: '#0b0f1a',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)'
      }}>
        {/* Editor Header */}
        <div style={{ 
          padding: '1rem 1.5rem', 
          background: 'rgba(255,255,255,0.02)', 
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={14} /> main.script
            </div>
          </div>

          {detectedLang && code?.trim() && (
            <div style={{ 
              padding: '0.3rem 0.8rem', 
              background: 'rgba(0, 242, 254, 0.1)', 
              border: '1px solid rgba(0, 242, 254, 0.3)', 
              borderRadius: '6px', 
              color: 'var(--neon-blue)',
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.05em'
            }}>
              {detectedLang.toUpperCase()}
            </div>
          )}
        </div>

        {/* Editor Content */}
        <textarea
          style={{ 
            flex: 1, 
            resize: 'none', 
            fontFamily: '"Fira Code", monospace', 
            fontSize: '1rem', 
            lineHeight: '1.7', 
            padding: '2rem', 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-main)', 
            outline: 'none',
            caretColor: 'var(--neon-blue)',
            minHeight: '400px'
          }}
          placeholder="// Paste your code here for deep neural analysis..."
          value={code || ''}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* Footer / Analyze Button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className="btn-primary"
          onClick={handleAnalyzeClick}
          disabled={!code?.trim()}
          style={{ 
            padding: '1.2rem 4rem', 
            fontSize: '1.1rem',
            opacity: code?.trim() ? 1 : 0.5,
            cursor: code?.trim() ? 'pointer' : 'not-allowed',
            minWidth: '250px'
          }}
        >
          <Play size={20} fill="currentColor" /> Start Neural Analysis
        </button>
      </div>
    </div>
  )
}