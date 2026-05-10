import { motion, AnimatePresence } from 'motion/react';
import { Camera, Settings, BadgeCheck, Medal, Share2, Trophy, Clock, Users, Shield, ChevronRight, Heart, Bookmark, LayoutGrid } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');

  return (
    <div className="min-h-screen pb-32 pt-12 space-y-8">
      {/* Profile Header */}
      <div className="px-6 flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] overflow-hidden border-2 border-brand/20 p-1">
             <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-[28px]"
            />
          </div>
          <button className="absolute -bottom-1 -right-1 bg-brand text-black p-2 rounded-xl shadow-lg border-2 border-background focus:outline-none focus:ring-2 focus:ring-brand">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1">
            <h2 className="text-2xl font-display font-bold tracking-tight">淘气豹</h2>
            <BadgeCheck size={18} className="text-blue-400" fill="currentColor" />
          </div>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Zhejiang University · Class of '27</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white/5 px-6 py-2 rounded-xl border border-white/5 text-xs font-bold flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Share2 size={14} />
            分享履历
          </button>
          <button className="bg-white/5 p-2 rounded-xl border border-white/5 active:bg-brand/20 transition-all text-neutral-400 hover:text-white">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Historical Stats */}
      <div className="px-6">
        <div className="glass rounded-[32px] p-6 bg-white/5 border-white/5 grid grid-cols-2 gap-y-6 shadow-xl">
           <div className="space-y-1">
              <p className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1"><Clock size={10} /> 累计时长</p>
              <p className="text-2xl font-display font-bold">1,248 <span className="text-xs font-sans text-neutral-500">Hrs</span></p>
           </div>
           <div className="space-y-1">
              <p className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1"><Trophy size={10} /> 获得奖章</p>
              <p className="text-2xl font-display font-bold">42 <span className="text-xs font-sans text-neutral-500">Medals</span></p>
           </div>
           <div className="space-y-1 border-t border-white/5 pt-4">
              <p className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1"><Users size={10} /> 搭子网</p>
              <p className="text-2xl font-display font-bold">12 <span className="text-xs font-sans text-neutral-500">Buddies</span></p>
           </div>
           <div className="space-y-1 border-t border-white/5 pt-4">
              <p className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1"><Medal size={10} /> 全校排名</p>
              <p className="text-2xl font-display font-bold">#08 <span className="text-xs font-sans text-neutral-500">Top 5%</span></p>
           </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-6 space-y-6">
        <div className="flex gap-8 border-b border-white/5 pb-2">
           {[
             { id: 'posts', icon: LayoutGrid, label: '动态' },
             { id: 'likes', icon: Heart, label: '点赞' },
             { id: 'saved', icon: Bookmark, label: '收藏' },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                 "flex items-center gap-2 pb-2 text-sm font-bold transition-all relative",
                 activeTab === tab.id ? "text-brand" : "text-neutral-500 hover:text-neutral-300"
               )}
             >
               <tab.icon size={16} />
               {tab.label}
               {activeTab === tab.id && (
                 <motion.div layoutId="profileSubActive" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
               )}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pb-4">
           {activeTab === 'posts' && [1, 2, 3, 4].map(i => (
             <div key={i} className="aspect-[3/4] glass rounded-3xl overflow-hidden group cursor-pointer relative">
                <img src={`https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=300&h=400&sig=${i}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
           ))}
           {activeTab === 'likes' && [5, 6].map(i => (
              <div key={i} className="aspect-[3/4] glass rounded-3xl overflow-hidden group cursor-pointer relative">
                 <img src={`https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=300&h=400&sig=${i}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                 <div className="absolute top-2 right-2 text-pink-500 fill-pink-500">
                    <Heart size={14} fill="currentColor" />
                 </div>
              </div>
           ))}
           {activeTab === 'saved' && [7, 8].map(i => (
              <div key={i} className="aspect-[3/4] glass rounded-3xl overflow-hidden group cursor-pointer relative">
                 <img src={`https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=300&h=400&sig=${i}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                 <div className="absolute top-2 right-2 text-blue-400 fill-blue-400">
                    <Bookmark size={14} fill="currentColor" />
                 </div>
              </div>
           ))}
        </div>
      </div>

      {/* Medal Wall */}
      <section className="px-6 space-y-4">
        <h3 className="text-xl font-display font-bold px-1">奖章墙</h3>
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className={cn(
              "aspect-square glass rounded-2xl flex items-center justify-center border-white/5",
              i > 4 ? "opacity-30 grayscale" : "bg-gradient-to-br from-brand/20 to-transparent"
            )}>
              <Trophy size={24} className={i <= 4 ? "text-brand" : "text-neutral-500"} />
            </div>
          ))}
        </div>
      </section>

      {/* Settings Center */}
      <section className="px-6 space-y-2">
        <h3 className="text-xl font-display font-bold px-1 mb-4">系统偏好</h3>
        <div className="space-y-2">
           {[
             { icon: Shield, label: "隐私设置 (地图可见性)", color: "text-blue-400" },
             { icon: Settings, label: "偏好设置", color: "text-neutral-400" },
           ].map((pref, i) => (
             <button key={i} className="w-full glass p-4 rounded-2xl flex items-center justify-between border-white/2 hover:bg-white/5 transition-all text-sm font-medium">
                <div className="flex items-center gap-3">
                   <div className={cn("p-2 rounded-lg bg-white/5", pref.color)}>
                     <pref.icon size={16} />
                   </div>
                   <span>{pref.label}</span>
                </div>
                <ChevronRight size={14} className="text-neutral-600" />
             </button>
           ))}
        </div>
      </section>
    </div>
  );
}
