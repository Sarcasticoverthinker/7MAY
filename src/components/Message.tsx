import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift, ChevronDown } from 'lucide-react';

const Message = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleButtonClick = () => {
    setShowSurprise(true);
    setShowHearts(true);
  };

  // Font classes for easy reuse
  const fonts = {
    heading: "font-['Playfair_Display'] font-bold",
    subheading: "font-['Dancing_Script'] font-medium",
    body: "font-['Montserrat'] font-normal",
    special: "font-['Great_Vibes'] font-normal"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-300 to-purple-600 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Dancing+Script:wght@600&family=Great+Vibes&family=Montserrat&display=swap');
      `}</style>

      {/* Floating hearts background */}
      <AnimatePresence>
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  y: '100vh', 
                  x: Math.random() * 100 + 'vw',
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                animate={{
                  y: '-10vh',
                  x: Math.random() * 20 - 10 + 'vw',
                  opacity: [0, 1, 1, 0],
                  rotate: 360 + Math.random() * 360,
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 5
                }}
              >
                <Heart 
                  className={i % 3 === 0 ? "text-pink-400" : 
                            i % 2 === 0 ? "text-purple-300" : "text-red-400"} 
                  size={Math.random() * 24 + 16} 
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className={`max-w-2xl w-full bg-white/80 backdrop-blur-xl border-2 border-purple-400 p-10 rounded-3xl shadow-2xl shadow-purple-500/30 text-center relative z-10 ${fonts.body}`}
      >
        {/* Animated sparkle */}
        <motion.div
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="absolute -top-3 -right-3"
        >
          <Sparkles className="text-yellow-300" size={32} />
        </motion.div>

        <h1 className={`text-5xl md:text-6xl mb-4 tracking-wider text-purple-900 ${fonts.heading}`}>
          Dearest Khadijah,
        </h1>

        <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-purple-300 to-purple-600 rounded-full mb-6" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`text-2xl italic leading-relaxed mb-6 text-purple-800 ${fonts.subheading}`}
        >
          The epitome of beauty and grace, unmatched in the entire world — wrapped in eyeliner, gloss, and purple dreams.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl text-purple-900 leading-relaxed mb-6"
        >
          On your birthday, I just want to say I'm so lucky to have met you. 
          I pray that your days, weeks, months, and years ahead are filled with barakah, warmth, love, and the kind of happiness that brings peace to your heart.
        </motion.p>

        <AnimatePresence mode="wait">
          {!showSurprise ? (
            <>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className={`text-lg text-purple-800 tracking-wide mb-2 ${fonts.special}`}
              >
                Wishing you the happiest birthday
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className={`text-xl text-purple-700 mb-6 ${fonts.subheading}`}
              >
                Happy Birthday, BBG — my sour princess 💜
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
                onClick={handleButtonClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full text-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 mx-auto ${fonts.body} font-semibold`}
              >
                <Gift size={24} />
                Reveal Your Special Gift
                <ChevronDown size={20} className="animate-bounce" />
              </motion.button>
            </>
          ) : (
            <motion.div
              key="surprise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`mt-6 p-6 bg-purple-100/80 rounded-xl border border-purple-300 ${fonts.body}`}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="mb-4"
              >
                <Heart className="text-red-500 mx-auto" size={48} />
              </motion.div>
              <p className={`text-xl text-purple-800 mb-2 ${fonts.special}`}>
                Here's to you, my love
              </p>
              <p className={`text-purple-700 ${fonts.subheading} text-2xl`}>
                May all your dreams come true 💫
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Message;
