/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BottomNav, { TabType } from './components/BottomNav';
import QuestView from './views/QuestView';
import RadarView from './views/RadarView';
import HomeView from './views/HomeView';
import MessageView from './views/MessageView';
import ProfileView from './views/ProfileView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('quest');

  return (
    <div className="min-h-screen bg-background text-white selection:bg-brand selection:text-black">
      <div className="relative mx-auto max-w-md min-h-screen border-x border-white/5 overflow-x-hidden">
        
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen w-full">
           <div className="absolute top-0 -left-20 w-96 h-96 bg-brand/5 rounded-full blur-[120px]" />
           <div className="absolute bottom-40 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        {/* View Transition Wrapper */}
        <AnimatePresence mode="wait">
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, translateY: 10 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 1.02, translateY: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full min-h-screen"
          >
            {activeTab === 'quest' && <QuestView />}
            {activeTab === 'radar' && <RadarView />}
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'message' && <MessageView />}
            {activeTab === 'profile' && <ProfileView />}
          </motion.main>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
