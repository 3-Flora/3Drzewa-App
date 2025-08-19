import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  TreePine, 
  MapPin, 
  Calendar, 
  User,
  Award,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { fetchUserTrees } from '../utils/api';
import { TreeSubmission } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const SelectTreeForForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trees, setTrees] = useState<TreeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('approved');

  useEffect(() => {
    if (user) {
      loadUserTrees();
    }
  }, [user]);

  const loadUserTrees = async () => {
    if (!user) return;
    
    try {
      const userTreesData = await fetchUserTrees(user.id);
      setTrees(userTreesData);
    } catch (error) {
      console.error('Error loading user trees:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monument': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'monument': return 'Pomnik przyrody';
      case 'approved': return 'Zatwierdzony';
      case 'pending': return 'Oczekuje weryfikacji';
      default: return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monument': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredTrees = trees.filter(tree => {
    const matchesSearch = tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tree.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tree.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Only show approved and monument trees for forms
  const eligibleTrees = filteredTrees.filter(tree => 
    tree.status === 'pending' || tree.status === 'monument'
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Ładowanie Twoich drzew...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/forms"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Powrót do wniosków</span>
            </Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <TreePine className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wybierz drzewo do wniosku</h1>
          <p className="text-gray-600">Wybierz zatwierdzone drzewo, dla którego chcesz stworzyć wniosek do gminy</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Szukaj swoich drzew..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 transition-colors"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300 appearance-none bg-white min-w-48"
            >
              <option value="approved">Zatwierdzone</option>
              <option value="monument">Pomniki przyrody</option>
              <option value="all">Wszystkie kwalifikujące się</option>
            </select>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-blue-800 mb-2">Informacja o wnioskach</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Wnioski do gmin można składać tylko dla <strong>zatwierdzonych drzew</strong> lub <strong>pomników przyrody</strong>. 
                Drzewa oczekujące na weryfikację nie kwalifikują się do składania wniosków.
              </p>
            </div>
          </div>
        </div>

        {/* Trees List */}
        {eligibleTrees.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-12">
              <TreePine className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-gray-800 mb-4">
                {trees.length === 0 
                  ? 'Nie masz jeszcze żadnych drzew'
                  : 'Brak kwalifikujących się drzew'
                }
              </h3>
              <p className="text-gray-600 mb-8">
                {trees.length === 0 
                  ? 'Aby stworzyć wniosek do gminy, musisz najpierw zgłosić drzewo.'
                  : 'Aby stworzyć wniosek, Twoje drzewa muszą oczekiwać na weryfikację lub być pomnikami przyrody.'
                }
              </p>
              <Link
                to="/submit"
                className="inline-flex items-center space-x-2 glass-accent glass-accent-hover text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
              >
                <TreePine className="w-5 h-5" />
                <span>Zgłoś pierwsze drzewo</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {eligibleTrees.map((tree, index) => (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-300"
              >
                <div className="p-8">
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
                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
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
                        className="w-32 h-24 object-cover rounded-2xl ml-6 border-3 border-gray-200 shadow-lg"
                      />
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6 pt-6 border-t-2 border-gray-200">
                    <Link
                      to={`/tree/${tree.id}`}
                      className="flex items-center space-x-2 px-6 py-3 glass glass-hover text-gray-700 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Zobacz szczegóły</span>
                    </Link>
                    
                    <Link
                      to={`/forms/create/${tree.id}`}
                      className="flex items-center space-x-2 px-6 py-3 glass-accent glass-accent-hover text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Stwórz wniosek</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SelectTreeForForm;