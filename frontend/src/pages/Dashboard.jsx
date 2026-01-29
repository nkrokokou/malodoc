import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { HiCalendar, HiUser, HiClock, HiHeart } from 'react-icons/hi';
import Logo from '../components/Logo';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <HiCalendar className="text-3xl" />, label: "Rendez-vous", value: "0", color: "bg-blue-500" },
    { icon: <HiClock className="text-3xl" />, label: "En attente", value: "0", color: "bg-yellow-500" },
    { icon: <HiHeart className="text-3xl" />, label: "Consultations solidaires", value: "0", color: "bg-solidarity-500" },
  ];

  const quickActions = [
    { title: "Prendre un Rendez-vous", description: "Réservez une consultation", link: "/search-professionals", color: "bg-primary-600" },
    { title: "Trouver une Pharmacie", description: "Localisez une pharmacie proche", link: "/search-pharmacies", color: "bg-secondary-600" },
    { title: "Créneaux Solidaires", description: "Consultations gratuites", link: "/solidarity", color: "bg-solidarity-600" },
    { title: "Faire un Don", description: "Soutenez la santé pour tous", link: "/donations", color: "bg-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 mb-8 text-white shadow-lg"
        >
          <div className="flex items-center gap-6">
            <Logo size="medium" />
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bienvenue, {user?.firstName} ! 👋
              </h1>
              <p className="text-primary-100">
                Gérez votre santé facilement depuis votre tableau de bord
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} text-white p-4 rounded-lg`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <HiUser className="text-2xl text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Mon Profil</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Nom complet</p>
                <p className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-semibold text-gray-900">{user?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rôle</p>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {user?.role}
                </span>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Modifier le profil
              </button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions Rapides</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={index}
                    href={action.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${action.color} text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all`}
                  >
                    <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Activité Récente</h2>
              <div className="text-center py-8 text-gray-500">
                <HiCalendar className="text-5xl mx-auto mb-3 opacity-30" />
                <p>Aucune activité pour le moment</p>
                <p className="text-sm mt-2">Vos rendez-vous apparaîtront ici</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
