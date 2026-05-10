import { motion, AnimatePresence } from 'motion/react';
import { Flame, Trophy, Users, ArrowUpRight, Zap, Timer, Star, Activity, Heart, StopCircle, MapPin, Pause, Play } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState, useEffect } from 'react';

const QUESTS = [
  // Basic Quests
  { id: 1, title: "校园漫步 2km", type: "Running", difficulty: "初级", points: 15, reward: "30 能量币", color: "text-blue-400" },
  { id: 4, title: "晨跑打卡 3km", type: "Running", difficulty: "初级", points: 25, reward: "50 能量币", color: "text-blue-400" },
  { id: 7, title: "日常拉伸 10min", type: "Home", difficulty: "初级", points: 10, reward: "20 能量币", color: "text-blue-400" },
  
  // Pro Quests
  { id: 2, title: "极速跳绳 1000次", type: "Home", difficulty: "中级", points: 45, reward: "稀有头盔碎片", color: "text-orange-400" },
  { id: 5, title: "羽毛球双打赢球", type: "Ball", difficulty: "中级", points: 50, reward: "初级动力水", color: "text-orange-400" },
  { id: 8, title: "深蹲挑战 100个", type: "Home", difficulty: "中级", points: 40, reward: "复古卫衣碎片", color: "text-orange-400" },

  // Elite Quests
  { id: 3, title: "高校羽毛球挑战赛", type: "Ball", difficulty: "高级", points: 120, reward: "限时极光特效", color: "text-purple-400" },
  { id: 6, title: "半程跑 10km", type: "Running", difficulty: "高级", points: 150, reward: "S级能量核心", color: "text-purple-400" },
  { id: 9, title: "波比跳极限挑战", type: "Home", difficulty: "高级", points: 180, reward: "传奇披风碎片", color: "text-purple-400" },
];

