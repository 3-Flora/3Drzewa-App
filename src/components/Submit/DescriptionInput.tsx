import React from 'react';
import { useFormContext } from 'react-hook-form';

const DescriptionInput = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Opis i uwagi
      </label>
      <textarea
        {...register('description', { required: 'Opis jest wymagany' })}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="Opisz drzewo, jego historię, szczególne cechy, lokalizację..."
      />
      {errors.description && (
        <p className="text-red-600 text-sm mt-1">{errors.description.message?.toString()}</p>
      )}
    </div>
  );
};

export default DescriptionInput;
