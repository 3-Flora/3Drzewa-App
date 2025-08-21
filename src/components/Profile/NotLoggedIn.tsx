import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const NotLoggedIn: React.FC = () => {
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
};

export default NotLoggedIn;
