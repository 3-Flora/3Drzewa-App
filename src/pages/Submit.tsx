import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { motion } from 'framer-motion';
import { submitTree, generateMunicipalForm } from '../utils/api';
import { TreeSubmission } from '../types';
import { useNavigationHistory } from '../hooks/useNavigationHistory';
import {
  SubmitHeader,
  LocationMap,
  LocationInput,
  SpeciesInput,
  MeasurementsInput,
  ConditionSelect,
  MonumentCheckbox,
  DescriptionInput,
  ImageUpload,
  SubmitActions
} from '../components/Submit';

interface FormData {
  species: string;
  speciesLatin: string;
  circumference: number;
  height?: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  isMonument: boolean;
  description: string;
  address: string;
}

const Submit = () => {
  const { navigateWithHistory } = useNavigationHistory();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [generatingForm, setGeneratingForm] = useState(false);

  const methods = useForm<FormData>();
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    // Get location from URL params
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    if (lat && lng) {
      setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
      setValue('address', `Współrzędne: ${lat}, ${lng}`);
    }
  }, [searchParams, setValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    if (!location) {
      alert('Nie można określić lokalizacji. Spróbuj ponownie.');
      return;
    }

    setLoading(true);
    try {
      // TODO: Handle image upload to backend
      const imageUrls = images.map((_, index) => 
        `https://images.pexels.com/photos/${1172675 + index}/pexels-photo-${1172675 + index}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`
      );

      const treeData: Omit<TreeSubmission, 'id' | 'userId' | 'submissionDate' | 'votes'> = {
        ...data,
        location: {
          lat: location.lat,
          lng: location.lng,
          address: data.address
        },
        images: imageUrls,
        status: 'pending',
        isAlive: true // All submitted trees are alive
      };

      const newTree = await submitTree(treeData);
      
      // Generate municipal form if it's a monument candidate
      if (data.isMonument) {
        setGeneratingForm(true);
        await generateMunicipalForm(newTree.id, 'Gmina lokalna');
      }

      alert('Zgłoszenie zostało pomyślnie dodane!');
      navigateWithHistory('/community');
    } catch (error) {
      console.error('Error submitting tree:', error);
      alert('Wystąpił błąd podczas dodawania zgłoszenia.');
    } finally {
      setLoading(false);
      setGeneratingForm(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pt-8 pb-24 md:pb-8 bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6 border border-gray-200 dark:border-dark-border transition-colors duration-200">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <SubmitHeader />
              
              <LocationMap 
                onLocationChange={setLocation}
                initialLat={location?.lat}
                initialLng={location?.lng}
              />
              
              <LocationInput location={location} />
              
              <SpeciesInput />
              
              <MeasurementsInput />
              
              <ConditionSelect />
              
              <MonumentCheckbox />
              
              <DescriptionInput />
              
              <ImageUpload 
                images={images}
                onImageUpload={handleImageUpload}
                onRemoveImage={removeImage}
              />
              
              <SubmitActions 
                loading={loading}
                generatingForm={generatingForm}
                isMonument={false}
              />
            </form>
          </FormProvider>
        </div>
      </motion.div>
    </div>
  );
};

export default Submit;