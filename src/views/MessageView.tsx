import { motion, AnimatePresence } from 'motion/react';
import { Send, Search, Users, Heart, Star, PlusCircle, Plus, UserPlus, MessageCircle, ChevronLeft, MoreHorizontal, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState, useRef, useEffect } from 'react';

const INITIAL_CHATS = [
  { id: 'fox', name: "甜心狐", msg: "今天的晨跑很有趣，明天还去吗？", time: "2m ago", unread: 2, avatar: "https://i.pravatar.cc/100?u=fox", messages: [
    { sender: 'them', text: '今天的晨跑很有趣，明天还去吗？', time: '14:20' }
  ]},
  { id: 'group', name: "校友跑团", msg: "周日西湖环湖跑记得准时参加", time: "1h ago", unread: 0, avatar: "https://i.pravatar.cc/100?u=group", messages: [
    { sender: 'them', text: '周日西湖环湖跑记得准时参加', time: '13:05' }
  ]},
  { id: 'deer', name: "机警鹿", msg: "动力核心碎片还差几个？我有个多余的", time: "3h ago", unread: 0, avatar: "https://i.pravatar.cc/100?u=deer", messages: [
    { sender: 'them', text: '动力核心碎片还差几个？我有个多余的', time: '11:45' }
  ]},
];

