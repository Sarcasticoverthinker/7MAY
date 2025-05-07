import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music, Heart, Sparkles, Gift, MessageSquare } from 'lucide-react';

import Banner from './images/banner.png';
import Musicc from './musicc.mp3';
import CatCake from './images/cat-face-cake.jpg';
import Photo1 from './images/cat-face-cake.jpg';
import Photo2 from './images/cat-face-cake.jpg';
import Photo3 from './images/cat-face-cake.jpg';

// 1. StarryNight - COMPLETE AND UNCHANGED
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

// 2. FloatingHearts - COMPLETE AND UNCHANGED
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const buttonLabels = [
    "Let's Turn On the Lights",
    "Let's play music that sounds like you",
    "Let's Decorate the Room",
    "Let's Release the Balloons!",
    "💕💕💕"
  ];

  const buttonIcons = [
    <Sparkles key="sparkles" className="w-4 h-4" />,
    <Music key="music" className="w-4 h-4" />,
    <Gift key="gift" className="w-4 h-4" />,
    <Heart key="heart" className="w-4 h-4" />,
    <MessageSquare key="message" className="w-4 h-4" />
  ];

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
      {/* STAR FIELD */}
      <StarryNight />
      
      {/* FLOATING HEARTS */}
      {isLit && <FloatingHearts />}

      {/* CONFETTI */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(200)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{ 
                y: -10,
                x: Math.random() * 100 + 'vw',
                opacity: 1,
                scale: Math.random() + 0.5
              }}
              animate={{
                y: '100vh',
                x: Math.random() * 100 - 50 + 'vw',
                opacity: 0,
                rotate: 360
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "easeIn"
              }}
              style={{
                backgroundColor: ['#a855f7', '#9333ea', '#c084fc', '#d8b4fe', '#f472b6'][i % 5]
              }}
            />
          ))}
        </div>
      )}

      {/* DECORATIVE LIGHTS */}
      {isLit && (
        <div className="absolute top-4 left-0 right-0 flex justify-around">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: ['#a855f7', '#9333ea', '#c084fc', '#d8b4fe'][i % 4],
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      )}

      {/* BANNER */}
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

      {/* BALLOONS */}
      {stage >= 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ bottom: '-10vh', left: `${Math.random() * 100}vw` }}
              animate={{
                bottom: '120vh',
                left: `${Math.random() * 100}vw`,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <motion.div
                className="w-6 md:w-8 h-8 md:h-12 rounded-t-full"
                style={{
                  backgroundColor: ['#c084fc', '#a78bfa', '#d8b4fe', '#e9d5ff', '#f472b6'][i % 5],
                }}
                animate={{
                  y: [0, -10, 0],
                rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="w-0.5 h-12 md:h-16 bg-gray-400 mx-auto" />
            </motion.div>
          ))}
        </div>
      )}

      {/* PHOTO GALLERY - NOW WITH 4 CAKE IMAGES */}
      {showPhotos && (
        <div className="absolute inset-0 flex justify-center items-center gap-4 pointer-events-none">
          <motion.img
            src={Photo1}
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg border-2 border-white"
            alt="Cake Photo 1"
            initial={{ y: 100, opacity: 0, rotate: -15 }}
            animate={{ y: 0, opacity: 1, rotate: -5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <motion.img
            src={Photo2}
            className="w-32 h-32 md:w-40 md:h-40 rounded-lg shadow-lg border-2 border-white z-10"
            alt="Cake Photo 2"
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.img
            src={Photo3}
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg border-2 border-white"
            alt="Cake Photo 3"
            initial={{ y: 100, opacity: 0, rotate: 15 }}
            animate={{ y: 0, opacity: 1, rotate: 5 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.img
            src={CatCake}
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg border-2 border-white"
            alt="Cake Photo 4"
            initial={{ y: 100, opacity: 0, scale: 1.2 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
        </div>
      )}

      {/* MUSIC PLAYER */}
      <audio ref={audioRef} loop>
        <source src={Musicc} type="audio/mpeg" />
      </audio>

      {/* MUSIC ICON */}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4"
        >
          <Music className="w-6 h-6 md:w-8 md:h-8 text-purple-500 animate-pulse" />
        </motion.div>
      )}

      {/* MAIN BUTTON */}
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
