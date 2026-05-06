import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, Code, Bug, Activity, Trash2, Clock, ExternalLink, AlertCircle } from "lucide-react";
import ReportModal from "./ReportModal";

export default function History({ user }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLang, setFilterLang] = useState("All");
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        if (!user) return;
        fetchHistory();
    }, [user]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://127.0.0.1:8000/history/${user}`);
            setHistory(res.data);
        } catch (err) {
            console.error("History error:", err);
            setHistory([]);
        } finally {
            setLoading(false);
        }
    };

    const languages = ["All", ...new Set(history.map(item => item.language || "Unknown"))];

    const filteredHistory = history.filter(item => {
        const intent = item.result?.intent || "";
        const lang = item.language || "";
        const matchesSearch = intent.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             lang.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterLang === "All" || item.language === filterLang;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="flex-center" style={{ flex: 1, flexDirection: 'column', gap: '1.5rem' }}>
                <div className="spinner"></div>
                <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Accessing encrypted records...</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Analysis History</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Review and manage your previous cryptographic code decodes.</p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="glass" style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                marginBottom: '3rem',
                padding: '1.25rem',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)'
            }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)' }} />
                    <input 
                        type="text" 
                        placeholder="Search by intent, language, or keyword..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', paddingLeft: '3.5rem', height: '50px', fontSize: '1rem' }}
                    />
                </div>
                <div style={{ width: '220px', position: 'relative' }}>
                    <Filter size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)' }} />
                    <select 
                        value={filterLang}
                        onChange={(e) => setFilterLang(e.target.value)}
                        style={{ 
                            width: '100%',
                            height: '50px',
                            padding: '0 1.25rem 0 3.5rem',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-main)',
                            borderRadius: '12px',
                            outline: 'none',
                            appearance: 'none',
                            fontSize: '0.95rem',
                            fontWeight: '600'
                        }}
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredHistory.length === 0 ? (
                <div className="card flex-center" style={{ padding: '6rem 2rem', flexDirection: 'column', gap: '1rem' }}>
                    <AlertCircle size={32} color="rgba(255,255,255,0.1)" />
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>No records found in your neural history.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {filteredHistory.map((item) => (
                        <div key={item._id} className="card" style={{ 
                            padding: '1.5rem', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '1.25rem',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ 
                                        width: '36px', 
                                        height: '36px', 
                                        borderRadius: '10px', 
                                        background: 'rgba(0, 242, 254, 0.06)', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        color: 'var(--neon-blue)',
                                        border: '1px solid rgba(0, 242, 254, 0.1)'
                                    }}>
                                        <Code size={18} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{item.language || "Unknown"}</h3>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(item.created_at).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: item.result?.score > 80 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                    {item.result?.score}%
                                </div>
                            </div>

                            <p style={{ 
                                fontSize: '0.9rem', 
                                color: 'var(--text-muted)', 
                                lineHeight: '1.6',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {item.result?.intent}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', fontWeight: '600' }}>
                                <span style={{ color: item.result?.bugs?.length > 0 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                                    {item.result?.bugs?.length || 0} Issues
                                </span>
                                <span style={{ color: 'var(--neon-cyan)' }}>
                                    {item.result?.time_complexity || 'O(n)'}
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button 
                                    className="btn-primary" 
                                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem' }}
                                    onClick={() => setSelectedReport(item)}
                                >
                                    Full Report <ExternalLink size={14} />
                                </button>
                                <button 
                                    className="btn-secondary" 
                                    style={{ width: '40px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-red)' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm("Delete record?")) {
                                            // Handle delete
                                        }
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedReport && (
                <ReportModal 
                    report={selectedReport} 
                    onClose={() => setSelectedReport(null)} 
                />
            )}
        </div>
    );
}