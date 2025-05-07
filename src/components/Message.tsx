import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift, ChevronDown, Star, Moon, Sun } from 'lucide-react';

const Message = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showButterflies, setShowButterflies] = useState(false);

  const handleButtonClick = () => {
    setShowSurprise(true);
    setShowHearts(true);
    setShowStars(true);
    setShowButterflies(true);
  };

  // Font classes for easy reuse
  const fonts = {
    heading: "font-['Playfair_Display'] font-bold",
    subheading: "font-['Dancing_Script'] font-semibold",
    body: "font-['Montserrat'] font-normal",
    special: "font-['Great_Vibes'] font-normal",
    elegant: "font-['Cormorant_Garamond'] font-medium italic"
  };

  // Optimized butterfly component
  const Butterfly = ({ index }: { index: number }) => {
    const duration = 15 + Math.random() * 5;
    const delay = Math.random() * 5;
    const xStart = Math.random() * 100;
    const xEnd = xStart + (Math.random() * 20 - 10);
    
    return (
      <motion.div
        className="absolute"
        initial={{ 
          y: '110vh', 
          x: `${xStart}vw`,
          opacity: 0,
        }}
        animate={{
          y: '-10vh',
          x: `${xEnd}vw`,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
        style={{
          willChange: 'transform, opacity',
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`text-2xl ${index % 2 === 0 ? 'text-purple-400' : 'text-pink-300'}`}
        >
          🦋
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-200 to-purple-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Load fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Dancing+Script:wght@600&family=Great+Vibes&family=Montserrat&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap');
      `}</style>

      {/* Purple floral overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral.png')] opacity-10 pointer-events-none" />
      
      {/* Floating elements */}
      <AnimatePresence>  
        {showHearts && (  
          <div className="absolute inset-0 pointer-events-none">  
            {[...Array(10)].map((_, i) => {
              const duration = 15 + Math.random() * 5;
              const delay = Math.random() * 5;
              const xStart = Math.random() * 100;
              const xEnd = xStart + (Math.random() * 20 - 10);
              
              return (
                <motion.div  
                  key={`heart-${i}`}  
                  className="absolute"  
                  initial={{   
                    y: '100vh',   
                    x: `${xStart}vw`,  
                    opacity: 0,  
                  }}  
                  animate={{  
                    y: '-10vh',  
                    x: `${xEnd}vw`,  
                    opacity: [0, 1, 1, 0],  
                  }}  
                  transition={{  
                    duration,
                    repeat: Infinity,  
                    ease: 'linear',  
                    delay,
                  }}  
                  style={{
                    willChange: 'transform, opacity',
                  }}
                >  
                  <Heart   
                    className={i % 3 === 0 ? "text-pink-400" :  
                              i % 2 === 0 ? "text-purple-300" : "text-red-400"}   
                    size={Math.random() * 20 + 12}   
                  />  
                </motion.div>  
              );
            })}  
          </div>  
        )}  

        {showButterflies && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <Butterfly key={`butterfly-${i}`} index={i} />
            ))}
          </div>
        )}

        {showStars && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => {
              const duration = 3 + Math.random() * 5;
              const delay = Math.random() * 3;
              const yPos = Math.random() * 100;
              const xPos = Math.random() * 100;
              
              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute"
                  initial={{
                    y: `${yPos}vh`,
                    x: `${xPos}vw`,
                    opacity: 0,
                  }}
                  animate={{
                    y: `${yPos}vh`,
                    x: `${xPos}vw`,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    delay
                  }}
                  style={{
                    willChange: 'transform, opacity',
                  }}
                >
                  <Star className="text-yellow-300" size={Math.random() * 10 + 6} />
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>  

      <motion.div  
        initial={{ opacity: 0, y: 40 }}  
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 1, delay: 0.2 }}  
        className={`max-w-2xl w-full bg-white/90 backdrop-blur-sm border border-purple-300/50 p-8 md:p-12 rounded-3xl shadow-xl shadow-purple-500/20 text-center relative z-10 ${fonts.body}`}  
      >  
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-purple-200/30 backdrop-blur-sm border border-purple-300/50 flex items-center justify-center">
          <Moon className="text-purple-600" size={24} />
        </div>
        <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-pink-200/30 backdrop-blur-sm border border-pink-300/50 flex items-center justify-center">
          <Sun className="text-pink-600" size={24} />
        </div>

        {/* Animated sparkles */}
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

        <h1 className={`text-4xl md:text-5xl mb-6 tracking-wider text-purple-900 ${fonts.heading}`}>  
          Dear Khadijah,
        </h1>  

        <div className="w-20 h-1 mx-auto bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 rounded-full mb-8" />  

        <motion.p  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          transition={{ duration: 1, delay: 0.5 }}  
          className={`text-xl md:text-2xl italic leading-relaxed mb-8 text-purple-800 ${fonts.elegant}`}  
        >  
          To the epitome of beauty and grace, unmatched in the entire world, to the woman who illuminates everything with her grace, and whose heart shines brighter than the stars, my purple queen.
        </motion.p>  

        <motion.p  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          transition={{ duration: 1, delay: 0.8 }}  
          className="text-lg md:text-xl text-purple-900 leading-relaxed mb-8"  
        >  
          On this special day, I just want to say I'm so lucky to have met you. I want you to know that how incredibly grateful I am to have you in my life. I pray that your days, weeks, months, and years ahead are filled with barakah, warmth, love, and the kind of happiness that brings peace to your heart.
        </motion.p>  

        <AnimatePresence mode="wait">  
          {!showSurprise ? (  
            <>  
              <motion.p   
                initial={{ opacity: 0 }}  
                animate={{ opacity: 1 }}  
                transition={{ duration: 1, delay: 1 }}  
                className={`text-xl text-purple-800 tracking-wide mb-4 ${fonts.special}`}  
              >  
                Wishing you the happiest birthday
              </motion.p>  

              <motion.p  
                initial={{ opacity: 0 }}  
                animate={{ opacity: 1 }}  
                transition={{ duration: 1, delay: 1.2 }}  
                className={`text-2xl text-purple-700 mb-8 ${fonts.subheading}`}  
              >  
                Happy Birthday, My Queen 💜
              </motion.p>  

              <motion.button  
                initial={{ opacity: 0 }}  
                animate={{ opacity: 1 }}  
                transition={{ duration: 1, delay: 1.4 }}  
                onClick={handleButtonClick}  
                whileHover={{ scale: 1.05 }}  
                whileTap={{ scale: 0.95 }}  
                className={`mt-6 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white rounded-full text-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-3 mx-auto ${fonts.body} font-semibold`}  
              >  
                <Gift size={24} className="text-yellow-200" />  
                A Little Heartfelt Note
                <ChevronDown size={20} className="animate-bounce text-purple-100" />  
              </motion.button>  
            </>  
          ) : (  
            <motion.div  
              key="surprise"  
              initial={{ opacity: 0, y: 20 }}  
              animate={{ opacity: 1, y: 0 }}  
              exit={{ opacity: 0 }}  
              transition={{ duration: 0.8 }}  
              className={`mt-6 p-8 bg-gradient-to-br from-purple-100/80 to-pink-100/80 rounded-xl border border-purple-300/50 shadow-inner ${fonts.body}`}  
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
                className="mb-6"  
              >  
                <Heart className="text-pink-500 mx-auto" size={48} fill="#ec4899" />  
              </motion.div>  
              <p className={`text-2xl text-purple-800 mb-3 ${fonts.special}`}>  
                Pretty Princess,
              </p>  
              <p className={`text-purple-700 ${fonts.subheading} text-3xl mb-4`}>  
                Khadijah,
              </p>
              <p className="text-purple-600 italic">
                This idiot might get on your nerves sometimes, but he never means to hurt you. If he's ever messed up, he's truly sorry. Just know - he cares deeply, and all he ever asks is that you keep talking, keep trusting, and never stop choosing us.
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-4xl"
              >
                🦋💜
              </motion.div>
            </motion.div>  
          )}  
        </AnimatePresence>  
      </motion.div>  
    </div>
  );
};

export default Message;
