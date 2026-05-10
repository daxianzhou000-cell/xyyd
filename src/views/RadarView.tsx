import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Activity, 
  Zap, 
  Heart, 
  Star, 
  MessageCircle, 
  Bookmark, 
  UserPlus, 
  Play, 
  Search, 
  PlusCircle,
  Image as ImageIcon,
  Film,
  Camera,
  Plus,
  X,
  Trophy,
  Users
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

type RadarTab = 'map' | 'report' | 'feed';
type ReportPeriod = 'day' | 'week' | 'month';

export default function RadarView() {
  const [activeSubTab, setActiveSubTab] = useState<RadarTab>('map');
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('week');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [selectedBuddy, setSelectedBuddy] = useState<any | null>(null);
  const [isRequested, setIsRequested] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postText, setPostText] = useState('');

  const buddies = [
    { id: 1, virtualName: '机警鹿', anonymousName: '神秘跑者 #72', activity: '正在晨跑 3km', pos: { top: '25%', left: '35%' }, color: 'bg-blue-400', shadow: 'rgba(96,165,250,1)' },
    { id: 2, virtualName: '勇猛虎', anonymousName: '神秘力量 #12', activity: '正在进行力量训练', pos: { bottom: '45%', right: '25%' }, color: 'bg-brand', shadow: 'rgba(200,255,0,1)' },
    { id: 3, virtualName: '甜心狐', anonymousName: '神秘羽球手 #09', activity: '正在寻找球友', pos: { top: '55%', left: '65%' }, color: 'bg-pink-500', shadow: 'rgba(236,72,153,1)' },
  ];

  return (
    <div className="min-h-screen pb-32 pt-6 space-y-6">
      {/* Sub Navigation */}
      <div className="px-6 flex items-center justify-center gap-6 border-b border-white/5 pb-4">
        {[
          { id: 'map', label: '脉冲地图' },
          { id: 'report', label: '运动战报' },
          { id: 'feed', label: '社区动态' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as RadarTab)}
            className={cn(
              "text-sm font-bold transition-all relative pb-2",
              activeSubTab === tab.id ? "text-brand" : "text-neutral-500"
            )}
          >
            {tab.label}
            {activeSubTab === tab.id && (
              <motion.div layoutId="radarActive" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-6 space-y-6"
          >
            <div className="relative h-[65vh] w-full glass rounded-[40px] overflow-hidden bg-zinc-950 border-white/5">
              {/* More Realistic Map Style Overlay */}
              <div className="absolute inset-0 opacity-40 pointer-events-none" 
                   style={{ 
                     backgroundImage: 'url("https://images.unsplash.com/photo-1524660988544-2fd292776c5b?auto=format&fit=crop&q=80&w=1200")',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     filter: 'grayscale(1) invert(1) contrast(1.5)'
                   }} />
              
              <div className="absolute inset-0 bg-black/60 pointer-events-none" />
              
              {/* Map Grid and SVGs for extra depth */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 600">
                <path d="M0,150 L400,150 M0,300 L400,300 M0,450 L400,450" stroke="white" strokeWidth="0.5" fill="none" />
                <path d="M100,0 L100,600 M200,0 L200,600 M300,0 L300,600" stroke="white" strokeWidth="0.5" fill="none" />
                <path d="M50,100 Q150,50 250,150 T350,250" stroke="#C8FF00" strokeWidth="2" fill="none" className="opacity-40 animate-pulse" />
              </svg>

              {/* Pulse Map Visualization */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                <div className="w-40 h-40 border border-brand/50 rounded-full animate-[ping_3s_infinite]" />
                <div className="w-80 h-80 border border-brand/20 rounded-full animate-[ping_5s_infinite]" />
              </div>

              {/* Pulse Points for different buddies */}
              {buddies.map((buddy) => (
                <motion.div 
                  key={buddy.id}
                  animate={{ scale: [1, 1.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 2 + buddy.id * 0.5 }}
                  className="absolute group cursor-pointer pointer-events-auto"
                  style={buddy.pos}
                  onClick={() => {
                    setSelectedBuddy(buddy);
                    setIsRequested(false);
                  }}
                >
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center border-2 border-white/20", buddy.color)} 
                       style={{ boxShadow: `0 0 25px ${buddy.shadow}` }}>
                     <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </motion.div>
              ))}

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
                <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold bg-black/60 shadow-xl backdrop-blur-xl">
                  <MapPin size={14} className="text-brand" />
                  <span>浙大玉泉校区 · 实时脉冲</span>
                </div>
                <button className="bg-brand text-black font-bold p-3 rounded-2xl shadow-[0_0_30px_rgba(200,255,0,0.3)]">
                  <Activity size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-6 space-y-6"
          >
            {/* Range Selector */}
            <div className="bg-white/5 p-1.5 rounded-2xl flex border border-white/5">
              {(['day', 'week', 'month'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setReportPeriod(p)}
                  className={cn(
                    "flex-1 py-2 text-[10px] font-bold uppercase rounded-xl transition-all",
                    reportPeriod === p ? "bg-brand text-black shadow-lg" : "text-neutral-500 hover:text-neutral-300"
                  )}
                >
                  {p === 'day' ? '日战报' : p === 'week' ? '周战报' : '月战报'}
                </button>
              ))}
            </div>

            <div className="glass rounded-[32px] p-6 bg-gradient-to-br from-brand/10 to-transparent border-brand/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Zap size={120} fill="currentColor" className="text-brand" />
               </div>
               <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl tracking-tight">全校运动风云榜</h3>
                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{reportPeriod} Ranking · ZJU</p>
                  </div>
               </div>

               <div className="space-y-4">
                  {[
                    { rank: "01", user: "机警鹿", score: "92,402", trend: "up", avatar: "https://i.pravatar.cc/100?u=deer" },
                    { rank: "02", user: "甜心狐", score: "88,150", trend: "down", avatar: "https://i.pravatar.cc/100?u=fox" },
                    { rank: "03", user: "闪电猫", score: "84,300", trend: "stable", avatar: "https://i.pravatar.cc/100?u=tiger" },
                    { rank: "04", user: "淘气豹", score: "72,102", trend: "up", avatar: "https://i.pravatar.cc/100?u=c", me: true },
                  ].map((rank, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-[24px] transition-all",
                        rank.me ? "bg-brand/20 border border-brand/20 ring-4 ring-brand/5" : "bg-white/5 hover:bg-white/10"
                      )}
                    >
                       <div className="flex items-center gap-4">
                          <span className={cn(
                            "text-lg font-display font-bold italic w-6",
                            i < 3 ? "text-brand" : "text-neutral-600"
                          )}>{rank.rank}</span>
                          <img src={rank.avatar} className="w-10 h-10 rounded-xl" alt="" />
                          <div>
                            <span className="font-bold text-sm block">{rank.user}</span>
                            <span className="text-[9px] text-neutral-500 font-bold uppercase leading-none">Activity Score</span>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="text-sm font-display font-bold text-white block">{rank.score}</span>
                          <span className={cn(
                            "text-[10px] font-bold",
                            rank.trend === 'up' ? "text-green-400" : rank.trend === 'down' ? "text-red-400" : "text-neutral-500"
                          )}>
                             {rank.trend === 'up' ? '↑ Rising' : rank.trend === 'down' ? '↓ Falling' : '– Stable'}
                          </span>
                       </div>
                    </motion.div>
                  ))}
               </div>

               <button className="w-full mt-6 py-4 glass bg-white/5 border-white/5 rounded-[20px] text-xs font-bold uppercase tracking-widest text-brand hover:bg-brand hover:text-black transition-all">
                  查看完整榜单
               </button>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'feed' && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="px-4 space-y-4"
          >
             {/* Feed Actions */}
             <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-display font-bold italic">社区广场</h3>
                <button 
                  onClick={() => setIsCreatingPost(true)}
                  className="flex items-center gap-2 bg-brand text-black px-4 py-2 rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all"
                >
                   <PlusCircle size={16} />
                   发布动态
                </button>
             </div>
             <div className="columns-2 gap-4 space-y-4">
                {[
                  { id: 1, title: "浙大玉泉校区晨跑打卡，今天空气太好了！🏃‍♀️", user: "甜心狐", likes: "1.2k", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400", type: 'image' },
                  { id: 2, title: "周五球场见！有谁要组队吗？🏀", user: "勇猛虎", likes: "842", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400", type: 'video' },
                  { id: 3, title: "新装备到账，能量值拉满！⚡", user: "闪电猫", likes: "2.4k", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400", type: 'image' },
                  { id: 4, title: "深夜健身房，坚持就是胜利", user: "铁甲犀", likes: "321", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400", type: 'image' },
                  { id: 5, title: "校园最美骑行路线分享", user: "机警鹿", likes: "560", img: "https://images.unsplash.com/photo-1471506480208-8a93a6c0d477?auto=format&fit=crop&q=80&w=400", type: 'image' },
                ].map((post) => (
                  <motion.div 
                    key={post.id}
                    layoutId={`post-${post.id}`}
                    onClick={() => setSelectedPost(post.id)}
                    className="break-inside-avoid relative glass rounded-[24px] overflow-hidden border-white/5 cursor-pointer group"
                  >
                     <div className="relative aspect-[3/4]">
                        <img 
                          src={post.img} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          alt="" 
                          referrerPolicy="no-referrer"
                        />
                        {post.type === 'video' && (
                          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                            <Play size={12} fill="white" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                     </div>
                     <div className="p-3 space-y-2">
                        <h4 className="text-[11px] font-medium leading-relaxed line-clamp-2">{post.title}</h4>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1.5 min-w-0">
                              <img src={`https://i.pravatar.cc/50?u=${post.user}`} className="w-4 h-4 rounded-full" alt="" />
                              <span className="text-[10px] text-neutral-400 truncate">{post.user}</span>
                           </div>
                           <div className="flex items-center gap-1 text-neutral-500">
                              <Heart size={10} />
                              <span className="text-[9px] font-bold">{post.likes}</span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buddy Request Modal */}
      <AnimatePresence>
        {selectedBuddy && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full max-w-sm glass rounded-[40px] p-8 border-white/10 bg-zinc-900 shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedBuddy(null)}
                className="absolute top-6 right-6 text-neutral-500"
              >
                ×
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                   <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-neutral-800 animate-pulse" />
                   </div>
                   <div className="absolute -bottom-2 -right-2 p-2 bg-brand rounded-xl text-black">
                      <Zap size={20} fill="currentColor" />
                   </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-bold">{selectedBuddy.anonymousName}</h4>
                  <p className="text-brand text-xs font-bold uppercase tracking-widest">{selectedBuddy.activity}</p>
                </div>

                <p className="text-neutral-500 text-sm px-4">
                  同意结伴申请前，为了保护隐私，你无法查看该伙伴的动物外型及虚拟名称。
                </p>

                {!isRequested ? (
                  <button 
                    onClick={() => setIsRequested(true)}
                    className="w-full bg-brand text-black font-bold py-4 rounded-[24px] shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
                  >
                    申请一起运动
                  </button>
                ) : (
                  <div className="w-full flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                      <Zap size={16} className="animate-pulse" />
                      申请已发出
                    </div>
                    <p className="text-[10px] text-neutral-600 font-medium">对方同意后，TA将出现在你的搭子列表中</p>
                    <button 
                      onClick={() => setSelectedBuddy(null)}
                      className="text-neutral-400 text-xs font-bold underline underline-offset-4"
                    >
                      等候消息
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Post Overlay */}
      <AnimatePresence>
        {isCreatingPost && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-black flex flex-col"
          >
            {/* Header */}
            <header className="px-6 pt-12 pb-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-xl">
              <button 
                onClick={() => setIsCreatingPost(false)}
                className="text-white/60 font-bold text-sm px-2"
              >
                取消
              </button>
              <h2 className="text-lg font-display font-black italic tracking-tight">CREATE POST</h2>
              <button 
                disabled={!postText.trim()}
                onClick={() => {
                  setIsCreatingPost(false);
                  setPostText('');
                }}
                className={cn(
                  "px-6 py-2 rounded-full font-bold text-xs shadow-lg transition-all active:scale-95",
                  postText.trim() ? "bg-brand text-black" : "bg-white/10 text-white/20"
                )}
              >
                发布
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar relative z-10">
              {/* Text Input */}
              <div className="space-y-4">
                <textarea 
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="分享你的运动瞬间..."
                  className="w-full bg-transparent border-none outline-none text-xl font-medium text-white placeholder:text-neutral-600 resize-none min-h-[120px] leading-relaxed"
                  autoFocus
                />
              </div>

              {/* Media Select Options */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] px-1">添加媒体附件</p>
                <div className="grid grid-cols-2 gap-4">
                   <button className="aspect-[4/3] rounded-[32px] bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 text-neutral-400 hover:text-brand hover:border-brand/50 hover:bg-brand/5 transition-all group">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand/20 transition-colors">
                        <ImageIcon size={28} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">添加照片</span>
                   </button>
                   <button className="aspect-[4/3] rounded-[32px] bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 text-neutral-400 hover:text-brand hover:border-brand/50 hover:bg-brand/5 transition-all group">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand/20 transition-colors">
                        <Film size={28} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">录制视频</span>
                   </button>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex gap-2 p-1">
                 <button className="glass px-4 py-2 rounded-full border-white/5 flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors">
                    <Camera size={14} />
                    即时拍照
                 </button>
                 <button className="glass px-4 py-2 rounded-full border-white/5 flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors text-nowrap">
                    <Plus size={14} />
                    选择路线
                 </button>
              </div>

              {/* Tags & Options */}
              <div className="space-y-4 pt-8 border-t border-white/5">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                          <MapPin size={18} />
                       </div>
                       <span className="text-sm font-bold text-white/50">添加地点</span>
                    </div>
                    <button className="text-[10px] font-bold text-brand uppercase tracking-tighter glass px-3 py-1.5 rounded-full border-brand/20">
                      浙江大学玉泉校区
                    </button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-pink-500/20 text-pink-400 rounded-xl">
                          <Users size={18} />
                       </div>
                       <span className="text-sm font-bold text-white/50">提及搭子</span>
                    </div>
                    <div className="flex -space-x-2">
                       <img src="https://i.pravatar.cc/100?u=fox" className="w-8 h-8 rounded-full border-2 border-black" alt="" />
                       <img src="https://i.pravatar.cc/100?u=deer" className="w-8 h-8 rounded-full border-2 border-black" alt="" />
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-zinc-800 text-neutral-400 rounded-xl">
                          <Trophy size={18} />
                       </div>
                       <span className="text-sm font-bold text-white/50">展示战绩</span>
                    </div>
                    <button className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter glass px-3 py-1.5 rounded-full border-white/5">
                      晨跑 3km (15:20)
                    </button>
                 </div>
              </div>
            </div>

            {/* Hint */}
            <div className="p-6 pb-12 opacity-40">
               <p className="text-[10px] font-medium leading-relaxed">
                 * 发布动态即代表你同意《社区准则》，内容将展示在社区广场及雷达地图中。
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Detail Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
             />
             {/* Post Detail Overlay - Vertical Immersive Feed */}
             <motion.div 
                layoutId={`post-${selectedPost}`}
                className="relative w-full h-full flex flex-col overflow-y-auto scroll-smooth snap-y snap-mandatory bg-black"
             >
                {[
                  // Primary selected post
                  { id: selectedPost, title: "打卡浙大玉泉，今天又是能量满满的一天！🔥", user: "机警鹿", likes: "1.2k", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800" },
                  // Next placeholder post for "swiping up"
                  { id: 999, title: "西湖边的夕阳跑，浪漫至极。🌅", user: "甜心狐", likes: "890", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800" }
                ].map((postItem) => (
                  <div key={postItem.id} className="min-h-screen w-full snap-start relative flex flex-col justify-end">
                     <img 
                        src={postItem.img} 
                        className="absolute inset-0 w-full h-full object-cover" 
                        alt="" 
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />
                     
                     {/* Close Button Only on Top Post */}
                     {postItem.id === selectedPost && (
                        <button 
                           onClick={(e) => { e.stopPropagation(); setSelectedPost(null); }}
                           className="absolute top-12 right-6 glass w-10 h-10 rounded-full flex items-center justify-center border-white/20 z-50 text-white"
                        >
                           ×
                        </button>
                     )}

                     <div className="p-8 pb-32 space-y-6 relative z-10">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <img src={`https://i.pravatar.cc/100?u=${postItem.user}`} className="w-12 h-12 rounded-[20px] ring-2 ring-brand" alt="" />
                              <div>
                                 <p className="font-bold text-white text-lg">{postItem.user === '机警鹿' ? '机警鹿' : postItem.user}</p>
                                 <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none mt-1">ZJU · 2h ago</p>
                              </div>
                           </div>
                           <button className="bg-brand text-black px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(200,255,0,0.4)]">
                              <UserPlus size={14} />
                              关注
                           </button>
                        </div>
                        
                        <p className="text-white text-base leading-relaxed font-medium">
                          {postItem.title} #浙大跑友 #能量全开
                        </p>
                        
                        <div className="flex flex-col items-end gap-6 absolute right-6 bottom-40">
                           <button className="flex flex-col items-center gap-1 text-white">
                              <div className="p-3 glass rounded-full bg-white/10 hover:bg-brand/20 transition-colors">
                                 <Heart size={24} className="hover:text-brand" />
                              </div>
                              <span className="text-[10px] font-bold">{postItem.likes}</span>
                           </button>
                           <button className="flex flex-col items-center gap-1 text-white">
                              <div className="p-3 glass rounded-full bg-white/10 hover:bg-brand/20 transition-colors">
                                 <MessageCircle size={24} />
                              </div>
                              <span className="text-[10px] font-bold">42</span>
                           </button>
                           <button className="flex flex-col items-center gap-1 text-white">
                              <div className="p-3 glass rounded-full bg-white/10 hover:bg-brand/20 transition-colors">
                                 <Bookmark size={24} />
                              </div>
                              <span className="text-[10px] font-bold">收藏</span>
                           </button>
                           <button className="flex flex-col items-center gap-1 text-white animate-spin-slow">
                              <div className="p-3 glass rounded-full bg-white/10 border-brand/50 border-2">
                                 <Zap size={24} className="text-brand" fill="currentColor" />
                              </div>
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
