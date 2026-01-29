import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiHeart, HiCalendar, HiClock, HiLocationMarker, HiUserGroup, HiRefresh } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { professionalsAPI } from '../services/api';

const SolidarityPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Tous');
  const [solidaritySlots, setSolidaritySlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const specialties = ["Tous", "Médecin Généraliste", "Dentiste", "Pédiatre", "Cardiologue", "Gynécologue"];

  const fetchSolidaritySlots = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await professionalsAPI.getSolidaritySlots({
        specialty: selectedSpecialty !== 'Tous' ? selectedSpecialty : undefined
      });

      if (response.data.success) {
        const processedSlots = processSlotsData(response.data.data);
        setSolidaritySlots(processedSlots);
      }
    } catch (err) {
      console.error('Error fetching solidarity slots:', err);
      setError('Impossible de charger les créneaux solidaires.');
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const processSlotsData = (professionals) => {
    const slots = [];

    professionals.forEach(prof => {
      // Grouper les disponibilités par date
      const slotsByDate = {};

      prof.availabilities.forEach(avail => {
        const dateStr = new Date(avail.date).toISOString().split('T')[0];
        if (!slotsByDate[dateStr]) {
          slotsByDate[dateStr] = [];
        }
        slotsByDate[dateStr].push(avail.startTime);
      });

      // Créer une carte pour chaque date
      Object.keys(slotsByDate).forEach(dateKey => {
        const dateObj = new Date(dateKey);
        const formattedDate = dateObj.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'short'
        });
        // Capitalize first letter
        const finalDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

        slots.push({
          id: `${prof.id}-${dateKey}`,
          professionalId: prof.id,
          professional: `Dr. ${prof.user.firstName} ${prof.user.lastName}`,
          specialty: prof.specialty,
          date: finalDate,
          rawDate: dateKey,
          timeSlots: slotsByDate[dateKey].sort(),
          location: `${prof.clinicName}, ${prof.city}`,
          avatar: prof.user.gender === 'FEMALE' ? '👩‍⚕️' : '👨‍⚕️',
          slotsLeft: slotsByDate[dateKey].length
        });
      });
    });

    // Trier par date
    return slots.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
  };

  useEffect(() => {
    fetchSolidaritySlots();
  }, [selectedSpecialty]);

  const handleBookSlot = (slot, time) => {
    // TODO: Connecter à la vraie modal de réservation
    toast.success(`Créneau réservé : ${slot.professional} le ${slot.date} à ${time}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-solidarity-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-solidarity-500 to-solidarity-700 rounded-full flex items-center justify-center">
              <HiHeart className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Consultations Solidaires
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Accédez gratuitement à des créneaux de consultation offerts par nos professionnels engagés
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-solidarity-100 text-solidarity-800 rounded-full">
            <HiUserGroup className="text-xl" />
            <span className="font-semibold">{solidaritySlots.length} opportunités disponibles</span>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-solidarity-500"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comment ça marche ? 🤔
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-solidarity-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-solidarity-700">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choisissez un créneau</h3>
              <p className="text-gray-600 text-sm">Sélectionnez un professionnel et un horaire qui vous convient</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-solidarity-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-solidarity-700">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Réservez gratuitement</h3>
              <p className="text-gray-600 text-sm">Aucun frais, c'est 100% gratuit grâce à notre système solidaire</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-solidarity-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-solidarity-700">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Consultez</h3>
              <p className="text-gray-600 text-sm">Présentez-vous au rendez-vous avec votre confirmation</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Filtrer par spécialité</h3>
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedSpecialty === specialty
                    ? 'bg-solidarity-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-solidarity-600"></div>
            <p className="mt-4 text-gray-600">Recherche des créneaux solidaires...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-12 text-red-600">
            <p className="text-lg">{error}</p>
            <button
              onClick={fetchSolidaritySlots}
              className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50"
            >
              <span className="flex items-center gap-2 justify-center">
                <HiRefresh /> Réessayer
              </span>
            </button>
          </div>
        )}

        {/* Solidarity Slots */}
        {!loading && !error && (
          <div className="space-y-6">
            {solidaritySlots.map((slot, index) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="bg-gradient-to-r from-solidarity-500 to-solidarity-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{slot.avatar}</div>
                      <div>
                        <h3 className="text-xl font-bold">{slot.professional}</h3>
                        <p className="text-solidarity-100">{slot.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Créneaux disponibles</div>
                      <div className="text-3xl font-bold">{slot.slotsLeft}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-6 mb-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <HiCalendar className="text-xl text-solidarity-600" />
                      <span className="font-medium">{slot.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiLocationMarker className="text-xl text-solidarity-600" />
                      <span>{slot.location}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <HiClock className="text-solidarity-600" />
                      Horaires disponibles
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {slot.timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBookSlot(slot, time)}
                          className="px-4 py-3 bg-solidarity-50 border-2 border-solidarity-200 text-solidarity-700 rounded-lg font-semibold hover:bg-solidarity-100 hover:border-solidarity-400 transition-all"
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-blue-600 text-2xl">ℹ️</div>
                    <p className="text-sm text-blue-800">
                      <strong>100% Gratuit</strong> - Ces créneaux sont offerts par le {slot.professional} dans le cadre de notre programme solidaire.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && solidaritySlots.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun créneau solidaire disponible pour cette spécialité</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-solidarity-600 to-solidarity-700 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Vous êtes professionnel de santé ?</h2>
          <p className="text-xl mb-6 text-solidarity-100">
            Rejoignez notre programme solidaire et offrez des créneaux gratuits aux personnes dans le besoin
          </p>
          <button className="px-8 py-4 bg-white text-solidarity-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Devenir Partenaire Solidaire
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SolidarityPage;