export default function QuestView() {
  const [activeCategory, setActiveCategory] = useState<'basic' | 'pro' | 'elite'>('basic');
  const [activeWorkout, setActiveWorkout] = useState<any | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [time, setTime] = useState(0);
  const [heartRate, setHeartRate] = useState(115);

  useEffect(() => {
    let interval: any;
    if (activeWorkout && !isPaused && !showReward) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
        // Random heart rate simulation
        setHeartRate(prev => Math.max(100, Math.min(185, prev + (Math.random() > 0.5 ? 1 : -1))));
      }, 1000);
    } else if (!activeWorkout) {
      setTime(0);
      setHeartRate(115);
    }
    return () => clearInterval(interval);
  }, [activeWorkout, isPaused, showReward]);

  const handleEndWorkout = () => {
    if (time > 10) { // Simple threshold for reward
       setShowReward(true);
    } else {
       setActiveWorkout(null);
       setIsPaused(false);
    }
  };

  const closeWorkout = () => {
    setShowReward(false);
    setActiveWorkout(null);
    setIsPaused(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-32 pt-4 px-6 overflow-x-hidden transition-all">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-display font-bold italic">任务认领 Quest</h3>
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Earn points for ranking</p>
        </div>
        <div className="glass px-3 py-1.5 rounded-xl flex items-center gap-2 border-white/5">
           <Zap size={14} className="text-brand" fill="currentColor" />
           <span className="text-sm font-display font-bold">2,480</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 p-1 glass rounded-2xl border-white/5">
         {(['basic', 'pro', 'elite'] as const).map((cat) => (
           <button
             key={cat}
             onClick={() => setActiveCategory(cat)}
             className={cn(
               "flex-1 py-2 text-[10px] font-bold uppercase rounded-xl transition-all",
               activeCategory === cat ? "bg-brand text-black shadow-lg" : "text-neutral-500"
             )}
           >
             {cat === 'basic' ? '初级' : cat === 'pro' ? '中级' : '高级'}
           </button>
         ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {QUESTS.filter(q => {
          if (activeCategory === 'basic') return q.difficulty === '初级';
          if (activeCategory === 'pro') return q.difficulty === '中级';
          return q.difficulty === '高级';
        }).map((quest) => (
          <motion.div 
            key={quest.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-[32px] p-5 border border-white/5 flex items-center justify-between group bg-gradient-to-r from-white/5 to-transparent shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/5", quest.color)}>
                  {quest.difficulty === "初级" && <Timer size={22} />}
                  {quest.difficulty === "中级" && <Star size={22} />}
                  {quest.difficulty === "高级" && <Trophy size={22} />}
              </div>
              <div>
                 <div className="flex items-center gap-2">
                   <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest">{quest.type}</span>
                   <span className="w-1 h-1 rounded-full bg-neutral-700" />
                   <span className="text-brand text-[10px] font-bold">+{quest.points} PT</span>
                 </div>
                 <h4 className="font-bold text-base mt-0.5 tracking-tight">{quest.title}</h4>
                 <p className="text-white/40 text-[10px] font-medium mt-0.5 whitespace-nowrap">奖励: {quest.reward}</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveWorkout(quest)}
              className="bg-brand text-black font-bold text-[10px] uppercase px-5 py-2.5 rounded-2xl shadow-lg active:scale-90 transition-all font-display italic"
            >
              认 领
            </button>
          </motion.div>
        ))}
      </div>

      {/* Real-time Feedback Rank */}
      <section className="glass rounded-[32px] p-6 space-y-5 bg-gradient-to-br from-white/5 to-transparent border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-brand animate-pulse" />
            <h3 className="font-display font-bold text-lg italic">今日突围榜</h3>
          </div>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Global Live</span>
        </div>
        
        <div className="space-y-4">
          {[
            { user: "淘气豹", time: "刚刚", prize: "极品动力腰带", avatar: "https://i.pravatar.cc/100?u=10" },
            { user: "活力兔", time: "2分钟前", prize: "S级火凤凰羽球拍", avatar: "https://i.pravatar.cc/100?u=11" },
            { user: "闪电猫", time: "5分钟前", prize: "能量核心碎片 x5", avatar: "https://i.pravatar.cc/100?u=12" },
          ].map((item, i) => (
             <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                   <img src={item.avatar} className="w-8 h-8 rounded-lg" alt="" />
                   <div>
                      <p className="text-xs font-bold group-hover:text-brand transition-colors">{item.user} <span className="text-neutral-500 font-normal">领走了</span></p>
                      <p className="text-[10px] font-medium text-white/60">{item.prize}</p>
                   </div>
                </div>
                <span className="text-[10px] font-medium text-neutral-600">{item.time}</span>
             </div>
          ))}
        </div>
      </section>

      {/* Immersive Workout Recording Overlay */}
      <AnimatePresence>
        {activeWorkout && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-black touch-none overflow-hidden"
          >
            {/* Animated Background Pulse */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.1)_0%,transparent_70%)] animate-pulse" />
            
            <div className="relative h-full flex flex-col p-8 pt-16">
               {/* Activity Header */}
               <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-display font-black italic tracking-tighter text-brand">RECORDING</h2>
                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-[0.2em]">{activeWorkout.title}</p>
                  </div>
                  <div className="flex items-center gap-2 glass px-4 py-2 rounded-2xl border-white/10 bg-white/5">
                     <Activity size={18} className="text-brand animate-bounce" />
                     <span className="text-sm font-bold text-white">LIVE</span>
                  </div>
               </div>

               {/* Center Metric - Timer */}
               <div className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-12 min-h-0">
                  <div className="relative shrink-0">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} 
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-10 bg-brand/5 blur-3xl rounded-full" 
                    />
                    <h1 className="text-7xl md:text-8xl font-display font-black italic tracking-tighter text-white tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      {formatTime(time)}
                    </h1>
                  </div>

                  {/* Secondary Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-sm">
                     <div className="glass rounded-[24px] md:rounded-[32px] p-4 md:p-6 border-white/5 flex flex-col items-center justify-center space-y-1">
                        <Heart className="text-pink-500 animate-[pulse_1s_infinite]" size={20} fill="currentColor" />
                        <span className="text-3xl md:text-4xl font-display font-black text-white">{heartRate}</span>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">BPM 心率</span>
                     </div>
                     <div className="glass rounded-[24px] md:rounded-[32px] p-4 md:p-6 border-white/5 flex flex-col items-center justify-center space-y-1">
                        <Flame className="text-orange-500" size={20} />
                        <span className="text-3xl md:text-4xl font-display font-black text-white">{Math.floor(time * 0.12)}</span>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">KCAL 消耗</span>
                     </div>
                     <div className="glass rounded-[24px] md:rounded-[32px] p-4 md:p-6 border-white/5 flex flex-col items-center justify-center space-y-1">
                        <MapPin className="text-blue-500" size={20} />
                        <span className="text-3xl md:text-4xl font-display font-black text-white">{(time * 0.002).toFixed(2)}</span>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">KM 距离</span>
                     </div>
                     <div className="glass rounded-[24px] md:rounded-[32px] p-4 md:p-6 border-white/5 flex flex-col items-center justify-center space-y-1">
                        <Zap className="text-brand" size={20} fill="currentColor" />
                        <span className="text-3xl md:text-4xl font-display font-black text-white">{(85 + Math.random() * 5).toFixed(0)}</span>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">POWER 动力值</span>
                     </div>
                  </div>
               </div>

               {/* Action Footer */}
               <div className="pb-20 pt-4 flex flex-col items-center gap-6 shrink-0">
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden max-w-sm">
                    <motion.div 
                      className="h-full bg-brand"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (time / 180) * 100)}%` }}
                    />
                 </div>
                 
                 <div className="flex items-center gap-12">
                   <div className="flex flex-col items-center gap-2">
                     <button 
                       onClick={() => setIsPaused(!isPaused)}
                       className={cn(
                         "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all active:scale-95",
                         isPaused ? "bg-brand text-black" : "bg-white/10 text-white border border-white/10"
                       )}
                     >
                       {isPaused ? <Play size={28} fill="currentColor" /> : <Pause size={28} fill="currentColor" />}
                     </button>
                     <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                       {isPaused ? '继续' : '暂停'}
                     </span>
                   </div>

                   <div className="flex flex-col items-center gap-2">
                     <button 
                       onClick={handleEndWorkout}
                       className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-500/20 text-red-500 border border-red-500/30 flex items-center justify-center active:scale-95 transition-all"
                     >
                        <StopCircle size={28} fill="currentColor" />
                     </button>
                     <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">结束</span>
                   </div>
                 </div>
               </div>
            </div>

            {/* Reward Notification Overlay */}
            <AnimatePresence>
              {showReward && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[210] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
                >
                  <motion.div 
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-full max-w-sm glass rounded-[40px] p-8 border-brand/20 bg-zinc-900 shadow-[0_0_50px_rgba(200,255,0,0.2)] text-center space-y-8 relative overflow-hidden"
                  >
                    {/* Visual Sound Effect Animation */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                       <motion.div 
                         animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                         transition={{ duration: 1.5, repeat: Infinity }}
                         className="w-20 h-20 border-2 border-brand rounded-full" 
                       />
                       <motion.div 
                         animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                         transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                         className="w-20 h-20 border-2 border-brand rounded-full" 
                       />
                    </div>

                    <div className="space-y-2 relative z-10">
                       <div className="flex justify-center mb-6">
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="p-8 bg-brand rounded-full shadow-[0_0_40px_rgba(200,255,0,0.5)]"
                          >
                             <Trophy size={48} className="text-black" />
                          </motion.div>
                       </div>
                       <h2 className="text-3xl font-display font-black italic text-brand tracking-tight">MISSION ACCOMPLISHED!</h2>
                       <p className="text-neutral-400 font-bold text-sm">恭喜！任务目标已达成</p>
                    </div>

                    <div className="glass bg-white/5 rounded-3xl p-6 border-white/5 space-y-4 relative z-10">
                       <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none">获得奖励 REWARDS</p>
                       <div className="flex items-center justify-center gap-6">
                          <div className="text-center space-y-1">
                             <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center mb-1 mx-auto text-brand">
                                <Zap size={24} fill="currentColor" />
                             </div>
                             <p className="text-sm font-display font-bold text-white">+{activeWorkout?.points} PT</p>
                          </div>
                          <div className="text-center space-y-1">
                             <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-1 mx-auto text-pink-500">
                                <Star size={24} fill="currentColor" />
                             </div>
                             <p className="text-sm font-display font-bold text-white">{activeWorkout?.reward}</p>
                          </div>
                       </div>
                    </div>

                    <button 
                      onClick={closeWorkout}
                      className="w-full py-4 bg-brand text-black font-display font-black italic tracking-widest rounded-[24px] shadow-xl hover:scale-105 active:scale-95 transition-all text-sm relative z-10"
                    >
                      领取并同步战报
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
