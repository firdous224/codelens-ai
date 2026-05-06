import { LayoutDashboard, History, Settings, ChevronLeft, ChevronRight, Brain, BarChart3, Terminal } from 'lucide-react'
import { useState } from 'react'

export default function SidebarLayout({ children, activeTab, onNavigate, hasResults }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'Analyzer', icon: <Terminal size={20} /> },
    { id: 'history', label: 'History', icon: <History size={20} /> },
  ]

  const resultItems = hasResults ? [
    { id: 'results', label: 'Results', icon: <BarChart3 size={20} /> },
    { id: 'explanations', label: 'Explanations', icon: <Brain size={20} /> },
  ] : []

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 80px)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: isCollapsed ? '80px' : '260px', 
        background: 'rgba(11, 15, 26, 0.4)',
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        zIndex: 10
      }}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            position: 'absolute',
            right: '-12px',
            top: '20px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'var(--neon-blue)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#05080f',
            zIndex: 20,
            boxShadow: '0 0 10px rgba(0, 242, 254, 0.4)'
          }}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div style={{ padding: '2rem 1rem', flex: 1, overflowX: 'hidden' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ 
              fontSize: '0.7rem', 
              fontWeight: '700', 
              color: 'rgba(255,255,255,0.2)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em',
              paddingLeft: '1rem',
              marginBottom: '1rem',
              opacity: isCollapsed ? 0 : 1,
              transition: 'opacity 0.2s'
            }}>
              Main Menu
            </p>
            {menuItems.map(item => (
              <SidebarItem 
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                collapsed={isCollapsed}
                onClick={() => onNavigate(item.id)}
              />
            ))}
          </div>

          {hasResults && (
            <div>
              <p style={{ 
                fontSize: '0.7rem', 
                fontWeight: '700', 
                color: 'rgba(255,255,255,0.2)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                paddingLeft: '1rem',
                marginBottom: '1rem',
                opacity: isCollapsed ? 0 : 1,
                transition: 'opacity 0.2s'
              }}>
                Analysis
              </p>
              {resultItems.map(item => (
                <SidebarItem 
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={activeTab === item.id}
                  collapsed={isCollapsed}
                  onClick={() => onNavigate(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <SidebarItem 
            icon={<Settings size={20} />}
            label="Settings"
            collapsed={isCollapsed}
            onClick={() => {}}
          />
        </div>
      </aside>

      {/* Main Area */}
      <main style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </main>
    </div>
  )
}

function SidebarItem({ icon, label, active, collapsed, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.85rem 1rem',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        marginBottom: '0.5rem',
        color: active ? 'var(--neon-blue)' : 'var(--text-muted)',
        background: active ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
        border: active ? '1px solid rgba(0, 242, 254, 0.2)' : '1px solid transparent',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }}
      className="sidebar-item"
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        transition: 'transform 0.3s'
      }}>
        {icon}
      </div>
      {!collapsed && <span style={{ fontWeight: active ? '700' : '500', fontSize: '0.95rem' }}>{label}</span>}
      {active && !collapsed && (
        <div style={{ 
          marginLeft: 'auto', 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          background: 'var(--neon-blue)',
          boxShadow: '0 0 10px var(--neon-blue)'
        }}></div>
      )}
    </div>
  )
}
