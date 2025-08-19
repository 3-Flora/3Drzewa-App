import React from 'react';
import { useFormContext } from 'react-hook-form';

interface LocationInputProps {
  location: { lat: number; lng: number } | null;
}

const LocationInput: React.FC<LocationInputProps> = ({ location }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Lokalizacja
      </label>
      <input
        {...register('address', { required: 'Adres jest wymagany' })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="Wpisz adres lub użyj współrzędnych z mapy"
      />
      {errors.address && (
        <p className="text-red-600 text-sm mt-1">{errors.address.message?.toString()}</p>
      )}
      {location && (
        <p className="text-sm text-gray-600 mt-1">
          Współrzędne: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default LocationInput;
