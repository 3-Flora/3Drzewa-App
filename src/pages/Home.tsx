import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginModal from '../components/Auth/LoginModal';
import RegisterModal from '../components/Auth/RegisterModal';
import AnimatedBackground from '../components/Home/AnimatedBackground';
import HeroSection from '../components/Home/HeroSection';
import StatsSection from '../components/Home/StatsSection';
import FeaturesSection from '../components/Home/FeaturesSection';

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <AnimatedBackground />
      
      <HeroSection 
        isAuthenticated={isAuthenticated}
        onShowLogin={() => setShowLoginModal(true)}
        onShowRegister={() => setShowRegisterModal(true)}
      />
      
      <StatsSection />
      <FeaturesSection />

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
    </div>
  );
};

export default Home;