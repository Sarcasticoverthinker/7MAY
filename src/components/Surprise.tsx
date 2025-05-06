import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music } from 'lucide-react';

import Banner from './images/banner.png';
import Musicc from './musicc.mp3';
import CatCake from './images/cat-face-cake.jpg';

const StarryNight = () => {
  const [stars, setStars] = useState<{ top: string; left: string; opacity: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      let newStars: { top: string; left: string; opacity: number }[] = [];
      for (let i = 0; i < 100; i++) {
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
    <div className="absolute inset-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: star.opacity,
            animation: 'twinkle 1.5s infinite ease-in-out',
          }}
        />
      ))}
    </div>
  );
};

const Surprise = () => {
  const [stage, setStage] = useState(0);
  const [isLit, setIsLit] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const buttonLabels = [
    "Lights On",
    "Play Music",
    "Decorate",
    "Fly the Balloons",
    "Let's Cut the Cake Mam :)",
    "Well, I Have a Message for Khadijah"
  ];

  const handleClick = () => {
    if (stage === 0) {
      setIsLit(true);
    } else if (stage === 1 && audioRef.current) {
      audioRef.current.play();
    } else if (stage === 5) {
      navigate('/message');
      return;
    }
    setStage((prev) => prev + 1);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
        isLit
          ? 'bg-gradient-to-br from-purple-100 via-purple-300 to-purple-500'
          : 'bg-gray-900'
      }`}
    >
      <StarryNight />

      {isLit && (
        <div className="absolute top-4 left-0 right-0 flex justify-around">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full animate-pulse"
              style={{
                backgroundColor: ['#a855f7', '#9333ea', '#c084fc', '#d8b4fe'][i % 4],
                animation: `pulse 1s ease-in-out infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {stage >= 3 && (
        <motion.h1
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
        </motion.h1>
      )}

      {stage >= 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ bottom: '-10vh', left: `${Math.random() * 100}vw` }}
              animate={{
                bottom: '120vh',
                left: `${Math.random() * 100}vw`,
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <div
                className="w-6 md:w-8 h-8 md:h-12 rounded-t-full"
                style={{
                  backgroundColor: ['#c084fc', '#a78bfa', '#d8b4fe', '#e9d5ff'][i % 4],
                }}
              />
              <div className="w-0.5 h-12 md:h-16 bg-gray-400 mx-auto" />
            </motion.div>
          ))}
        </div>
      )}

      {stage >= 5 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute flex justify-center items-center w-full"
          style={{ top: '50%' }}
        >
          <img
            src={CatCake}
            className="w-full max-w-xs md:max-w-md h-auto mt-10 pt-10"
            alt="Cat Cake"
          />
        </motion.div>
      )}

      <audio ref={audioRef} loop>
        <source src={Musicc} type="audio/mpeg" />
      </audio>

      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4"
        >
          <Music className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
        </motion.div>
      )}

      <div className="absolute inset-x-0 flex justify-center items-center px-4 mt-20 py-4">
        <motion.button
          onClick={handleClick}
          className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base text-white font-semibold shadow-lg w-full max-w-sm ${
            isLit
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-purple-400 hover:bg-purple-500'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ transformOrigin: 'center' }}
        >
          {buttonLabels[stage]}
        </motion.button>
      </div>
    </div>
  );
};

export default Surprise;
