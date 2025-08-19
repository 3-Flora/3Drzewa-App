import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, TreePine, Award, Users, Eye, LogIn, UserPlus, Chrome } from 'lucide-react';
import Modal from '../components/UI/Modal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { RegisterData } from '../hooks/useAuth';

const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      onClose();
      navigate('/map');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      // TODO: Implement Google OAuth login
      // await loginWithGoogle();
      console.log('Google login not implemented yet');
    } catch (err) {
      setError('Błąd logowania przez Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setAppleLoading(true);
    try {
      // TODO: Implement Apple OAuth login
      // await loginWithApple();
      console.log('Apple login not implemented yet');
    } catch (err) {
      setError('Błąd logowania przez Apple');
    } finally {
      setAppleLoading(false);
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="rounded-2xl p-5 max-w-xs mx-auto border-2 border-emerald-200/50" style={{ 
        background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.98) 0%, rgba(220, 252, 231, 0.98) 100%)',
        backdropFilter: 'blur(15px)',
      }}>
          <div className="text-center mb-6">
            <img 
              src="/image copy.png" 
              alt="3Drzewa Logo" 
              className="w-16 h-16 mx-auto mb-3 object-cover rounded-full border-3 border-emerald-300 shadow-xl"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-1">Witamy w 3Drzewa</h2>
            <p className="text-gray-600 text-xs">Zaloguj się do swojego konta</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email lub telefon
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="jan.kowalski@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Hasło
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="ml-2 text-sm text-gray-600">Zapamiętaj mnie</span>
              </label>
              <button type="button" className="text-xs text-emerald-600 hover:text-emerald-700">
                Zapomniałeś hasła?
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-green py-3 px-4 rounded-lg transition-all duration-300 font-bold shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Zaloguj się'
                )}
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-lg text-gray-700 border-2 border-yellow-300 hover:border-yellow-400"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
                  backdropFilter: 'blur(15px)'
                }}
              >
                {googleLoading ? <LoadingSpinner size="sm" /> : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Zaloguj przez Google</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleAppleLogin}
                disabled={appleLoading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-lg text-gray-700 border-2 border-blue-300 hover:border-blue-400"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                  backdropFilter: 'blur(15px)'
                }}
              >
                {appleLoading ? <LoadingSpinner size="sm" /> : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span>Zaloguj przez Apple</span>
                  </>
                )}
              </button>

            </div>
          </form>
      </div>
    </Modal>
  );
};

const RegisterModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await register(formData);
      onClose();
      navigate('/map');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="rounded-2xl p-5 max-w-xs mx-auto" style={{ 
        background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.95) 0%, rgba(220, 252, 231, 0.95) 100%)',
        backdropFilter: 'blur(15px)',
        border: '2px solid rgba(34, 197, 94, 0.2)'
      }}>
          <div className="text-center mb-6">
            <img 
              src="/image copy.png" 
              alt="3Drzewa Logo" 
              className="w-16 h-16 mx-auto mb-4 object-cover rounded-full border-3 border-blue-300 shadow-xl"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-2">Witamy w 3Drzewa</h2>
            <p className="text-gray-600 text-sm">Utwórz nowe konto</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imię
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwisko
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+48 123 456 789"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hasło
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Potwierdzenie hasła
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-green py-3 px-4 rounded-lg transition-all duration-300 font-bold shadow-lg"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Zarejestruj się'}
            </button>
          </form>
      </div>
    </Modal>
  );
};

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const stats = [
    { icon: TreePine, value: '2,847', label: 'Drzew w rejestrze', color: 'text-green-600' },
    { icon: Award, value: '156', label: 'Pomników przyrody', color: 'text-amber-600' },
    { icon: Users, value: '1,234', label: 'Aktywnych użytkowników', color: 'text-blue-600' },
    { icon: Eye, value: '543', label: 'Oczekuje weryfikacji', color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
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

      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.3) 0%, rgba(239, 246, 255, 0.3) 50%, rgba(240, 253, 244, 0.3) 100%)'
        }}
      >
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center space-x-3 mb-8">
              <img 
                src="/image copy.png"
                alt="3Drzewa Logo" 
                className="w-24 h-24 object-cover rounded-full border-4 border-accent-400 shadow-2xl"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="text-accent-600">3Drzewa</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Społeczność miłośników przyrody dokumentująca najpiękniejsze drzewa Polski. 
              Dołącz do nas i pomóż chronić nasze dziedzictwo przyrodnicze.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {isAuthenticated ? (
                <Link
                  to="/map"
                  className="btn-green flex items-center justify-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  <TreePine className="w-6 h-6" />
                  <span>Przejdź do mapy</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="btn-green flex items-center justify-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                  >
                    <LogIn className="w-6 h-6" />
                    <span>Zaloguj się</span>
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="flex items-center justify-center space-x-2 glass glass-hover text-accent-600 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                  >
                    <UserPlus className="w-6 h-6" />
                    <span>Zarejestruj się</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`${stat.color} mb-2 flex justify-center`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Jak działamy?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Społeczność miłośników przyrody współtworząca największy rejestr polskich drzew
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Odkrywaj',
                description: 'Przeglądaj mapę drzew w całej Polsce i poznawaj ich historie',
                icon: '🗺️'
              },
              {
                title: 'Dokumentuj',
                description: 'Zgłaszaj nowe drzewa, dodawaj zdjęcia i opisy',
                icon: '📸'
              },
              {
                title: 'Chroń',
                description: 'Generuj wnioski do gmin o uznanie drzew za pomniki przyrody',
                icon: '🛡️'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
    </div>
  );
};

export default Home;