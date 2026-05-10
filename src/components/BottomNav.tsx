import { motion, AnimatePresence } from 'motion/react';
import { Home, Target, Zap, MessageSquare, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type TabType = 'quest' | 'radar' | 'home' | 'message' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TABS = [
  { id: 'quest', icon: Target, label: '任务' },
  { id: 'radar', icon: Zap, label: '瞧瞧' },
  { id: 'home', icon: Home, label: '家园', isLarge: true },
  { id: 'message', icon: MessageSquare, label: '聊天' },
  { id: 'profile', icon: User, label: '我的' },
] as const;

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-md">
        <div className="glass flex items-center justify-between rounded-2xl px-2 py-1.5 shadow-2xl shadow-black/50 border-white/5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            if (tab.isLarge) {
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className="relative flex flex-col items-center group -top-2 px-2"
                >
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-all duration-300",
                    isActive ? "bg-white text-black scale-110" : "bg-brand text-black group-hover:scale-105"
                  )}>
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                </button>
              );
            }

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className="relative flex flex-col items-center flex-1 py-1 transition-all"
              >
                <div className={cn(
                  "p-1.5 rounded-xl transition-all duration-300",
                  isActive ? "text-brand" : "text-neutral-500 hover:text-neutral-300"
                )}>
                  <Icon size={20} />
                </div>
                <span className={cn(
                  "text-[9px] font-bold transition-all duration-300 tracking-wider",
                  isActive ? "text-brand opacity-100" : "text-neutral-500 opacity-60"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
