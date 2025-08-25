import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SpeciesInput = () => {
  const [showSpeciesHelp, setShowSpeciesHelp] = useState(false);
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Gatunek (nazwa polska)
          </label>
          <button
            type="button"
            onClick={() => setShowSpeciesHelp(!showSpeciesHelp)}
            className="text-sm text-green-600 hover:text-green-700 flex items-center space-x-1"
          >
            <span>Pomoc z identyfikacją</span>
            <span className="text-lg">{showSpeciesHelp ? '−' : '+'}</span>
          </button>
        </div>
        <input
          {...register('species', { required: 'Gatunek jest wymagany' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="np. Dąb szypułkowy"
        />
        {errors.species && (
          <p className="text-red-600 text-sm mt-1">{errors.species.message?.toString()}</p>
        )}
        
        {/* Species Help */}
        {showSpeciesHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="font-semibold text-green-800 mb-2">Wskazówki identyfikacji:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Liście:</strong> Sprawdź kształt, brzegi i ułożenie liści</li>
              <li>• <strong>Kora:</strong> Zwróć uwagę na teksturę i kolor kory</li>
              <li>• <strong>Owoce:</strong> Żołędzie, orzechy, nasiona mogą pomóc</li>
              <li>• <strong>Pokrój:</strong> Wysokość i kształt korony drzewa</li>
              <li>• <strong>Lokalizacja:</strong> Gdzie rośnie (park, las, ulica)</li>
            </ul>
            <div className="mt-3">
              <Link
                to="/species"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                → Zobacz pełną encyklopedię gatunków
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nazwa łacińska
        </label>
        <input
          {...register('speciesLatin', { required: 'Nazwa łacińska jest wymagana' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="np. Quercus robur"
        />
        {errors.speciesLatin && (
          <p className="text-red-600 text-sm mt-1">{errors.speciesLatin.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default SpeciesInput;
