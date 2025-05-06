import React from 'react';
import { motion } from 'framer-motion';

const Message = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-300 to-purple-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-2xl w-full bg-white/80 backdrop-blur-xl border border-purple-300 p-8 rounded-3xl shadow-2xl text-center relative"
      >
        <h1 className="text-5xl font-serif font-extrabold text-purple-800 mb-4 tracking-wide">
          To the Queen of Grace,
        </h1>
        <div className="w-16 h-1 mx-auto bg-purple-500 rounded-full mb-6" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl text-gray-800 leading-relaxed italic mb-6"
        >
          The epitome of beauty and grace, unmatched in the entire world.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-lg text-gray-700 leading-relaxed mb-6"
        >
          On your birthday, I just want to say I'm so lucky to have met you. I hope your day is full of love and happiness.
        </motion.p>

        <p className="text-lg text-purple-700 font-semibold tracking-wide">
          On your special day, I wish you the happiest birthday!.
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-8 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
        >
          Click to Reveal a Surprise
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Message;
