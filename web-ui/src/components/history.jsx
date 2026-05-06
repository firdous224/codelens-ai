import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, Calendar, Code, ChevronRight, Bug, Activity, Trash2, Clock } from "lucide-react";
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
        const matchesSearch = item.result?.intent?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             item.language?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterLang === "All" || item.language === filterLang;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid rgba(0, 242, 254, 0.1)', borderTopColor: 'var(--neon-blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ color: 'var(--text-muted)' }}>Fetching your history...</p>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Analysis History</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Review and manage your previous code analyses.</p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '2rem',
                background: 'rgba(255,255,255,0.02)',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                        type="text" 
                        placeholder="Search by intent or language..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '3rem', background: 'var(--bg-dark)' }}
                    />
                </div>
                <div style={{ width: '200px', position: 'relative' }}>
                    <Filter size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <select 
                        value={filterLang}
                        onChange={(e) => setFilterLang(e.target.value)}
                        style={{ 
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            background: 'var(--bg-dark)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-main)',
                            borderRadius: '8px',
                            outline: 'none',
                            appearance: 'none'
                        }}
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredHistory.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>No history matches your search criteria.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    {filteredHistory.map((item) => (
                        <div key={item._id} className="card" style={{ 
                            padding: '1.5rem', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '1.25rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Score Tag */}
                            <div style={{ 
                                position: 'absolute', 
                                top: '1.5rem', 
                                right: '1.5rem',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '8px',
                                background: item.result?.score > 80 ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 75, 75, 0.1)',
                                border: `1px solid ${item.result?.score > 80 ? 'var(--accent-green)' : 'var(--accent-red)'}`,
                                color: item.result?.score > 80 ? 'var(--accent-green)' : 'var(--accent-red)',
                                fontWeight: '700',
                                fontSize: '0.9rem'
                            }}>
                                {item.result?.score}%
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '10px', 
                                    background: 'rgba(0, 242, 254, 0.1)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'var(--neon-blue)'
                                }}>
                                    <Code size={20} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{item.language || "Unknown"}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                                        <Clock size={12} /> {new Date(item.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <p style={{ 
                                fontSize: '0.9rem', 
                                color: 'var(--text-muted)', 
                                lineHeight: '1.5',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                minHeight: '2.8rem'
                            }}>
                                {item.result?.intent}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: item.result?.bugs?.length > 0 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                                    <Bug size={14} /> {item.result?.bugs?.length || 0} Bugs
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--neon-cyan)' }}>
                                    <Activity size={14} /> {item.result?.time_complexity || 'O(n)'}
                                </span>
                            </div>

                            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem' }}>
                                <button 
                                    className="btn-primary" 
                                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem' }}
                                    onClick={() => setSelectedReport(item)}
                                >
                                    View Full Report
                                </button>
                                <button 
                                    className="btn-secondary" 
                                    style={{ padding: '0.6rem', background: 'rgba(255, 75, 75, 0.05)', borderColor: 'rgba(255, 75, 75, 0.1)', color: 'var(--accent-red)' }}
                                    onClick={() => {
                                        // Delete logic could go here
                                        if (window.confirm("Are you sure you want to delete this analysis?")) {
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