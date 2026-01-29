import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiLocationMarker, HiStar, HiCalendar, HiRefresh } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { professionalsAPI } from '../services/api';
import AppointmentModal from '../components/AppointmentModal';

const SearchProfessionals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const specialties = [
    "Tous", "Médecin Généraliste", "Dentiste", "Cardiologue",
    "Pédiatre", "Gynécologue", "Dermatologue", "Ophtalmologue"
  ];

  const fetchProfessionals = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (specialty && specialty !== "Tous") params.specialty = specialty;
      if (location) params.city = location;

      const response = await professionalsAPI.search(params);

      if (response.data.success) {
        setProfessionals(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching professionals:', err);
      setError('Impossible de charger les professionnels. Veuillez réessayer.');
      toast.error('Erreur lors du chargement des résultats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const handleSearch = () => {
    fetchProfessionals();
  };

  const handleBookAppointment = (professional) => {
    setSelectedProfessional(professional);
    setIsModalOpen(true);
  };

  const handleBookingSuccess = () => {
    // On pourrait rafraichir, mais ce n'est pas strictement nécessaire pour la vue recherche
    // setIsModalOpen(false) est géré par le callback onSuccess du modal ou onClose
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
            Trouvez votre Professionnel de Santé
          </h1>
          <p className="text-xl text-gray-600">
            Des milliers de professionnels vérifiés à votre disposition
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Nom du professionnel..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spécialité
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
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

          <button
            onClick={handleSearch}
            className="mt-4 w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Rechercher
          </button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Recherche des meilleurs praticiens...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-12 text-red-600">
            <p className="text-lg">{error}</p>
            <button
              onClick={fetchProfessionals}
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
          <div className="space-y-4">
            {professionals.map((pro, index) => (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
              >
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-4xl">
                      {pro.user.gender === 'FEMALE' ? '👩‍⚕️' : '👨‍⚕️'}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Dr. {pro.user.firstName} {pro.user.lastName}
                        </h3>
                        <p className="text-primary-600 font-medium mb-2">
                          {pro.specialty}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <HiLocationMarker className="text-gray-400" />
                            {pro.clinicName}, {pro.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <HiStar className="text-yellow-400" />
                            <span className="font-semibold">{pro.avgRating}</span>
                            <span className="text-gray-500 text-sm">({pro._count?.reviews || 0} avis)</span>
                          </div>
                          {pro.hasSolidaritySlots && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              Créneaux Solidaires
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">À partir de</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {pro.consultationFee.toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleBookAppointment(pro)}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <HiCalendar />
                        Prendre Rendez-vous
                      </button>
                      <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Voir Profil
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State si pas de résultats */}
        {!loading && !error && professionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun professionnel trouvé pour vos critères.</p>
          </div>
        )}

        {/* Appointment Modal */}
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          professional={selectedProfessional}
          onSuccess={handleBookingSuccess}
        />
      </div>
    </div>
  );
};

export default SearchProfessionals;
