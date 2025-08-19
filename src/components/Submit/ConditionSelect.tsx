import React from 'react';
import { useFormContext } from 'react-hook-form';

const ConditionSelect = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Stan drzewa
      </label>
      <select
        {...register('condition', { required: 'Stan drzewa jest wymagany' })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="">Wybierz stan</option>
        <option value="excellent">Doskonały</option>
        <option value="good">Dobry</option>
        <option value="fair">Zadowalający</option>
        <option value="poor">Słaby</option>
      </select>
      {errors.condition && (
        <p className="text-red-600 text-sm mt-1">{errors.condition.message?.toString()}</p>
      )}
    </div>
  );
};

export default ConditionSelect;
