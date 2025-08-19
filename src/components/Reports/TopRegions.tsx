import React from 'react';
import { MapPin } from 'lucide-react';

interface TopRegionsProps {
  topRegions: Array<{ name: string; count: number }>;
}

const TopRegions: React.FC<TopRegionsProps> = ({ topRegions }) => {
  const getRankingColor = (index: number) => {
    if (index === 0) return 'bg-yellow-500';
    if (index === 1) return 'bg-gray-400';
    if (index === 2) return 'bg-amber-600';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <MapPin className="w-6 h-6 mr-3 text-green-600" />
        Top regiony
      </h3>
      <div className="space-y-4">
        {topRegions.map((region, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getRankingColor(index)}`}>
                {index + 1}
              </div>
              <span className="font-medium text-gray-800">{region.name}</span>
            </div>
            <span className="font-bold text-green-600">{region.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRegions;
