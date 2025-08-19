import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, TreePine, Calendar, MapPin, Edit, Award, CheckCircle, Clock, Settings, FileText, Leaf, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { fetchUserTrees } from '../utils/api';
import { TreeSubmission } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Profile = () => {
  const { user, logout } = useAuth();
  const [userTrees, setUserTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadUserTrees();
    }
  }, [user]);

  const loadUserTrees = async () => {
    if (!user) return;
    try {
      const trees = await fetchUserTrees(user.id);
      setUserTrees(trees);
    } catch (error) {
      console.error('Error loading user trees:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monument':
        return <Award className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'monument':
        return 'Pomnik przyrody';
      case 'approved':
        return 'Zatwierdzony';
      case 'pending':
        return 'Oczekuje';
      default:
        return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monument':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Nie jesteś zalogowany
          </h3>
          <Link
            to="/"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Przejdź do logowania
          </Link>
        </div>
      </div>
    );
  }

  const monumentCount = userTrees.filter(t => t.status === 'monument').length;
  const approvedCount = userTrees.filter(t => t.status === 'approved').length;
  const pendingCount = userTrees.filter(t => t.status === 'pending').length;

  const profileSections = [
    {
      id: 'trees',
      title: 'Moje drzewa',
      icon: TreePine,
      emoji: '🌳',
      description: `${userTrees.length} zgłoszonych drzew`,
      color: 'emerald'
    },
    {
      id: 'stats',
      title: 'Statystyki',
      icon: Award,
      emoji: '📊',
      description: `${monumentCount} pomników, ${approvedCount} zatwierdzonych`,
      color: 'blue'
    },
    {
      id: 'settings',
      title: 'Ustawienia konta',
      icon: Settings,
      emoji: '⚙️',
      description: 'Zarządzaj swoim kontem',
      color: 'gray'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 border-4 border-emerald-200">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-6 border-white shadow-2xl"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-200 rounded-full flex items-center justify-center border-6 border-white shadow-2xl">
                <User className="w-12 h-12 md:w-16 md:h-16 text-emerald-700" />
              </div>
            )}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{user.name}</h1>
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg">{user.email}</p>
              <div className="grid grid-cols-3 gap-2 md:gap-6 text-center">
                <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-xl border-2 border-emerald-100">
                  <div className="text-xl md:text-3xl font-bold text-emerald-600 mb-1">{user.submissionsCount}</div>
                  <div className="text-xs md:text-sm text-gray-600 font-semibold">Zgłoszeń</div>
                </div>
                <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-xl border-2 border-blue-100">
                  <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1">{user.verificationsCount}</div>
                  <div className="text-xs md:text-sm text-gray-600 font-semibold">Weryfikacji</div>
                </div>
                <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-xl border-2 border-yellow-100">
                  <div className="text-xl md:text-3xl font-bold text-yellow-600 mb-1">{monumentCount}</div>
                  <div className="text-xs md:text-sm text-gray-600 font-semibold">Pomników</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-6 py-3 rounded-2xl transition-all duration-300 font-bold shadow-2xl flex items-center space-x-2 hover:scale-105 text-sm md:text-base">
                <Edit className="w-5 h-5" />
                <span>Edytuj profil</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center justify-center space-x-2 px-4 md:px-6 py-3 bg-red-500/70 hover:bg-red-600/80 text-white rounded-2xl transition-all duration-300 font-bold shadow-2xl hover:scale-105 text-sm md:text-base"
              >
                <LogOut className="w-5 h-5" />
                <span>Wyloguj się</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/forms"
            className="glass rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 glass-hover group hover:scale-105"
          >
            <div className="flex items-center space-x-6">
              <div className="p-4 glass-accent rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Moje wnioski</h3>
                <p className="text-sm text-gray-600">Zarządzaj wnioskami do gmin</p>
              </div>
            </div>
          </Link>
          <Link
            to="/species"
            className="glass rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 glass-hover group hover:scale-105"
          >
            <div className="flex items-center space-x-6">
              <div className="p-4 glass-primary rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Gatunki drzew</h3>
                <p className="text-sm text-gray-600">Encyklopedia gatunków</p>
              </div>
            </div>
          </Link>
          <Link
            to="/verify"
            className="glass rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 glass-hover group hover:scale-105"
          >
            <div className="flex items-center space-x-6">
              <div className="p-4 glass-secondary rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Weryfikacja</h3>
                <p className="text-sm text-gray-600">Pomóż społeczności</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Profile Sections - Vertical Layout */}
        <div className="space-y-6">
          {profileSections.map((section) => (
            <div key={section.id} className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full p-8 text-left hover:bg-${section.color}-25 transition-all duration-300 flex items-center justify-between group`}
              >
                <div className="flex items-center space-x-6">
                  <div className={`p-4 bg-${section.color}-100 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-3xl">{section.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  {activeSection === section.id ? (
                    <ChevronUp className="w-8 h-8" />
                  ) : (
                    <ChevronDown className="w-8 h-8" />
                  )}
                </div>
              </button>

              {activeSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t-2 border-gray-100"
                >
                  <div className="p-8">
                    {/* Trees Section */}
                    {section.id === 'trees' && (
                      <div className="space-y-6">
                        {loading ? (
                          <div className="text-center py-12">
                            <LoadingSpinner size="lg" />
                            <p className="mt-4 text-gray-600">Ładowanie Twoich drzew...</p>
                          </div>
                        ) : userTrees.length === 0 ? (
                          <div className="text-center py-16">
                            <TreePine className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-2xl font-medium text-gray-800 mb-4">
                              Nie masz jeszcze zgłoszonych drzew
                            </h3>
                            <p className="text-gray-600 mb-8">
                              Zacznij dokumentować pomniki przyrody w swojej okolicy
                            </p>
                            <Link
                              to="/submit"
                              className="inline-flex items-center space-x-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all duration-300 font-bold shadow-2xl hover:scale-105"
                            >
                              <TreePine className="w-6 h-6" />
                              <span>Zgłoś pierwsze drzewo</span>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {userTrees.map((tree, index) => (
                              <motion.div
                                key={tree.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-emerald-200"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-4 mb-3">
                                      <h3 className="text-xl font-bold text-gray-800">{tree.species}</h3>
                                      <div className="flex items-center space-x-2">
                                        {getStatusIcon(tree.status)}
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(tree.status)}`}>
                                          {getStatusLabel(tree.status)}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600 italic mb-3">{tree.speciesLatin}</p>
                                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{tree.location.address}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(tree.submissionDate).toLocaleDateString('pl-PL')}</span>
                                      </div>
                                    </div>
                                    <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                                      {tree.description}
                                    </p>
                                    <div className="flex items-center space-x-4 text-sm">
                                      <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold">
                                        📏 Pierśnica: {tree.circumference} cm
                                      </span>
                                      {tree.height && (
                                        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
                                          📐 Wysokość: {tree.height} m
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {tree.images.length > 0 && (
                                    <img
                                      src={tree.images[0]}
                                      alt={tree.species}
                                      className="w-24 h-24 object-cover rounded-2xl ml-6 border-3 border-gray-200 shadow-lg"
                                    />
                                  )}
                                </div>
                                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t-2 border-gray-200">
                                  <Link
                                    to={`/tree/${tree.id}`}
                                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all duration-300 font-bold text-sm shadow-lg hover:scale-105"
                                  >
                                    Zobacz szczegóły
                                  </Link>
                                  <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-bold text-sm shadow-lg hover:scale-105">
                                    Edytuj
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stats Section */}
                    {section.id === 'stats' && (
                      <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border-3 border-emerald-200 shadow-xl">
                            <h3 className="font-bold text-gray-800 mb-6 text-xl">📊 Status zgłoszeń</h3>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-semibold">🏆 Pomniki przyrody</span>
                                <span className="font-bold text-yellow-600 text-xl">{monumentCount}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-semibold">✅ Zatwierdzone</span>
                                <span className="font-bold text-emerald-600 text-xl">{approvedCount}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-semibold">⏳ Oczekujące</span>
                                <span className="font-bold text-yellow-600 text-xl">{pendingCount}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-3 border-blue-200 shadow-xl">
                            <h3 className="font-bold text-gray-800 mb-6 text-xl">📈 Aktywność</h3>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-semibold">📅 Członek od</span>
                                <span className="font-bold text-blue-600">
                                  {new Date(user.registrationDate).toLocaleDateString('pl-PL')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-semibold">🔍 Weryfikacje</span>
                                <span className="font-bold text-blue-600 text-xl">{user.verificationsCount}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-semibold">🌳 Zgłoszenia</span>
                                <span className="font-bold text-blue-600 text-xl">{user.submissionsCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Settings Section */}
                    {section.id === 'settings' && (
                      <div className="text-center py-16">
                        <Settings className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-medium text-gray-800 mb-4">
                          Ustawienia konta
                        </h3>
                        <p className="text-gray-600 mb-8">
                          Funkcjonalność w przygotowaniu
                        </p>
                        <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:bg-emerald-700 transition-all duration-300 font-bold shadow-2xl hover:scale-105">
                          Wkrótce dostępne
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;