import { useEffect, useState } from "react";
import axios from "axios";
import { History as HistoryIcon, Bug, CheckCircle } from "lucide-react";

function History({ user }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setHistory([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        axios.get(`http://localhost:8000/history/${user}`)
            .then(res => {
                setHistory(res.data);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load history.");
                setHistory([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user]);

    return (
        <div className="container" style={{ padding: "2rem 0", flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <HistoryIcon size={28} color="var(--neon-blue)" />
                <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Analysis History</h1>
            </div>

            {loading ? (
                <p style={{ color: 'var(--text-muted)' }}>Loading history...</p>
            ) : error ? (
                <p style={{ color: 'var(--accent-red)' }}>{error}</p>
            ) : history.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No history found. Try analyzing some code first!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {history.map((item, i) => (
                        <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                    {new Date(item.created_at).toLocaleString()}
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: item.result?.score > 80 ? 'var(--accent-green)' : (item.result?.score > 60 ? '#f5a623' : 'var(--accent-red)') }}>
                                    Score: {item.result?.score}%
                                </div>
                            </div>
                            
                            <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
                                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                                    {item.code.length > 200 ? item.code.substring(0, 200) + '...' : item.code}
                                </pre>
                            </div>

                            {item.result?.bugs && item.result.bugs.length > 0 ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-red)', fontSize: '0.875rem' }}>
                                    <Bug size={16} /> Found {item.result.bugs.length} issues
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontSize: '0.875rem' }}>
                                    <CheckCircle size={16} /> No major issues
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default History;