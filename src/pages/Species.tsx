import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Leaf, 
  TreePine,
  Book,
  Eye,
  ChevronRight
} from 'lucide-react';
import { fetchSpecies } from '../utils/api';
import { TreeSpecies } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Species = () => {
  const [species, setSpecies] = useState<TreeSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFamily, setFilterFamily] = useState<string>('all');

  useEffect(() => {
    loadSpecies();
  }, []);

  const loadSpecies = async () => {
    try {
      const speciesData = await fetchSpecies();
      setSpecies(speciesData);
    } catch (error) {
      console.error('Error loading species:', error);
    } finally {
      setLoading(false);
    }
  };

  const families = [...new Set(species.map(s => s.family))];

  const filteredSpecies = species.filter(s => {
    const matchesSearch = s.namePolish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.nameLatin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFamily = filterFamily === 'all' || s.family === filterFamily;
    return matchesSearch && matchesFamily;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie gatunków...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Book className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Encyklopedia gatunków</h1>
          <p className="text-gray-600">Poznaj polskie gatunki drzew i naucz się je rozpoznawać</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Szukaj gatunków po nazwie polskiej lub łacińskiej..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterFamily}
              onChange={(e) => setFilterFamily(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white min-w-48"
            >
              <option value="all">Wszystkie rodziny</option>
              {families.map(family => (
                <option key={family} value={family}>{family}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Species Grid */}
        {filteredSpecies.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Brak wyników
            </h3>
            <p className="text-gray-600">
              Spróbuj zmienić kryteria wyszukiwania lub filtry.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecies.map((speciesItem, index) => (
              <motion.div
                key={speciesItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={speciesItem.images.tree}
                    alt={speciesItem.namePolish}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {speciesItem.characteristics.nativeToPoland && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Rodzimy
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {speciesItem.namePolish}
                  </h3>
                  <p className="text-sm text-gray-600 italic mb-2">
                    {speciesItem.nameLatin}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Rodzina: {speciesItem.family}
                  </p>
                  
                  <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                    {speciesItem.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">Wysokość:</span>
                      <br />
                      {speciesItem.characteristics.maxHeight}
                    </div>
                    <div>
                      <span className="font-medium">Żywotność:</span>
                      <br />
                      {speciesItem.characteristics.lifespan}
                    </div>
                  </div>
                  
                  <Link
                    to={`/species/${speciesItem.id}`}
                    className="flex items-center justify-between w-full glass-primary glass-primary-hover text-green-700 px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
                  >
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">Zobacz szczegóły</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Tips */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <Leaf className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Wskazówki identyfikacji</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Zwróć uwagę na kształt i ułożenie liści</li>
                <li>• Sprawdź strukturę kory i jej kolor</li>
                <li>• Obserwuj owoce i kwiaty w odpowiedniej porze roku</li>
                <li>• Porównaj wysokość i pokrój drzewa</li>
                <li>• Skorzystaj z poradników sezonowych w profilach gatunków</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Species;