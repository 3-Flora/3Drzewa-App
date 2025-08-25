import React from 'react';
import { TreeLegend } from '../../types';
import LegendCard from './LegendCard';
import LegendsEmptyState from './LegendsEmptyState';

interface LegendsGridProps {
  filteredLegends: TreeLegend[];
}

const LegendsGrid: React.FC<LegendsGridProps> = ({ filteredLegends }) => {
  if (filteredLegends.length === 0) {
    return <LegendsEmptyState />;
  }

  return (
    <div className="space-y-8 w-full">
      {filteredLegends.map((legend, index) => (
        <LegendCard key={legend.id} legend={legend} index={index} />
      ))}
    </div>
  );
};

export default LegendsGrid;
