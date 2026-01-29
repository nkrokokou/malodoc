import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCalendar, HiLocationMarker, HiHeart, HiCurrencyDollar, HiUserGroup, HiShieldCheck } from 'react-icons/hi';
import Logo from '../components/Logo';

const Home = () => {
  const features = [
    {
      icon: <HiCalendar className="text-4xl text-primary-600" />,
      title: "Prise de Rendez-vous",
      description: "Réservez facilement vos consultations avec des professionnels de santé qualifiés"
    },
    {
      icon: <HiLocationMarker className="text-4xl text-secondary-600" />,
      title: "Pharmacies à Proximité",
      description: "Localisez rapidement les pharmacies autour de vous avec disponibilité en temps réel"
    },
    {
      icon: <HiHeart className="text-4xl text-solidarity-600" />,
      title: "Consultations Solidaires",
      description: "Accédez à des créneaux de consultation gratuits pour tous"
    },
    {
      icon: <HiCurrencyDollar className="text-4xl text-green-600" />,
      title: "Système de Dons",
      description: "Contribuez à rendre la santé accessible à tous via notre plateforme de dons"
    },
    {
      icon: <HiUserGroup className="text-4xl text-blue-600" />,
      title: "Réseau de Professionnels",
      description: "Connectez-vous avec des médecins, dentistes, et autres professionnels"
    },
    {
      icon: <HiShieldCheck className="text-4xl text-purple-600" />,
      title: "Sécurisé & Fiable",
      description: "Vos données sont protégées et tous nos professionnels sont vérifiés"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <Logo size="large" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Votre Santé,<br />Notre Priorité
            </h1>
            
            <p className="text-xl sm:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              La plateforme de santé digitale qui rend les soins accessibles à tous au Togo et en Afrique
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                >
                  Commencer Maintenant
                </motion.button>
              </Link>
              
              <Link to="/search-professionals">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all"
                >
                  Trouver un Professionnel
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir MALOdoc ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète pour tous vos besoins de santé
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solidarity Section */}
      <section className="py-20 bg-gradient-to-br from-solidarity-500 to-solidarity-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <HiHeart className="text-6xl mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Santé Solidaire
            </h2>
            <p className="text-xl text-solidarity-100 mb-8 max-w-2xl mx-auto">
              Notre mission est de rendre les soins de santé accessibles à tous. 
              Grâce aux dons et aux créneaux solidaires, nous offrons des consultations gratuites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/solidarity">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-solidarity-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Consulter les Créneaux
                </motion.button>
              </Link>
              <Link to="/donations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-solidarity-700 transition-all"
                >
                  Faire un Don
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Prêt à Commencer ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez des milliers d'utilisateurs qui font confiance à MALOdoc pour leurs besoins de santé
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg"
              >
                Créer un Compte Gratuit
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
