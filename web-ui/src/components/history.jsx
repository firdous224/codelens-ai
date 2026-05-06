import { useEffect, useState } from "react";
import axios from "axios";

export default function History({ user }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        console.log("Fetching history for:", user);

        axios
            .get(`http://127.0.0.1:8000/history/${user}`)
            .then((res) => {
                console.log("HISTORY DATA:", res.data);
                setHistory(res.data);
            })
            .catch((err) => {
                console.error("History error:", err);
                setHistory([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user]);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>Analysis History</h1>

            {loading ? (
                <p>Loading history...</p>
            ) : history.length === 0 ? (
                <p>No history found</p>
            ) : (
                history.map((item, i) => (
                    <div
                        className="card"
                        key={i}
                        style={{
                            marginBottom: "1rem",
                            padding: "1.5rem",
                        }}
                    >
                        <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1rem', fontSize: '0.875rem' }}>{item.code}</pre>
                        <p style={{ color: 'var(--text-muted)' }}><b style={{ color: 'var(--text-main)' }}>Score:</b> {item.result?.score}%</p>
                    </div>
                ))
            )}
        </div>
    );
}