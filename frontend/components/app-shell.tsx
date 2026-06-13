"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, BookOpen, Brain, Home, Library, Settings, 
  Sun, Moon, PanelLeftClose, PanelLeft, Search, Bell, 
  ChevronDown, User, LogOut, Check, Sparkles, Flame, Plus
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/command-palette";
import { useFlashcards } from "@/store/use-flashcards";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/library", label: "Library", icon: Library },
  { href: "/editor", label: "Editor", icon: BookOpen },
  { href: "/study", label: "Study", icon: Brain },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const cards = useFlashcards((state) => state.cards);

  // States
  const [dark, setDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Simulated notifications
  const [notifications, setNotifications] = useState([
    { id: "notif-1", text: "New: Engineering Sprint deck is ready.", time: "10m ago", read: false },
    { id: "notif-2", text: "You completed your daily study target!", time: "2h ago", read: false },
    { id: "notif-3", text: "High accuracy streak: 8 days active.", time: "1d ago", read: true }
  ]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  // Handle Hydration & Persistent state
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);

    const savedSidebar = localStorage.getItem("sidebar-collapsed");
    if (savedSidebar === "true") {
      setIsCollapsed(true);
    }
  }, []);

  // Keyboard shortcut listener for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextDark);
  };

  const toggleSidebar = () => {
    const nextCollapsed = !isCollapsed;
    setIsCollapsed(nextCollapsed);
    localStorage.setItem("sidebar-collapsed", String(nextCollapsed));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleReadNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  // Close menus on click outside handlers could go here, but simple React overlays are fast and functional
  const navItems = useMemo(
    () =>
      nav.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            title={isCollapsed ? item.label : undefined}
            className={cn(
              "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground",
              active && "bg-primary text-background font-semibold hover:bg-primary/90 hover:text-background",
              isCollapsed && "justify-center px-2"
            )}
          >
            <Icon size={18} className="flex-shrink-0" />
            <span className={cn("transition-opacity duration-200", isCollapsed ? "opacity-0 md:hidden w-0" : "opacity-100")}>
              {item.label}
            </span>
          </Link>
        );
      }),
    [pathname, isCollapsed]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grid-bg-dots">
      {/* Sidebar navigation */}
      <aside 
        className={cn(
          "fixed bottom-0 left-0 z-40 w-full border-t border-border bg-card/90 backdrop-blur-xl transition-all duration-300 md:top-0 md:h-screen md:border-r md:border-t-0",
          isCollapsed ? "md:w-16" : "md:w-64"
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-border hidden md:flex">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-glow">
              <Sparkles size={15} />
            </span>
            <span className={cn("text-sm font-semibold tracking-tight transition-opacity duration-300", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
              StudyFlow
            </span>
          </Link>
          <button 
            onClick={toggleSidebar} 
            className="p-1.5 rounded-md hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        <nav className="grid grid-cols-6 gap-1 p-2 md:mt-4 md:grid-cols-1 md:px-3 md:space-y-1">
          {navItems}
        </nav>

        {/* Theme state inside Sidebar Footer */}
        <div className={cn("hidden md:block absolute bottom-5 left-0 right-0 px-3")}>
          <Button 
            variant="secondary" 
            className={cn("w-full transition-all", isCollapsed ? "px-0 justify-center h-9 w-9 mx-auto rounded-lg" : "h-9 justify-start")}
            onClick={toggleTheme}
            title={dark ? "Toggle light mode" : "Toggle dark mode"}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
            <span className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100 ml-2")}>
              {dark ? "Light Mode" : "Dark Mode"}
            </span>
          </Button>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div 
        className={cn(
          "transition-all duration-300 min-h-screen flex flex-col pb-20 md:pb-0",
          isCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        {/* Top Header Navigation */}
        <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/80 backdrop-blur-xl px-4 flex items-center justify-between gap-4">
          {/* Collapse sidebar controls on Desktop */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button 
              onClick={() => setIsPaletteOpen(true)}
              className="w-full flex items-center justify-between text-left h-9 px-3 rounded-lg border border-border bg-card/50 hover:bg-muted/40 hover:border-border text-xs text-muted-foreground transition-all duration-200 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Search size={14} className="text-muted-foreground" />
                Search cards or type a command...
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground select-none">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick action triggers */}
            <Link href="/editor" className="hidden sm:block">
              <Button size="sm" className="h-8 rounded-lg text-xs gap-1.5">
                <Plus size={14} /> New Card
              </Button>
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-lg"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-foreground">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-80 rounded-xl border border-border bg-card p-2.5 shadow-soft animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="flex items-center justify-between border-b border-border pb-2 mb-2 px-1">
                    <span className="text-xs font-semibold">Notifications</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllNotificationsRead}
                        className="text-[10px] text-accent hover:underline flex items-center gap-1 font-medium"
                      >
                        <Check size={11} /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-center text-xs text-muted-foreground py-4">No notifications yet.</p>
                    ) : (
                      notifications.map(item => (
                        <div 
                          key={item.id} 
                          className={cn(
                            "p-2 rounded-lg text-xs cursor-pointer transition-colors flex items-start justify-between gap-2",
                            item.read ? "text-muted-foreground hover:bg-muted/30" : "bg-muted/40 font-medium text-foreground hover:bg-muted/65"
                          )}
                          onClick={() => toggleReadNotification(item.id)}
                        >
                          <div className="space-y-1">
                            <p className="leading-relaxed">{item.text}</p>
                            <span className="text-[10px] text-muted-foreground">{item.time}</span>
                          </div>
                          {!item.read && (
                            <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-1" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="h-8 w-8 rounded-md bg-accent text-accent-foreground font-semibold flex items-center justify-center text-xs shadow-glow">
                  SA
                </div>
                <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2.5 w-52 rounded-xl border border-border bg-card p-1 shadow-soft animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-3 py-2 border-b border-border/80">
                    <p className="text-xs font-semibold">Sai Ashish</p>
                    <p className="text-[10px] text-muted-foreground truncate">saiashish@studyflow.ai</p>
                  </div>
                  <div className="p-1 space-y-0.5">
                    <Link href="/settings" onClick={() => setIsProfileOpen(false)}>
                      <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-muted/60 text-foreground text-left transition-colors">
                        <User size={13} className="text-muted-foreground" /> My Account
                      </button>
                    </Link>
                    <Link href="/settings" onClick={() => setIsProfileOpen(false)}>
                      <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-muted/60 text-foreground text-left transition-colors">
                        <Settings size={13} className="text-muted-foreground" /> Settings
                      </button>
                    </Link>
                    <div className="border-t border-border/80 my-1" />
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        router.push("/auth");
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-danger/10 hover:text-danger text-foreground text-left transition-colors"
                    >
                      <LogOut size={13} className="text-muted-foreground group-hover:text-danger" /> Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Globally Accessible Command Palette */}
      <CommandPalette 
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        toggleTheme={toggleTheme}
        isDark={dark}
      />
    </div>
  );
}
