import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';

const FormsHowToCreate: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-green-600" />
        Jak stworzyć wniosek?
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-lg font-bold text-green-600">1</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-1 text-sm">Znajdź drzewo</h4>
          <p className="text-xs text-gray-600">Wybierz swoje drzewo oczekujące na weryfikację lub pomnik przyrody</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-lg font-bold text-green-600">2</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-1 text-sm">Wypełnij dane</h4>
          <p className="text-xs text-gray-600">Uzupełnij informacje o gminie i uzasadnienie</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-lg font-bold text-green-600">3</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-1 text-sm">Wygeneruj PDF</h4>
          <p className="text-xs text-gray-600">Pobierz gotowy wniosek i wyślij do gminy</p>
        </div>
      </div>
      <div className="text-center">
        <Link
          to="/forms/create"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          style={{ 
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(5, 150, 105, 0.6)',
            color: 'white'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 1) 0%, rgba(5, 150, 105, 0.8) 100%)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(5, 150, 105, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(5, 150, 105, 0.7) 100%)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Rozpocznij tworzenie wniosku</span>
        </Link>
      </div>
    </div>
  );
};

export default FormsHowToCreate;
