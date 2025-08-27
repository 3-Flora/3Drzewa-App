import { useFormContext } from 'react-hook-form';

const MeasurementsInput = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
          Pierśnica (cm)
        </label>
        <input
          type="number"
          {...register('circumference', { 
            required: 'Pierśnica jest wymagana',
            min: { value: 1, message: 'Wartość musi być większa od 0' }
          })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-text-secondary"
          placeholder="np. 120"
        />
        {errors.circumference && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.circumference.message?.toString()}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
          Wysokość (m) - opcjonalnie
        </label>
        <input
          type="number"
          {...register('height')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-text-secondary"
          placeholder="np. 25"
        />
      </div>
    </div>
  );
};

export default MeasurementsInput;
