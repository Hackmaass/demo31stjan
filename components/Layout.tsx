import React from 'react';
import { LayoutDashboard, Heart, MessageSquare, LogOut, Activity } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Summary', path: '/' },
    { icon: Activity, label: 'Vitals', path: '/vitals' },
    { icon: MessageSquare, label: 'Assistant', path: '/assistant' },
  ];

  return (
    <div className="flex h-screen bg-[#F5F5F7] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200/50 pt-8 pb-6 px-4 justify-between shadow-sm z-20">
        <div>
          <div className="flex items-center gap-3 px-4 mb-10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
              <Heart size={16} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Aura</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200
                    ${isActive ? 'bg-[#F2F2F7] text-[#007AFF]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                  `}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto scroll-smooth">
        <div className="max-w-5xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 pb-safe pt-2 px-6 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-[#007AFF]' : 'text-gray-400'}`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={onLogout}
          className="flex flex-col items-center gap-1 p-2 text-gray-400"
        >
           <LogOut size={24} strokeWidth={2} />
           <span className="text-[10px] font-medium">Out</span>
        </button>
      </nav>
    </div>
  );
};
