import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music, Heart, Sparkles, Gift, Cake, MessageSquare } from 'lucide-react';

import Banner from './images/banner.png';
import Musicc from './musicc.mp3';
import CatCake from './images/cat-face-cake.jpg';
import Photo1 from './images/cat-face-cake.jpg';
import Photo2 from './images/cat-face-cake.jpg';

// StarryNight component remains exactly the same
const StarryNight = () => {
  const [stars, setStars] = useState<{ top: string; left: string; opacity: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      let newStars: { top: string; left: string; opacity: number }[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
          opacity: Math.random(),
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.5, star.opacity],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// FloatingHearts component remains exactly the same
const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
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
  );
};

const Surprise = () => {
  const [stage, setStage] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [cakeCutConfetti, setCakeCutConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const buttonLabels = [
    "Let's Turn On the Lights",
    "Let's play music that sounds like you",
    "Let's Decorate the Room",
    "Let's Release the Balloons!",
    "Let's Cut the Cake!",
    "💕💕💕"
  ];

  const buttonIcons = [
    <Sparkles key="sparkles" className="w-4 h-4" />,
    <Music key="music" className="w-4 h-4" />,
    <Gift key="gift" className="w-4 h-4" />,
    <Heart key="heart" className="w-4 h-4" />,
    <Cake key="cake" className="w-4 h-4" />,
    <MessageSquare key="message" className="w-4 h-4" />
  ];

  // Auto-cut cake (simplified - no knife animation)
  useEffect(() => {
    if (stage === 5) { 
      const timer = setTimeout(() => {
        setIsCakeCut(true);
        setCakeCutConfetti(true);
        setTimeout(() => setCakeCutConfetti(false), 3000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleClick = () => {
    if (stage === 0) {
      setIsLit(true);
    } else if (stage === 1 && audioRef.current) {
      audioRef.current.play();
    } else if (stage === 3) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else if (stage === 4) {
      setShowPhotos(true);
    } else if (stage === 5) {
      navigate('/message');
      return;
    }
    setStage((prev) => prev + 1);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
      isLit ? 'bg-gradient-to-br from-purple-50 via-purple-200 to-purple-400' : 'bg-gray-900'
    }`}>
      {/* All decorative elements remain exactly the same */}
      <StarryNight />
      {isLit && <FloatingHearts />}

      {/* Confetti effects remain */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {/* ... existing confetti code ... */}
        </div>
      )}

      {cakeCutConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {/* ... cake cut confetti code ... */}
        </div>
      )}

      {/* All existing decorative elements remain */}
      {isLit && (
        <div className="absolute top-4 left-0 right-0 flex justify-around">
          {/* ... existing decorative lights ... */}
        </div>
      )}

      {/* Banner remains */}
      {stage >= 3 && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: -20, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 flex justify-center items-start mt-40"
        >
          <img
            src={Banner}
            className="w-full max-w-xs md:max-w-md h-auto mt-10 pt-10"
            alt="Happy Birthday"
          />
        </motion.div>
      )}

      {/* Balloons remain */}
      {stage >= 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {/* ... existing balloons code ... */}
        </div>
      )}

      {/* Cake Section - Removed knife but kept cut effect */}
      {stage >= 5 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute flex justify-center items-center w-full"
          style={{ top: '50%' }}
        >
          <div className="relative">
            <img
              src={CatCake}
              className={`w-full max-w-xs md:max-w-md h-auto mt-10 pt-10 rounded-lg shadow-xl border-4 border-white transition-all duration-500 ${
                isCakeCut ? 'opacity-80 grayscale-[20%]' : 'opacity-100'
              }`}
              alt="Cat Cake"
            />
            
            {isCakeCut && (
              <>
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/2 w-1 h-32 bg-white"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Photos remain */}
      {showPhotos && (
        <div className="absolute inset-0 flex justify-center items-center gap-4 pointer-events-none">
          {/* ... existing photos code ... */}
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src={Musicc} type="audio/mpeg" />
      </audio>

      {/* Music indicator remains */}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4"
        >
          <Music className="w-6 h-6 md:w-8 md:h-8 text-purple-500 animate-pulse" />
        </motion.div>
      )}

      {/* Button remains */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center items-center px-4 py-4">
        <motion.button
          onClick={handleClick}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-semibold shadow-lg w-full max-w-sm flex items-center justify-center gap-2 ${
            isLit
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
              : 'bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500'
          }`}
          whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          style={{ transformOrigin: 'center' }}
        >
          {buttonIcons[stage]}
          <span className="text-sm md:text-base">{buttonLabels[stage]}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Surprise;
