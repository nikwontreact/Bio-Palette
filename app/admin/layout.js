'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  User, 
  Briefcase, 
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Star,
  Keyboard,
  Moon,
  Sun
} from 'lucide-react';
import SessionProvider from '@/components/SessionProvider';
import { ThemeProvider } from '@/lib/theme-context';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { ThemeColorPicker } from './components/ThemeColorPicker';
import './admin-styles.css';

function AdminLayoutContent({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  useEffect(() => {
    setMounted(true);
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('portfolio-theme') === 'dark';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('portfolio-theme', newDarkMode ? 'dark' : 'light');
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const showKeyboardShortcuts = () => {
    // This will be handled by the hook
    const event = new KeyboardEvent('keydown', { key: '?' });
    window.dispatchEvent(event);
  };

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (mounted && status === 'unauthenticated' && !isLoginPage) {
      router.push('/admin/login');
    } else if (mounted && status === 'authenticated' && isLoginPage) {
      router.push('/admin');
    }
  }, [status, mounted, router, isLoginPage, pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-slate-200 dark:border-slate-700 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Hero', href: '/admin/hero', icon: Sparkles },
    { name: 'About', href: '/admin/about', icon: User },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Messages', href: '/admin/submissions', icon: MessageSquare },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen admin-panel" style={{ background: 'hsl(var(--background))' }}>
      {/* Top Bar - Desktop */}
      <header className="hidden lg:block fixed top-0 left-64 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              {pathname === '/admin' && 'Dashboard'}
              {pathname.includes('/hero') && 'Hero Section'}
              {pathname.includes('/about') && 'About Section'}
              {pathname.includes('/projects') && 'Projects'}
              {pathname.includes('/submissions') && 'Messages'}
              {pathname.includes('/testimonials') && 'Testimonials'}
              {pathname.includes('/settings') && 'Settings'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={showKeyboardShortcuts}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Keyboard Shortcuts (Press ?)"
            >
              <Keyboard className="w-4 h-4" />
              <span className="hidden xl:inline">Shortcuts</span>
            </button>
            
            <ThemeColorPicker />
            
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden xl:inline">{darkMode ? 'Light' : 'Dark'}</span>
            </button>

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg"
                style={{ background: `hsl(var(--primary))` }}
              >
                {session.user.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {session.user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
              style={{ background: `hsl(var(--primary))` }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={showKeyboardShortcuts}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
              title="Keyboard Shortcuts"
            >
              <Keyboard className="w-5 h-5" />
            </button>
            <ThemeColorPicker />
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 border-r z-50
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
      style={{
        background: darkMode 
          ? `hsl(var(--card))` 
          : `linear-gradient(180deg, hsl(var(--primary) / 0.03) 0%, hsl(var(--card)) 100%)`,
        borderColor: darkMode ? 'hsl(var(--border))' : `hsl(var(--primary) / 0.1)`
      }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b"
            style={{ borderColor: darkMode ? 'hsl(var(--border))' : `hsl(var(--primary) / 0.1)` }}
          >
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg"
                style={{ background: `hsl(var(--primary))` }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-150
                    ${active 
                      ? 'text-white shadow-lg' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }
                  `}
                  style={active ? { background: `hsl(var(--primary))` } : {}}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                  {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-3 border-t"
            style={{ borderColor: darkMode ? 'hsl(var(--border))' : `hsl(var(--primary) / 0.1)` }}
          >
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg"
                style={{ background: `hsl(var(--primary))` }}
              >
                {session.user.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen" style={{ background: 'hsl(var(--background))' }}>
        <div className="pt-16 lg:pt-16">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SessionProvider>
    </ThemeProvider>
  );
}
