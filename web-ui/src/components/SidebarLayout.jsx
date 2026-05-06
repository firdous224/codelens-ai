import { FileCode2, History, Settings, Upload, LayoutDashboard, SplitSquareHorizontal, MessageSquare } from 'lucide-react'

export default function SidebarLayout({ activeTab, onNavigate, children, hasResults }) {
  const getButtonStyle = (tabName) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    background: activeTab === tabName ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
    color: activeTab === tabName ? 'var(--neon-blue)' : 'var(--text-muted)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: activeTab === tabName ? '500' : 'normal',
    textAlign: 'left'
  });

  return (
    <div className="container" style={{ display: 'flex', flex: 1, gap: '2rem', padding: '2rem 0' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '1rem', paddingLeft: '1rem' }}>
          Menu
        </h3>

        <button onClick={() => onNavigate('dashboard')} style={getButtonStyle('dashboard')}>
          <Upload size={18} /> Upload Code
        </button>

        {hasResults && (
          <>
            <button onClick={() => onNavigate('results')} style={getButtonStyle('results')}>
              <LayoutDashboard size={18} /> Results
            </button>
            <button onClick={() => onNavigate('comparisons')} style={getButtonStyle('comparisons')}>
              <SplitSquareHorizontal size={18} /> Comparisons
            </button>
            <button onClick={() => onNavigate('explanations')} style={getButtonStyle('explanations')}>
              <MessageSquare size={18} /> Explanations
            </button>
          </>
        )}

        <button onClick={() => onNavigate('history')} style={getButtonStyle('history')}>
          <History size={18} /> History
        </button>

        <button style={getButtonStyle('settings')}>
          <Settings size={18} /> Settings
        </button>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}
