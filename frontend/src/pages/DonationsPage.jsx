import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiHeart, HiCurrencyDollar, HiUserGroup, HiTrendingUp, HiCheckCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { donationsAPI } from '../services/api';

const DonationsPage = () => {
  const [amount, setAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorInfo, setDonorInfo] = useState({ name: '', email: '', phone: '', message: '' });
  const [stats, setStats] = useState([
    { icon: <HiCurrencyDollar />, label: "Dons collectés", value: "0 FCFA", color: "bg-green-500" },
    { icon: <HiUserGroup />, label: "Donateurs", value: "0", color: "bg-blue-500" },
    { icon: <HiHeart />, label: "Consultations financées", value: "0", color: "bg-solidarity-500" },
  ]);
  const [topDonors, setTopDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const predefinedAmounts = [5000, 10000, 25000, 50000, 100000];

  const impactStories = [
    {
      id: 1,
      emoji: "👵",
      title: "Maman Awa, 68 ans",
      story: "Grâce à vos dons, j'ai pu consulter un cardiologue gratuitement et recevoir mon traitement.",
      consultations: 3
    },
    {
      id: 2,
      emoji: "👶",
      title: "Petit Kofi, 4 ans",
      story: "Les dons ont permis à mon fils de voir un pédiatre pour son asthme. Merci du fond du cœur.",
      consultations: 5
    },
  ];

  const fetchData = async () => {
    try {
      const [statsRes, donorsRes] = await Promise.all([
        donationsAPI.getStats(),
        donationsAPI.getTopDonors({ limit: 5 })
      ]);

      if (statsRes.data.success) {
        const s = statsRes.data.data;
        setStats([
          { icon: <HiCurrencyDollar />, label: "Dons collectés", value: `${s.totalAmount.toLocaleString()} FCFA`, color: "bg-green-500" },
          { icon: <HiUserGroup />, label: "Donateurs", value: s.uniqueDonors.toString(), color: "bg-blue-500" },
          { icon: <HiHeart />, label: "Consultations financées", value: Math.floor(s.totalAmount / 5000).toLocaleString(), color: "bg-solidarity-500" },
        ]);
      }

      if (donorsRes.data.success) {
        // Formatter les dates pour l'affichage
        const formattedDonors = donorsRes.data.data.map(d => ({
          ...d,
          name: d.isAnonymous ? "Anonyme" : (d.donorName || "Anonyme"),
          date: new Date(d.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
        }));
        setTopDonors(formattedDonors);
      }
    } catch (error) {
      console.error("Error fetching donation data:", error);
      toast.error("Impossible de charger les statistiques");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDonate = async () => {
    if (!amount || parseInt(amount) < 500) {
      toast.error('Le montant minimum est de 500 FCFA');
      return;
    }

    try {
      const loadingToast = toast.loading('Traitement du don...');

      const donationData = {
        amount: parseFloat(amount),
        isAnonymous,
        donorName: isAnonymous ? undefined : donorInfo.name,
        donorEmail: isAnonymous ? undefined : donorInfo.email,
        donorPhone: isAnonymous ? undefined : donorInfo.phone,
        message: donorInfo.message,
        paymentMethod: 'MOBILE_MONEY' // Placeholder
      };

      const response = await donationsAPI.create(donationData);

      if (response.data.success) {
        toast.dismiss(loadingToast);
        toast.success(`Merci pour votre don de ${parseInt(amount).toLocaleString()} FCFA !`);
        setAmount('');
        setDonorInfo({ name: '', email: '', phone: '', message: '' });
        fetchData(); // Rafraîchir les stats
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Erreur lors du traitement du don');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center animate-pulse">
              <HiHeart className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Faites un Don
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre générosité permet à des milliers de personnes d'accéder gratuitement aux soins de santé
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} text-white p-4 rounded-lg text-2xl`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Faire un don</h2>

            {/* Predefined Amounts */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choisissez un montant
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {predefinedAmounts.map((amt) => (
                  <motion.button
                    key={amt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAmount(amt.toString())}
                    className={`py-3 rounded-lg font-semibold transition-all ${amount === amt.toString()
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {(amt / 1000).toFixed(0)}K
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ou entrez un montant personnalisé
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  FCFA
                </span>
              </div>
            </div>

            {/* Anonymous Option */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-gray-700 font-medium">Don anonyme</span>
              </label>
            </div>

            {/* Donor Info (if not anonymous) */}
            {!isAnonymous && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 mb-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Téléphone (optionnel)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                />
                <textarea
                  placeholder="Message (optionnel)"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={donorInfo.message}
                  onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                />
              </motion.div>
            )}

            {/* Payment Methods */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Méthode de paiement
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  🟠 Orange Money
                </button>
                <button className="py-3 border-2 border-yellow-500 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-50 transition-colors">
                  🟡 MTN Money
                </button>
                <button className="py-3 border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  💳 Carte Bancaire
                </button>
                <button className="py-3 border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  📱 Moov Money
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <HiHeart />
              Faire un don de {amount ? parseInt(amount).toLocaleString() : '0'} FCFA
            </motion.button>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HiTrendingUp className="text-green-600" />
                Impact de votre don
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <HiCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <span><strong>5,000 FCFA</strong> = 1 consultation gratuite</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <HiCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <span><strong>25,000 FCFA</strong> = 5 consultations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <HiCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <span><strong>50,000 FCFA</strong> = 10 consultations</span>
                </div>
              </div>
            </motion.div>

            {/* Top Donors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">🏆 Top Donateurs</h3>
              <div className="space-y-3">
                {topDonors.length > 0 ? (
                  topDonors.map((donor, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-semibold text-gray-900">{donor.name}</p>
                        <p className="text-xs text-gray-500">{donor.date}</p>
                      </div>
                      <span className="font-bold text-green-600">{(donor.amount / 1000).toFixed(0)}K</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center">Aucun donateur pour le moment.</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Impact Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Témoignages
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {impactStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{story.emoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{story.title}</h3>
                    <p className="text-gray-600 italic">"{story.story}"</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-green-600 font-medium">
                    ✓ {story.consultations} consultations gratuites financées
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationsPage;
