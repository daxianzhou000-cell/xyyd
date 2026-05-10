import { motion, AnimatePresence } from 'motion/react';
import { 
  Shirt, 
  Sparkles, 
  Wallet, 
  ChevronRight, 
  Zap, 
  Home as HomeIcon, 
  ShoppingBag,
  X,
  ChevronLeft,
  Utensils,
  Hammer,
  Gamepad2,
  Crown,
  Smile,
  Ghost,
  Lock,
  Plus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

const CATEGORIES = [
  { id: 'head', name: '头饰', icon: Crown },
  { id: 'makeup', name: '妆容', icon: Smile },
  { id: 'top', name: '上衣', icon: Shirt },
  { id: 'bottom', name: '下衣', icon: Ghost },
  { id: 'suit', name: '套装', icon: Sparkles },
];

const WARDROBE_ITEMS: Record<string, any[]> = {
  head: [
    { id: 1, name: '赛博光环', type: 'head', isLocked: false, img: 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=300&q=80' },
    { id: 2, name: '猫耳耳机', type: 'head', isLocked: true, quest: '完成一次5km跑步', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&q=80' },
    { id: 11, name: '炫彩墨镜', type: 'head', isLocked: false, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80' },
  ],
  makeup: [
    { id: 3, name: '战纹', type: 'makeup', isLocked: false, img: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&q=80' },
    { id: 31, name: '霓虹瞳', type: 'makeup', isLocked: true, quest: '消耗1000能量', img: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=300&q=80' },
  ],
  top: [
    { id: 4, name: '未来战衣', type: 'top', isLocked: false, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80' },
    { id: 41, name: '极光背心', type: 'top', isLocked: false, img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80' },
  ],
  bottom: [
    { id: 5, name: '能量短裤', type: 'bottom', isLocked: false, img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&q=80' },
    { id: 51, name: '速干长裤', type: 'bottom', isLocked: false, img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=300&q=80' },
  ],
  suit: [
    { id: 6, name: '全能跑王', type: 'suit', isLocked: true, quest: '连续打卡7天', img: 'https://images.unsplash.com/photo-1539109132314-347596ad9c4b?w=300&q=80' },
    { id: 61, name: '暗影忍者', type: 'suit', isLocked: true, quest: '累计步数达10万', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80' },
  ]
};

const SHOP_ITEMS = [
  { id: 101, name: '黄金冠冕', category: 'head', price: 2500, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&q=80' },
  { id: 102, name: '幻影披风', category: 'suit', price: 5000, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80' },
  { id: 103, name: '急速跑鞋', category: 'bottom', price: 1200, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' },
  { id: 104, name: '护目镜', category: 'head', price: 800, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&q=80' },
];

export default function HomeView() {
  const [activeOverlay, setActiveOverlay] = useState<'wardrobe' | 'shop' | 'space' | 'assets' | null>(null);
  const [activeCategory, setActiveCategory] = useState('head');
  const [energy, setEnergy] = useState(12480);

  return (
    <div className="relative h-screen pb-24 overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[60%] bg-pink-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* 3D Avatar Area - Occupies 2/3 of the screen */}
      <div className="absolute inset-x-0 top-0 h-[75vh] flex items-center justify-center pointer-events-none pt-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Floor Shadow */}
          <div className="absolute bottom-20 w-44 h-8 bg-pink-600/20 rounded-[100%] blur-2xl animate-pulse" />
          
          <div className="relative w-full h-[85%] max-w-[320px]">
             {/* Character Visual Placeholder as Text as requested */}
             <div className="w-full h-full flex flex-col items-center justify-center animate-float">
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500/20 to-brand/20 blur-3xl absolute" />
                <div className="relative z-10 space-y-4 text-center">
                   <p className="text-4xl font-display font-black italic text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-brand leading-tight text-white">
                     拟人化<br/>动物精灵
                   </p>
                   <div className="flex justify-center">
                      <div className="glass px-4 py-1.5 rounded-full border-pink-500/30 text-pink-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                        淘气豹 · Spirit
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Interface Overlay */}
      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        {/* Top Section: Currency */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setActiveOverlay('assets')}
            className="glass rounded-[24px] p-3 pr-6 flex items-center gap-3 border-white/5 bg-black/20 cursor-pointer active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center text-brand">
              <Zap size={20} fill="currentColor" />
            </div>
            <div>
               <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">能量资产</p>
               <p className="text-xl font-display font-bold text-white">{energy.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-3 rounded-2xl border-white/5 active:scale-95 transition-all text-pink-400"
          >
            <Sparkles size={24} />
          </motion.button>
        </div>

        {/* Side Controls: Floating near avatar */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 flex flex-col gap-5">
           <motion.button 
             whileHover={{ x: 4 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setActiveOverlay('wardrobe')}
             className={cn(
               "glass w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border-white/10 shadow-xl transition-all",
               activeOverlay === 'wardrobe' ? "bg-brand border-brand/50 text-black" : "bg-black/40 text-neutral-300"
             )}
           >
              <Shirt size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest underline decoration-brand/50 underline-offset-4">衣橱</span>
           </motion.button>
           <motion.button 
             whileHover={{ x: 4 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setActiveOverlay('space')}
             className={cn(
               "glass w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border-white/10 shadow-xl transition-all",
               activeOverlay === 'space' ? "bg-brand border-brand/50 text-black" : "bg-black/40 text-neutral-300"
             )}
           >
              <HomeIcon size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest">空间</span>
           </motion.button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-5">
           <motion.button 
             whileHover={{ x: -4 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setActiveOverlay('shop')}
             className={cn(
               "glass w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border-white/10 shadow-xl transition-all",
               activeOverlay === 'shop' ? "bg-brand border-brand/50 text-black" : "bg-black/40 text-neutral-300"
             )}
           >
              <ShoppingBag size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest">商场</span>
           </motion.button>
           <motion.button 
             whileHover={{ x: -4 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setActiveOverlay('assets')}
             className={cn(
               "glass w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border-white/10 shadow-xl transition-all",
               activeOverlay === 'assets' ? "bg-brand border-brand/50 text-black" : "bg-black/40 text-neutral-300"
             )}
           >
              <Wallet size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest">资产</span>
           </motion.button>
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {activeOverlay && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute inset-x-0 bottom-0 top-0 z-[100] glass border-t border-white/10 bg-black/80 backdrop-blur-3xl overflow-hidden flex flex-col"
            >
               {/* Overlay Header */}
               <div className="p-6 pt-12 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setActiveOverlay(null)}
                      className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center text-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div>
                      <h2 className="text-2xl font-display font-black italic tracking-tight uppercase text-white">
                        {activeOverlay === 'wardrobe' && '衣橱 Wardrobe'}
                        {activeOverlay === 'shop' && '商场 Marketplace'}
                        {activeOverlay === 'space' && '空间 Personal Space'}
                        {activeOverlay === 'assets' && '资产 Digital Assets'}
                      </h2>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                        {activeOverlay === 'wardrobe' && '个性化你的虚拟形象'}
                        {activeOverlay === 'shop' && '消耗能量购买珍稀装扮'}
                        {activeOverlay === 'space' && '经营你的专属虚拟生活'}
                        {activeOverlay === 'assets' && '管理你的运动收益'}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setActiveOverlay(null)} className="text-neutral-500 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
               </div>

               {/* Overlay Content */}
               <div className="flex-1 overflow-hidden bg-neutral-950">
                  {activeOverlay === 'wardrobe' && (
                    <div className="flex h-full bg-black">
                       {/* Left Navigation */}
                       <div className="w-20 border-r border-white/5 flex flex-col items-center py-4 gap-4 overflow-y-auto no-scrollbar bg-neutral-900/40">
                          {CATEGORIES.map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => setActiveCategory(cat.id)}
                              className={cn(
                                "w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shrink-0 border",
                                activeCategory === cat.id 
                                  ? "bg-brand border-brand text-black shadow-[0_0_20px_rgba(200,255,0,0.4)]" 
                                  : "text-white/40 border-white/5 hover:bg-white/5"
                              )}
                            >
                              <cat.icon size={20} />
                              <span className="text-[8px] font-bold">{cat.name}</span>
                            </button>
                          ))}
                       </div>

                       {/* Items Grid */}
                       <div className="flex-1 p-4 overflow-y-auto no-scrollbar pb-32">
                          <div className="grid grid-cols-2 xs:grid-cols-3 gap-3">
                             {(WARDROBE_ITEMS[activeCategory] || []).map(item => (
                               <motion.div 
                                 whileTap={{ scale: 0.95 }}
                                 key={item.id}
                                 className="relative aspect-square rounded-[24px] bg-white/5 border border-white/10 overflow-hidden group"
                               >
                                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                                    <img 
                                      src={item.img} 
                                      referrerPolicy="no-referrer" 
                                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity bg-zinc-800" 
                                      alt={item.name} 
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${item.name}&background=random&color=fff`;
                                      }}
                                    />
                                  </div>
                                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-6">
                                     <p className="text-[10px] font-bold text-white truncate">{item.name}</p>
                                  </div>
                                  {item.isLocked && (
                                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] flex flex-col items-center justify-center p-3 text-center">
                                       <Lock size={16} className="text-brand mb-1.5" />
                                       <p className="text-[9px] font-black italic text-brand leading-tight tracking-tight">{item.quest}</p>
                                    </div>
                                  )}
                                  {!item.isLocked && (
                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_rgba(200,255,0,1)]" />
                                  )}
                               </motion.div>
                             ))}
                             
                             {/* Empty slots */}
                             {[1,2,3].map(i => (
                               <div key={`empty-${i}`} className="aspect-square rounded-[24px] border border-white/5 flex items-center justify-center text-white/5 bg-white/2">
                                 <Plus size={20} />
                               </div>
                             ))}
                          </div>
                          
                          {(WARDROBE_ITEMS[activeCategory] || []).length === 0 && (
                            <div className="h-40 flex flex-col items-center justify-center text-center space-y-4">
                               <Shirt size={32} className="text-white/10" />
                               <p className="text-xs font-bold text-neutral-600 uppercase tracking-widest">该分类暂无服饰</p>
                            </div>
                          )}
                       </div>
                    </div>
                  )}

                  {activeOverlay === 'shop' && (
                    <div className="h-full flex flex-col p-6 space-y-6 bg-black">
                       {/* Categories Chips */}
                       <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                          {CATEGORIES.map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => setActiveCategory(cat.id)}
                              className={cn(
                                "px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest whitespace-nowrap border transition-all",
                                activeCategory === cat.id 
                                  ? "bg-brand border-brand text-black shadow-[0_0_15px_rgba(200,255,0,0.3)]" 
                                  : "bg-white/5 border-white/10 text-neutral-500"
                              )}
                            >
                              {cat.name}
                            </button>
                          ))}
                       </div>

                       <div className="grid grid-cols-2 gap-4 pb-32 overflow-y-auto no-scrollbar">
                          {SHOP_ITEMS.filter(i => i.category === activeCategory || activeCategory === 'head').map(item => (
                            <div key={item.id} className="glass rounded-[32px] p-4 border-white/5 bg-white/5 flex flex-col space-y-4">
                               <div className="aspect-square rounded-2xl overflow-hidden relative bg-zinc-800">
                                  <img src={item.img} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt="" />
                                  <div className="absolute top-2 right-2 glass px-2 py-1 rounded-lg border-white/10 flex items-center gap-1">
                                     <Zap size={10} className="text-brand" fill="currentColor" />
                                     <span className="text-[10px] font-display font-bold text-white">{item.price}</span>
                                  </div>
                               </div>
                               <div className="space-y-1">
                                  <p className="font-bold text-sm text-white">{item.name}</p>
                                  <button className="w-full py-2 bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand hover:text-black transition-all text-white">
                                     立即购买
                                  </button>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {activeOverlay === 'space' && (
                    <div className="h-full p-6 flex flex-col space-y-8 bg-black">
                       <div className="glass rounded-[40px] aspect-video w-full border-white/5 bg-white/5 overflow-hidden relative group">
                          <img 
                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" 
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
                            alt="" 
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="text-center space-y-2">
                                <p className="text-xs font-display font-black italic tracking-widest text-brand">ROOM DECORATION</p>
                                <p className="text-[10px] font-bold text-white/40">点击编辑你的个人空间</p>
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4 overflow-y-auto no-scrollbar pb-32">
                          {[
                            { name: '喂食 Spirit Food', icon: Utensils, color: 'bg-orange-500', desc: '能量+5, 饱食度提高' },
                            { name: '装修 Redecorate', icon: Hammer, color: 'bg-blue-500', desc: '更换家具及壁纸' },
                            { name: '小游戏 Mini-Games', icon: Gamepad2, color: 'bg-brand', desc: '心情指数大幅提升' },
                          ].map((action, i) => (
                            <button key={i} className="glass rounded-[32px] p-6 border-white/5 bg-white/5 text-left space-y-4 hover:bg-white/10 transition-colors">
                               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", action.color)}>
                                  <action.icon size={24} />
                               </div>
                               <div>
                                  <p className="font-bold text-sm text-white">{action.name}</p>
                                  <p className="text-[10px] text-neutral-500 font-medium mt-1">{action.desc}</p>
                               </div>
                            </button>
                          ))}
                       </div>
                    </div>
                  )}

                  {activeOverlay === 'assets' && (
                    <div className="h-full p-6 space-y-6 bg-black">
                       <div className="glass rounded-[40px] p-8 bg-gradient-to-br from-brand/20 to-transparent border-white/5 text-center space-y-4">
                          <Zap size={48} className="text-brand mx-auto" fill="currentColor" />
                          <div className="space-y-1">
                             <h3 className="text-4xl font-display font-black italic tracking-tighter text-white">{energy.toLocaleString()}</h3>
                             <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-display italic">CURRENT ENERGY BALANCE</p>
                          </div>
                       </div>

                       <div className="space-y-4 overflow-y-auto no-scrollbar pb-32">
                          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-2">收支明细 Transaction History</p>
                          {[
                            { type: 'in', title: '晨跑 5km 奖励', date: '2024.05.09', pt: '+450' },
                            { type: 'out', title: '购买：赛博眼镜', date: '2024.05.08', pt: '-800' },
                            { type: 'in', title: '完成：步数挑战', date: '2024.05.07', pt: '+1,200' },
                            { type: 'in', title: '搭子互动加成', date: '2024.05.07', pt: '+150' },
                          ].map((t, i) => (
                            <div key={i} className="glass rounded-3xl p-5 border-white/5 bg-white/5 flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", t.type === 'in' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')}>
                                     <Zap size={18} fill={t.type === 'in' ? 'currentColor' : 'none'} />
                                  </div>
                                  <div>
                                     <p className="font-bold text-sm text-white">{t.title}</p>
                                     <p className="text-[10px] text-neutral-500">{t.date}</p>
                                  </div>
                               </div>
                               <p className={cn("font-display font-bold text-lg", t.type === 'in' ? 'text-green-400' : 'text-neutral-300')}>
                                 {t.pt}
                               </p>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Section: Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[32px] p-6 bg-black/60 border-white/10 backdrop-blur-3xl"
        >
           <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
                 <h3 className="font-display font-bold text-lg text-white">淘气豹 Lv.32</h3>
              </div>
              <ChevronRight size={18} className="text-neutral-500" />
           </div>
           
           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "75%" }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-pink-500 to-brand"
              />
           </div>
           
           <div className="grid grid-cols-3 gap-2 mt-5">
              {[
                { label: "累计步数", val: "2.4w" },
                { label: "守护勋章", val: "12" },
                { label: "活跃指数", val: "840" },
              ].map((s, i) => (
                <div key={i} className="text-center group cursor-pointer hover:bg-white/5 rounded-xl py-1 transition-colors">
                   <p className="text-lg font-display font-bold text-white">{s.val}</p>
                   <p className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest leading-tight">{s.label}</p>
                </div>
              ))}
           </div>
        </motion.div>
      </div>
    </div>
  );
}
