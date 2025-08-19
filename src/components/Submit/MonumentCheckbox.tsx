import React from 'react';
import { useFormContext } from 'react-hook-form';

const MonumentCheckbox = () => {
  const { register } = useFormContext();

  return (
    <div className="flex items-start space-x-2">
      <input
        type="checkbox"
        {...register('isMonument')}
        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mt-1"
      />
      <div>
        <label className="text-sm font-medium text-gray-700">
          Kandydat na pomnik przyrody
        </label>
        <p className="text-sm text-gray-600">
          Zaznacz, jeśli uważasz, że to drzewo powinno być uznane za pomnik przyrody. 
          Zostanie automatycznie wygenerowany wniosek do gminy.
        </p>
      </div>
    </div>
  );
};

export default MonumentCheckbox;
