import { ChevronLeft, ChevronRight, LayoutDashboard, LogOut, Map, Settings, Sparkles, TrendingUp, X } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';

const navItems = [
        {
            key:"nav-dashboard",
            label:"Dashboard",
            icon:LayoutDashboard,
            href:"/dashboard"
        },
        {
            key:"nav-roadmaps",
            label:"My Roadmaps",
            icon:Map,
            href:"/dashboard/my-roadmaps"
        },
        {
            key:"nav-create",
            label:"Create Roadmap",
            icon:Sparkles,
            href:"/dashboard/create-roadmap"
        },
        {
            key:"nav-progress",
            label:"Progress",
            icon:TrendingUp,
            href:"/dashboard/progress"
        },
        {
            key:"nav-settings",
            label:"Settings",
            icon:Settings,
            href:"/dashboard/settings"
        }
    ]


const Sidebar = ({collapsed, onToggle, mobileOpen, onMobileClose}) => {

 const location = useLocation();
const pathname = location.pathname;

 const sidebarWidth = collapsed ? "80px" : "260px"
    

  return (
    <>
        <aside  className="hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ease-in-out"
        style={{
          width: sidebarWidth,
          background: 'rgba(11, 15, 25, 0.95)',
          borderRight: '1px solid rgba(45, 55, 72, 0.5)',
          backdropFilter: 'blur(12px)',
        }}>

            {/* logo  */}

     <div
          className="flex items-center h-16 px-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(45, 55, 72, 0.4)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0">
              😁
            </div>
            {!collapsed && (
              <span
                className="font-bold text-lg tracking-tight transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #9F67FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                SkillOrbit
              </span>
            )}
          </div>
        </div>


            {/* nav items  */}

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {!collapsed && (
            <p className="text-xs font-600 uppercase tracking-widest mb-3 px-3" style={{ color: '#4B5563', letterSpacing: '0.08em' }}>
              Navigation
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link to={item.href} key={item.key}>
                <div
                  className={`nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
                  style={{ padding: collapsed ? '10px 0' : '10px 12px' }}
                >
                  <Icon
                    size={20}
                    style={{ color: isActive ? '#9F67FF' : '#9CA3AF', flexShrink: 0 }}
                  />
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                  {collapsed && (
                    <span className="sidebar-tooltip">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>


        {/* bottom section  */}

         <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(45, 55, 72, 0.4)', paddingTop: '12px' }}>
          {/* Logout */}
          <div
            className={`nav-item ${collapsed ? 'justify-center px-0' : ''}`}
            style={{ padding: collapsed ? '10px 0' : '10px 12px', color: '#EF4444' }}
          >
            <LogOut size={20} style={{ flexShrink: 0, color: '#EF4444' }} />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
            {collapsed && <span className="sidebar-tooltip">Logout</span>}
          </div>

          {/* Toggle button */}
          <button
            onClick={onToggle}
            className="mt-2 w-full flex items-center justify-center py-2 rounded-lg transition-all duration-200"
            style={{
              background: 'rgba(45, 55, 72, 0.3)',
              border: '1px solid rgba(45, 55, 72, 0.5)',
              color: '#9CA3AF',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget).style.background = 'rgba(124, 58, 237, 0.1)';
              (e.currentTarget).style.color = '#9F67FF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.background = 'rgba(45, 55, 72, 0.3)';
              (e.currentTarget).style.color = '#9CA3AF';
            }}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        </aside>


        {/* mobile sidebar drawer  */}

        <aside  className="fixed inset-y-0 left-0 z-50 flex flex-col lg:hidden transition-transform duration-300 ease-in-out"
        style={{
          width: '260px',
          background: 'rgba(11, 15, 25, 0.98)',
          borderRight: '1px solid rgba(45, 55, 72, 0.5)',
          backdropFilter: 'blur(20px)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}>


  <div
          className="flex items-center justify-between h-16 px-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(45, 55, 72, 0.4)' }}
        >
          <div className="flex items-center gap-3">
            😁
            <span
              className="font-bold text-lg tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #9F67FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SkillOrbit
            </span>
          </div>
          <button
            onClick={onMobileClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#9CA3AF' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link to={item.href} key={`mobile-${item.key}`} onClick={onMobileClose}>
                <div className={`nav-item ${isActive ? 'active' : ''}`}>
                  <Icon size={20} style={{ color: isActive ? '#9F67FF' : '#9CA3AF', flexShrink: 0 }} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-6" style={{ borderTop: '1px solid rgba(45, 55, 72, 0.4)', paddingTop: '12px' }}>
          <div className="nav-item" style={{ color: '#EF4444' }}>
            <LogOut size={20} style={{ color: '#EF4444' }} />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </div>

        </aside>
    
    </>
  )
}

export default Sidebar