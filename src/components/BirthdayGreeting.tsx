import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Gift, Smile, Frown } from 'lucide-react';
import Confetti from 'react-confetti';
import ReactSound from 'react-sound';

const messages = [
  "Hello Khadijah,",
  "My adorably grumpy sour cow,",
  "And the prettiest ma'am alive,",
  "It's your special day, hehehe!",
  "Because you hold such a special place in my heart, I had to make something truly memorable for you.",
  "Do you want to see what I made just for you?"
];

const BirthdayGreeting = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const navigate = useNavigate();

  // Start music when component mounts
  useEffect(() => {
    setMusicPlaying(true);
  }, []);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        if (currentMessageIndex === messages.length - 1) {
          setShowButtons(true);
          setShowHearts(true);
        } else {
          setCurrentMessageIndex((prev) => prev + 1);
        }
      }, currentMessageIndex === 0 ? 3000 : 4000); // First message shorter
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  const handleYesButtonClick = () => {
    setShowButtons(false);
    setShowFinalMessage(true);
    setShowConfetti(true);
    setSoundPlaying(true);
    setTimeout(() => {
      navigate('/surprise');
    }, 3000);
  };

  const handleNoButtonClick = () => {
    setShowButtons(false);
    setTimeout(() => {
      alert("Nice try, Mam! But nah dekhna to padega itni mehnat se banaya hai 😭💕");
      handleYesButtonClick();
    }, 500);
  };

  // Floating hearts component
  const FloatingHearts = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            y: '100vh', 
            x: Math.random() * 100 + 'vw',
            opacity: 0
          }}
          animate={{
            y: '-10vh',
            x: Math.random() * 20 - 10 + 'vw',
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5
          }}
        >
          <Heart 
            className={i % 3 === 0 ? "text-pink-400" : i % 2 === 0 ? "text-purple-300" : "text-red-400"} 
            size={Math.random() * 20 + 16} 
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center relative overflow-hidden">
      {/* Background music */}
      {musicPlaying && (
        <ReactSound
          url="/sounds/birthday-music.mp3"
          playStatus={ReactSound.status.PLAYING}
          loop={true}
          volume={50}
        />
      )}
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          colors={['#ec4899', '#a855f7', '#6366f1', '#f472b6', '#d946ef']}
          recycle={false}
          gravity={0.2}
        />
      )}

      {/* Floating hearts */}
      {showHearts && <FloatingHearts />}

      <div className="max-w-2xl w-full mx-4 relative z-10">
        <AnimatePresence mode="wait">
          {!showFinalMessage ? (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center border-2 border-purple-200"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Sparkles className="inline-block text-yellow-400 mb-4" size={40} />
              </motion.div>
              
              <motion.p
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-2xl md:text-3xl font-bold text-purple-900 mb-6 leading-relaxed"
              >
                {messages[currentMessageIndex]}
              </motion.p>

              {showButtons && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <motion.button
                    onClick={handleYesButtonClick}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 text-lg font-semibold flex items-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(236, 72, 153, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Gift size={20} /> Yes! Show me!
                  </motion.button>
                  <motion.button
                    onClick={handleNoButtonClick}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-700 text-lg font-semibold flex items-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(109, 40, 217, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Frown size={20} /> No, thank you! 🙄
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 2, -2, 0] 
              }}
              transition={{ 
                duration: 1, 
                ease: 'easeInOut',
                rotate: {
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut'
                }
              }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center border-2 border-pink-200"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="inline-block text-red-500 mb-4" size={48} />
              </motion.div>
              <motion.p className="text-3xl font-bold text-pink-600 mb-6">
                Heheheheheh
              </motion.p>
              <motion.p className="text-xl text-purple-700">
                Have a look at it, Mam! 💕💕
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sound effects */}
      {soundPlaying && (
        <ReactSound
          url="/sounds/magic-chime.mp3"
          playStatus={ReactSound.status.PLAYING}
          onFinishedPlaying={() => setSoundPlaying(false)}
          volume={70}
        />
      )}

      {/* Footer signature */}
      <motion.div 
        className="absolute bottom-4 right-4 text-white/80 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Made with 💖 by Your Blue Unicorn (Y)
      </motion.div>
    </div>
  );
};

export default BirthdayGreeting;