export default function MessageView() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find(c => c.id === selectedChatId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedChatId) return;

    const newMessage = { sender: 'me', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    setChats(prev => prev.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          msg: inputText
        };
      }
      return chat;
    }));

    setInputText('');

    // Simulated reply
    setTimeout(() => {
      const replies = ["太棒了！我也正想这么说 ⚡", "哈哈，动力十足！", "没问题，明天老地方见 🏃", "收到！我也准备好了。"];
      const reply = { 
        sender: 'them', 
        text: replies[Math.floor(Math.random() * replies.length)], 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, reply],
            msg: reply.text
          };
        }
        return chat;
      }));
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-32 pt-6 space-y-8">
      {/* Sport Partners (搭子) */}
      <section className="px-6 space-y-4 pt-2">
        <div className="flex items-center justify-between">
           <h3 className="text-lg font-display font-bold">我的运动搭子</h3>
           <span className="text-[10px] font-bold text-neutral-500 uppercase">Partner System</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {[
              { name: "机警鹿", level: 84, avatar: "https://i.pravatar.cc/100?u=deer" },
              { name: "甜心狐", level: 92, avatar: "https://i.pravatar.cc/100?u=fox" },
              { name: "淘气豹", level: 45, avatar: "https://i.pravatar.cc/100?u=cheetah" },
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-2 shrink-0 group">
                 <div className="relative">
                    <img src={p.avatar} className="w-16 h-16 rounded-[24px] object-cover ring-2 ring-brand/30 group-hover:ring-brand transition-all" alt="" />
                    <div className="absolute -bottom-1 -right-1 bg-brand text-black text-[10px] font-bold px-1.5 rounded-md border-2 border-background">
                       <div className="flex items-center gap-0.5"><Heart size={8} fill="currentColor" /> {p.level}</div>
                    </div>
                 </div>
                 <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">{p.name}</span>
              </div>
            ))}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="w-16 h-16 rounded-[24px] border-2 border-dashed border-neutral-800 flex items-center justify-center text-neutral-600 hover:text-brand hover:border-brand transition-all shrink-0 active:scale-95"
              >
                 <PlusCircle size={24} />
              </button>
              
              <AnimatePresence>
                {showMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-[105]" 
                      onClick={() => setShowMenu(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="fixed left-6 top-24 glass rounded-2xl p-2 w-44 z-[110] border-white/10 shadow-2xl backdrop-blur-3xl"
                    >
                      {[
                        { label: '查找好友', icon: Search },
                        { label: '添加好友', icon: UserPlus },
                        { label: '加入社群', icon: Users },
                      ].map((item, i) => (
                        <button 
                          key={i} 
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brand/10 hover:text-brand transition-colors text-xs font-bold text-white"
                        >
                          <item.icon size={16} />
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Messages List */}
      <div className="px-6 space-y-2 pb-20">
        <div className="flex items-center gap-2 mb-4 px-1">
           <Users size={16} className="text-neutral-500" />
           <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">私信 Conversations</span>
        </div>
        {chats.map((chat, i) => (
            <motion.div 
               whileTap={{ scale: 0.98 }}
               key={chat.id} 
               onClick={() => setSelectedChatId(chat.id)}
               className="flex items-center gap-4 p-4 rounded-[28px] hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
            >
                <div className="relative shrink-0">
                    <img 
                      src={chat.avatar} 
                      className="w-14 h-14 object-cover rounded-[20px]" 
                      alt={chat.name} 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-sm tracking-tight">{chat.name}</h4>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase">{chat.time}</span>
                    </div>
                    <p className={cn(
                        "text-xs truncate transition-colors",
                        chat.unread > 0 ? "text-white font-medium italic" : "text-neutral-500"
                    )}>
                        {chat.msg}
                    </p>
                </div>
                {chat.unread > 0 && (
                    <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_10px_rgba(200,255,0,0.5)]" />
                )}
            </motion.div>
        ))}
      </div>

      {/* Intimacy Unlocks Banner */}
      <div className="px-6">
         <div className="glass rounded-[32px] p-5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 pointer-events-none opacity-20">
               <Star size={80} className="rotate-12 translate-x-8 -translate-y-4" />
            </div>
            <h4 className="font-display font-bold text-sm flex items-center gap-2">
               <Heart size={14} className="text-pink-400" fill="currentColor" />
               亲密度系统已开放
            </h4>
            <p className="text-[10px] text-neutral-400 mt-1 max-w-[150px]">结伴运动提升亲密度，解锁专属合影动作及称号！</p>
         </div>
      </div>

      {/* Chat Room Overlay */}
      <AnimatePresence>
        {selectedChatId && selectedChat && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col"
          >
            {/* Chat Header */}
            <header className="px-6 pt-12 pb-6 glass border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedChatId(null)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={selectedChat.avatar} className="w-10 h-10 rounded-xl" alt="" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{selectedChat.name}</h3>
                    <p className="text-[10px] font-bold text-brand uppercase tracking-widest mt-0.5">Online Now</p>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50">
                <MoreHorizontal size={20} />
              </button>
            </header>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col no-scrollbar"
            >
               <div className="flex flex-col items-center justify-center py-8 opacity-40">
                  <div className="p-4 bg-white/5 rounded-full mb-2">
                     <Zap size={24} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-center">
                    你们已经是连续结伴 3 天的伙伴了<br/>共同努力解锁更高亲密度！
                  </p>
               </div>

               {selectedChat.messages.map((m, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    key={i}
                    className={cn(
                      "max-w-[80%] p-4 rounded-[24px] text-sm leading-relaxed",
                      m.sender === 'me' 
                        ? "bg-brand text-black font-medium self-end rounded-tr-none shadow-[0_4px_20px_rgba(200,255,0,0.2)]"
                        : "bg-white/10 text-white self-start rounded-tl-none border border-white/5"
                    )}
                  >
                    {m.text}
                    <p className={cn(
                      "text-[8px] font-bold uppercase mt-2 opacity-50",
                      m.sender === 'me' ? "text-right" : "text-left"
                    )}>
                      {m.time}
                    </p>
                  </motion.div>
               ))}
            </div>

            {/* Chat Input */}
            <footer className="p-6 pb-10 glass border-t border-white/5">
              <div className="flex items-center gap-3 bg-white/5 p-2 pr-2 pl-4 rounded-full border border-white/10 focus-within:border-brand/50 transition-colors">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="聊点什么..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2"
                />
                <button 
                  onClick={handleSendMessage}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    inputText.trim() ? "bg-brand text-black" : "bg-white/10 text-white/20"
                  )}
                >
                  <Send size={18} />
                </button>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
