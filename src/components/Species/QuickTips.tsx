import React from 'react';
import { Leaf } from 'lucide-react';

const QuickTips: React.FC = () => {
  return (
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
  );
};

export default QuickTips;
