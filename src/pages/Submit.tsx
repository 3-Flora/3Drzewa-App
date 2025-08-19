import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Upload, Save, FileText } from 'lucide-react';
import { submitTree, generateMunicipalForm } from '../utils/api';
import { TreeSubmission } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [generatingForm, setGeneratingForm] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const [showSpeciesHelp, setShowSpeciesHelp] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();
  const isMonument = watch('isMonument');

  useEffect(() => {
    const initMap = async () => {
      if (mapLoaded) return;
      
      try {
        const loader = new Loader({
          apiKey: 'AIzaSyC8P03hSSsh6Rree8RyOebKwm32sYh4rYs',
          version: 'weekly',
          libraries: ['places'],
          region: 'PL',
          language: 'pl'
        });

        await loader.load();
        const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
        
        if (!mapRef.current) return;

        // Default to Rzeszów
        let initialCenter = { lat: 50.0412, lng: 21.9991 };

        const mapInstance = new Map(mapRef.current, {
          center: initialCenter,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        setMap(mapInstance);
        setMapLoaded(true);

        // Add click listener to set location
        mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setLocation({ lat, lng });
            setValue('address', `Współrzędne: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            
            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
            
            // Add new marker  
            const marker = new google.maps.Marker({
              position: { lat, lng },
              map: mapInstance,
              title: 'Lokalizacja drzewa',
              zIndex: 999,
              icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15" fill="#DC2626" stroke="#B91C1C" stroke-width="2"/>
                    <path d="M16 8L18 14L24 14L19.5 18L21.5 24L16 20.5L10.5 24L12.5 18L8 14L14 14L16 8Z" fill="#FFFFFF"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
              }
            });
            markersRef.current.push(marker);
          }
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!map) return;
    
    // Get location from URL params or current location
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    if (lat && lng) {
      setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
      setValue('address', `Współrzędne: ${lat}, ${lng}`);
      
      const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
      map.setCenter(position);
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      const marker = new google.maps.Marker({
        position,
        map,
        title: 'Lokalizacja drzewa',
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" fill="#DC2626" stroke="#B91C1C" stroke-width="2"/>
              <path d="M16 8L18 14L24 14L19.5 18L21.5 24L16 20.5L10.5 24L12.5 18L8 14L14 14L16 8Z" fill="#FFFFFF"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
        }
      });
      markersRef.current.push(marker);
    } else {
      // Try to get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setLocation(pos);
            setValue('address', `Współrzędne: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
            
            map.setCenter(pos);
            
            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
            
            const marker = new google.maps.Marker({
              position: pos,
              map,
              title: 'Twoja lokalizacja',
              icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="15" fill="#065F46" stroke="#064E3B" stroke-width="2"/>
                    <circle cx="16" cy="16" r="4" fill="#10B981"/>
                    <circle cx="16" cy="16" r="8" stroke="#10B981" stroke-width="2" fill="none"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
              }
            });
            markersRef.current.push(marker);
          },
          () => {
            // If can't get location, use Rzeszów and try to get user location
            const rzeszowPos = { lat: 50.0412, lng: 21.9991 };
            setLocation(rzeszowPos);
            setValue('address', `Współrzędne: ${rzeszowPos.lat.toFixed(6)}, ${rzeszowPos.lng.toFixed(6)}`);
            map.setCenter(rzeszowPos);
          }
        );
      } else {
        // If geolocation not supported, use Rzeszów
        const rzeszowPos = { lat: 50.0412, lng: 21.9991 };
        setLocation(rzeszowPos);
        setValue('address', `Współrzędne: ${rzeszowPos.lat.toFixed(6)}, ${rzeszowPos.lng.toFixed(6)}`);
        map.setCenter(rzeszowPos);
      }
    }
  }, [map, searchParams, setValue]);

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
        status: 'pending'
      };

      const newTree = await submitTree(treeData);
      
      // Generate municipal form if it's a monument candidate
      if (data.isMonument) {
        setGeneratingForm(true);
        await generateMunicipalForm(newTree.id, 'Gmina lokalna');
      }

      alert('Zgłoszenie zostało pomyślnie dodane!');
      navigate('/community');
    } catch (error) {
      console.error('Error submitting tree:', error);
      alert('Wystąpił błąd podczas dodawania zgłoszenia.');
    } finally {
      setLoading(false);
      setGeneratingForm(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pt-8 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Zgłoś nowe drzewo</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Mini Map */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokalizacja na mapie
              </label>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <div 
                  ref={mapRef} 
                  className="w-full h-48"
                  style={{ 
                    zIndex: 1,
                    backgroundColor: '#f3f4f6'
                  }}
                />
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">Ładowanie mapy...</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Kliknij na mapie, aby zaznaczyć lokalizację drzewa
              </p>
            </div>

          {/* Location */}
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
              <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
            )}
            {location && (
              <p className="text-sm text-gray-600 mt-1">
                Współrzędne: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            )}
          </div>

          {/* Species */}
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
                <p className="text-red-600 text-sm mt-1">{errors.species.message}</p>
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
                <p className="text-red-600 text-sm mt-1">{errors.speciesLatin.message}</p>
              )}
            </div>
          </div>

          {/* Measurements */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pierśnica (cm)
              </label>
              <input
                type="number"
                {...register('circumference', { 
                  required: 'Pierśnica jest wymagana',
                  min: { value: 1, message: 'Wartość musi być większa od 0' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="np. 120"
              />
              {errors.circumference && (
                <p className="text-red-600 text-sm mt-1">{errors.circumference.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wysokość (m) - opcjonalnie
              </label>
              <input
                type="number"
                {...register('height')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="np. 25"
              />
            </div>
          </div>

          {/* Condition */}
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
              <p className="text-red-600 text-sm mt-1">{errors.condition.message}</p>
            )}
          </div>

          {/* Monument checkbox */}
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

          {/* Description */}
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
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zdjęcia (maksymalnie 5)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Kliknij lub przeciągnij zdjęcia</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
              >
                Wybierz zdjęcia
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                     alt={"Preview " + (index + 1)}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 glass text-white rounded-full w-8 h-8 text-sm flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 font-bold"
                      style={{ background: 'rgba(239, 68, 68, 0.8)' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={loading || generatingForm}
              className="flex-1 flex items-center justify-center space-x-2 glass-accent glass-accent-hover text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium disabled:opacity-50 shadow-lg"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Save className="w-2 h-5" />
                  <span>Wyślij zgłoszenie</span>
                </>
              )}
            </button>

            {isMonument && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 glass p-3 rounded-lg shadow-lg">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Po wysłaniu zostanie wygenerowany wniosek do gminy</span>
                {generatingForm && <LoadingSpinner size="sm" />}
              </div>
            )}
          </div>
        </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Submit;