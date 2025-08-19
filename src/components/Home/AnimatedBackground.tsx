import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large Floating Glass Squares - Fixed Positions */}
      <motion.div
        className="absolute w-24 h-24 glass-primary rounded-3xl opacity-70"
        style={{ position: 'fixed', top: '8%', left: '5%' }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 90, 180],
          opacity: [0.7, 0.5, 0.3, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 10, ease: "easeOut" }
        }}
      />
      <motion.div
        className="absolute w-20 h-20 glass-secondary rounded-3xl opacity-65"
        style={{ position: 'fixed', top: '15%', right: '8%' }}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -90, -180],
          opacity: [0.65, 0.4, 0.2, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 12, ease: "easeOut" }
        }}
      />
      <motion.div
        className="absolute w-28 h-28 glass-accent rounded-3xl opacity-60"
        style={{ position: 'fixed', top: '25%', left: '15%' }}
        animate={{
          y: [0, -18, 0],
          rotate: [0, 45, 90],
          opacity: [0.6, 0.3, 0.1, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 15, ease: "easeOut" }
        }}
      />
      <motion.div
        className="absolute w-16 h-16 glass-primary rounded-3xl opacity-75"
        style={{ position: 'fixed', top: '35%', right: '20%' }}
        animate={{
          y: [0, 12, 0],
          rotate: [0, -45, -90],
          opacity: [0.75, 0.4, 0.1, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 11, ease: "easeOut" }
        }}
      />
      <motion.div
        className="absolute w-32 h-32 glass-secondary rounded-3xl opacity-55"
        style={{ position: 'fixed', top: '10%', left: '70%' }}
        animate={{
          y: [0, -22, 0],
          rotate: [0, 135, 270],
          opacity: [0.55, 0.3, 0.1, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 17, ease: "easeOut" }
        }}
      />
      <motion.div
        className="absolute w-22 h-22 glass-accent rounded-3xl opacity-65"
        style={{ position: 'fixed', top: '45%', left: '3%' }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, 22, 45],
          opacity: [0.65, 0.3, 0.1, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 14, ease: "easeOut" }
        }}
      />
      <motion.div
        className="absolute w-18 h-18 glass-primary rounded-3xl opacity-70"
        style={{ position: 'fixed', top: '55%', right: '12%' }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, -30, -60],
          opacity: [0.7, 0.3, 0.1, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 13, ease: "easeOut" }
        }}
      />
      
      {/* Ellipses Background - Only at top, fading out */}
      <motion.div 
        className="absolute w-80 h-80 bg-gradient-to-br from-emerald-200/40 to-emerald-400/30 rounded-full blur-3xl" 
        style={{ position: 'fixed', top: '5%', left: '-10%' }}
        animate={{ opacity: [0.4, 0.2, 0] }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute w-72 h-72 bg-gradient-to-br from-blue-200/40 to-blue-400/30 rounded-full blur-3xl" 
        style={{ position: 'fixed', top: '10%', right: '-15%' }}
        animate={{ opacity: [0.4, 0.2, 0] }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
    </div>
  );
};

export default AnimatedBackground;
