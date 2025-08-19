import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Leaf, 
  TreePine, 
  Calendar,
  MapPin,
  Book,
  Camera,
  Info,
  CheckCircle
} from 'lucide-react';
import { fetchSpeciesById } from '../utils/api';
import { TreeSpecies } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const SpeciesDetail = () => {
  const { speciesId } = useParams<{ speciesId: string }>();
  const [species, setSpecies] = useState<TreeSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'identification' | 'seasonal' | 'gallery'>('overview');

  useEffect(() => {
    if (speciesId) {
      loadSpecies(speciesId);
    }
  }, [speciesId]);

  const loadSpecies = async (id: string) => {
    try {
      const speciesData = await fetchSpeciesById(id);
      setSpecies(speciesData);
    } catch (error) {
      console.error('Error loading species:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie gatunku...</p>
        </div>
      </div>
    );
  }

  if (!species) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <TreePine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Gatunek nie znaleziony
          </h3>
          <Link
            to="/species"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Powrót do encyklopedii
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: Info },
    { id: 'identification', label: 'Identyfikacja', icon: Camera },
    { id: 'seasonal', label: 'Zmiany sezonowe', icon: Calendar },
    { id: 'gallery', label: 'Galeria', icon: Book },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link
            to="/species"
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Powrót do encyklopedii</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img
              src={species.images.tree}
              alt={species.namePolish}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-3xl font-bold mb-2">{species.namePolish}</h1>
              <p className="text-lg italic opacity-90">{species.nameLatin}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span>Rodzina: {species.family}</span>
                {species.characteristics.nativeToPoland && (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Gatunek rodzimy</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-green-500 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Opis gatunku</h3>
                  <p className="text-gray-700 leading-relaxed">{species.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TreePine className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-800">Wysokość</h4>
                    </div>
                    <p className="text-gray-700">{species.characteristics.maxHeight}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-800">Żywotność</h4>
                    </div>
                    <p className="text-gray-700">{species.characteristics.lifespan}</p>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-amber-600" />
                      <h4 className="font-semibold text-gray-800">Pochodzenie</h4>
                    </div>
                    <p className="text-gray-700">
                      {species.characteristics.nativeToPoland ? 'Gatunek rodzimy' : 'Gatunek introdukowany'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Identification Tab */}
            {activeTab === 'identification' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Cechy identyfikacyjne</h3>
                  <div className="space-y-3">
                    {species.identificationTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Liście</h4>
                    <img
                      src={species.images.leaves}
                      alt="Liście"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Kora</h4>
                    <img
                      src={species.images.bark}
                      alt="Kora"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Seasonal Tab */}
            {activeTab === 'seasonal' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Zmiany sezonowe</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🌱 Wiosna</h4>
                    <p className="text-gray-700">{species.seasonalChanges.spring}</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">☀️ Lato</h4>
                    <p className="text-gray-700">{species.seasonalChanges.summer}</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">🍂 Jesień</h4>
                    <p className="text-gray-700">{species.seasonalChanges.autumn}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">❄️ Zima</h4>
                    <p className="text-gray-700">{species.seasonalChanges.winter}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Galeria zdjęć</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">Pokrój drzewa</h4>
                    <img
                      src={species.images.tree}
                      alt="Drzewo"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">Liście</h4>
                    <img
                      src={species.images.leaves}
                      alt="Liście"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">Kora</h4>
                    <img
                      src={species.images.bark}
                      alt="Kora"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  {species.images.fruit && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-800">Owoce</h4>
                      <img
                        src={species.images.fruit}
                        alt="Owoce"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpeciesDetail;