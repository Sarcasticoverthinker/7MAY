import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Gift, Smile, Frown } from 'lucide-react';
import Confetti from 'react-confetti';
import ReactSound from 'react-sound';

// Add this in your CSS or via a font CDN
const fontStyle = {
  fontFamily: "'Dancing Script', cursive, 'Pacifico', cursive, 'Great Vibes', cursive, sans-serif",
};

const messages = [
  "Hello Khadijah,",
  "My adorably grumpy sour cow,",
  "And the prettiest ma'am alive,",
  "It's your special day, hehehe!",
  "Because you hold such a special place in my heart,",
  "I had to make something truly memorable for you.",
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

  // Load fonts dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Pacifico&family=Great+Vibes&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    setMusicPlaying(true);
    return () => document.head.removeChild(link);
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
      }, currentMessageIndex === 0 ? 3000 : 3500); // Adjusted timing
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
      alert("Awww come on Mam! You know you want to see it 😘💕");
      handleYesButtonClick();
    }, 500);
  };

  // Floating hearts component
  const FloatingHearts = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(40)].map((_, i) => (
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
            delay: Math.random() * 8
          }}
        >
          <Heart 
            className={i % 4 === 0 ? "text-pink-400" : 
                      i % 3 === 0 ? "text-purple-300" : 
                      i % 2 === 0 ? "text-red-400" : "text-yellow-300"} 
            size={Math.random() * 24 + 16} 
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
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
          numberOfPieces={300}
          colors={['#ec4899', '#a855f7', '#f472b6', '#d946ef', '#f59e0b']}
          recycle={false}
          gravity={0.15}
          wind={0.05}
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
              className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center border-2 border-purple-300"
              style={fontStyle}
            >
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
              >
                <Sparkles className="inline-block text-yellow-300 mb-4" size={48} />
              </motion.div>
              
              <motion.p
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 leading-relaxed"
                style={{ 
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                  fontFamily: "'Dancing Script', cursive" 
                }}
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
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 text-xl font-semibold flex items-center gap-3"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 5px 20px rgba(236, 72, 153, 0.5)",
                      rotate: [0, 5, -5, 0]
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={fontStyle}
                  >
                    <Gift size={24} /> Yes please! 💝
                  </motion.button>
                  <motion.button
                    onClick={handleNoButtonClick}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-700 text-xl font-semibold flex items-center gap-3"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 5px 20px rgba(109, 40, 217, 0.5)",
                      rotate: [0, 5, -5, 0]
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={fontStyle}
                  >
                    <Frown size={24} /> No, thank you 🙄🙄
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
                rotate: [0, 3, -3, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 1.5, 
                ease: 'easeInOut',
                rotate: {
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut'
                },
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut'
                }
              }}
              className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center border-2 border-pink-300"
              style={fontStyle}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 20, -20, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Heart className="inline-block text-red-500 mb-6" size={60} />
              </motion.div>
              <motion.p 
                className="text-4xl font-bold text-pink-600 mb-6"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Heheheheheh!
              </motion.p>
              <motion.p 
                className="text-2xl text-purple-700"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
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
        className="absolute bottom-4 right-4 text-white/90 text-lg"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Made with love by Your Blue Unicorn 💙🦄
      </motion.div>
    </div>
  );
};

export default BirthdayGreeting;
