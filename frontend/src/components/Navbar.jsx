import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHeart, FaHospital, FaPills, FaHandHoldingHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FaHeart className="text-primary-600 text-2xl" />
            <span className="text-2xl font-bold text-primary-600">MALO<span className="text-secondary-600">doc</span></span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/search-professionals" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition">
              <FaHospital />
              <span>Médecins</span>
            </Link>
            <Link to="/search-pharmacies" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition">
              <FaPills />
              <span>Pharmacies</span>
            </Link>
            <Link to="/solidarity" className="flex items-center gap-2 text-solidarity-600 hover:text-solidarity-700 transition">
              <FaHandHoldingHeart />
              <span>Solidarité</span>
            </Link>
            <Link to="/donations" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition">
              <span>Dons</span>
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition">
                  <FaUser />
                  <span className="hidden md:inline">{user?.firstName}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
                >
                  <FaSignOutAlt />
                  <span className="hidden md:inline">Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Connexion
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
