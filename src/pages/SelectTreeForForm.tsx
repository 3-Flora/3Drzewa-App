import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchUserTrees } from '../utils/api';
import { TreeSubmission } from '../types';
import { useAuth } from '../hooks/useAuth';
import {
  SelectTreeHeader,
  SearchAndFilter,
  InfoBox,
  TreeCard,
  EmptyState,
  LoadingState
} from '../components/SelectTreeForForm';

const SelectTreeForForm = () => {
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
    return <LoadingState />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8 pb-24 md:pb-8 lg:px-8 lg:py-8 bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <SelectTreeHeader />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        
        <InfoBox />
        
        {/* Trees List */}
        {eligibleTrees.length === 0 ? (
          <EmptyState hasTrees={trees.length > 0} />
        ) : (
          <div className="space-y-6">
            {eligibleTrees.map((tree, index) => (
              <TreeCard key={tree.id} tree={tree} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SelectTreeForForm;