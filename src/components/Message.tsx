import React from 'react';
import { motion } from 'framer-motion';

const Message = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-400 to-purple-700 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-2xl w-full bg-white/70 backdrop-blur-2xl border border-purple-500 p-10 rounded-3xl shadow-purple-600 shadow-lg text-center relative"
      >
        <h1 className="text-5xl font-serif font-bold text-purple-900 mb-4 tracking-wider drop-shadow-md">
          To the Queen of Grace,
        </h1>

        <div className="w-20 h-1 mx-auto bg-purple-600 rounded-full mb-6 shadow-md" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl text-purple-800 italic leading-relaxed mb-6"
        >
          The epitome of beauty and grace, unmatched in the entire world — wrapped in eyeliner, gloss, and purple dreams.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg text-purple-900 leading-relaxed mb-6"
        >
          On your birthday, I just want to say I'm so lucky to have met you. I hope your day is full of love and happiness.
        </motion.p>

        <p className="text-lg text-purple-800 font-semibold tracking-wide mb-2">
          On your special day, I wish you the happiest birthday!.
        </p>

        <p className="text-md text-purple-700 mb-4 font-medium">
          Happy Birthday, BBG — my purple princess.
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 px-7 py-3 bg-purple-800 hover:bg-purple-900 text-white rounded-full font-semibold text-lg shadow-md hover:shadow-purple-900 transition-all duration-300"
        >
          Click to Reveal a Surprise
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Message;
