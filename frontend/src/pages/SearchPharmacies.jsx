import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiLocationMarker, HiClock, HiPhone, HiHeart, HiRefresh } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { pharmaciesAPI } from '../services/api';

const SearchPharmacies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (location) params.city = location;
      // Note: API implementation for search by name might be limited or require 'city' field adjustment

      // Simulation de coordonnées pour le calcul de distance (Lomé par défaut)
      // Dans une vraie app, on utiliserait navigator.geolocation
      params.latitude = 6.1375;
      params.longitude = 1.2123;

      const response = await pharmaciesAPI.search(params);

      if (response.data.success) {
        setPharmacies(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching pharmacies:', err);
      setError('Impossible de charger les pharmacies.');
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const handleSearch = () => {
    fetchPharmacies();
  };

  const handleCall = (pharmacy) => {
    window.location.href = `tel:${pharmacy.phone}`;
    toast.success(`Appel de ${pharmacy.pharmacyName}`);
  };

  const handleDirections = (pharmacy) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`, '_blank');
  };

  const formatOpeningHours = (hoursStr) => {
    try {
      const hours = JSON.parse(hoursStr);
      const today = new Date().toLocaleDateString('en-US', { weekday: 'monday' }).toLowerCase();
      // Mappage approximatif des jours pour l'affichage simple
      return hours[today] || 'Horaires non disponibles';
    } catch (e) {
      return hoursStr || 'Horaires non disponibles';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pharmacies à Proximité
          </h1>
          <p className="text-xl text-gray-600">
            Trouvez rapidement une pharmacie ouverte près de vous
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Nom de la pharmacie..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville / Quartier
              </label>
              <div className="relative">
                <HiLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Lomé"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSearch}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Rechercher
            </button>
            <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Pharmacies de Garde
            </button>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Recherche des pharmacies...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-12 text-red-600">
            <p className="text-lg">{error}</p>
            <button
              onClick={fetchPharmacies}
              className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50"
            >
              <span className="flex items-center gap-2 justify-center">
                <HiRefresh /> Réessayer
              </span>
            </button>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacies
              .filter(p => p.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((pharmacy, index) => (
                <motion.div
                  key={pharmacy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                >
                  {/* Status Badge - TODO: Implement real open/close logic */}
                  <div className={`py-2 px-4 text-center font-medium text-white ${true ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {true ? '🟢 Ouverte' : '🔴 Fermée'}
                  </div>

                  <div className="p-6">
                    {/* Icon & Name */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-5xl">💊</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {pharmacy.pharmacyName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <HiLocationMarker className="inline mr-1" />
                          {pharmacy.distance ? `${pharmacy.distance} km` : 'Distance inconnue'}
                        </p>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <HiLocationMarker className="text-gray-400 flex-shrink-0 mt-1" />
                        <span>{pharmacy.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <HiClock className="text-gray-400" />
                        <span>{formatOpeningHours(pharmacy.openingHours)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <HiPhone className="text-gray-400" />
                        <span>{pharmacy.phone}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {/* Note: hasSolidarityMeds n'est pas directement dans l'API search, on assume false ou on fait un check */}
                    {/* Placeholder logic */}
                    {false && (
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-solidarity-100 text-solidarity-700 rounded-full text-sm font-medium">
                          <HiHeart />
                          Médicaments Solidaires
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCall(pharmacy)}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <HiPhone />
                        Appeler
                      </button>
                      <button
                        onClick={() => handleDirections(pharmacy)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Itinéraire
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && pharmacies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune pharmacie trouvée.</p>
          </div>
        )}

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-md p-8 text-center"
        >
          <div className="text-gray-400 mb-4">
            <HiLocationMarker className="text-6xl mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Carte Interactive
          </h3>
          <p className="text-gray-600 mb-4">
            La carte interactive avec toutes les pharmacies sera bientôt disponible
          </p>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">🗺️ Carte Leaflet à intégrer ici</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPharmacies;
