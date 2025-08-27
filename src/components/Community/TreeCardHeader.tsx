import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MoreHorizontal } from 'lucide-react';

interface TreeCardHeaderProps {
  userId: string;
  submissionDate: string;
  status: string;
  userData?: {
    userName: string;
    avatar?: string;
    userId?: string;
    email?: string;
  };
  user?: any;
}

const TreeCardHeader: React.FC<TreeCardHeaderProps> = ({
  userId,
  submissionDate,
  status,
  userData,
  user,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'teraz';
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Zatwierdzone';
      case 'pending':
        return 'Oczekujące';
      case 'rejected':
        return 'Odrzucone';
      default:
        return 'Nieznany';
    }
  };

  // Get display name from either userData or user
  const displayName = userData?.userName || user?.name || 'Nieznany użytkownik';
  const displayEmail = userData?.email || user?.email;
  
  // Create a proper handle - use email username or fallback to display name
  const userHandle = displayEmail ? 
    displayEmail.split('@')[0] : 
    displayName.toLowerCase().replace(/\s+/g, '').slice(0, 15);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 min-w-0">
        {/* User Name */}
        <Link 
          to={`/tree/${userId}`}
          className="font-bold text-gray-900 dark:text-dark-text hover:underline truncate"
        >
          {displayName}
        </Link>
        
        {/* Verification Badge */}
        {status === 'approved' && (
          <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
        )}
        
        {/* Status Badge */}
        <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-dark-600 ${getStatusColor(status)} font-medium`}>
          {getStatusText(status)}
        </span>
        
        {/* Handle */}
        <span className="text-gray-500 dark:text-dark-text-secondary text-sm truncate">
          @{userHandle}
        </span>
        
        {/* Timestamp */}
        <span className="text-gray-500 dark:text-dark-text-secondary text-sm">
          · {formatDate(submissionDate)}
        </span>
      </div>
      
      {/* More Options */}
      <button className="text-gray-400 dark:text-dark-text-secondary hover:text-gray-600 dark:hover:text-dark-text p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TreeCardHeader;
