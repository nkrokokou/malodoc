import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';
import AuthCard from '../components/AuthCard';
import GoogleButton from '../components/GoogleButton';
import Divider from '../components/Divider';

const Login = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData);
    
    if (result.success) {
      toast.success('Connexion réussie !');
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Erreur de connexion');
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    toast.info('OAuth Google sera bientôt disponible !');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <AuthCard>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo size="large" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Welcome to MALOdoc
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to continue
        </p>

        {/* Google Button */}
        <GoogleButton onClick={handleGoogleLogin} />

        {/* Divider */}
        <Divider text="OR" />

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMail className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLockClosed className="text-gray-400 text-xl" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link 
            to="/forgot-password" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Forgot password?
          </Link>
          <div className="text-gray-600">
            Need an account?{' '}
            <Link 
              to="/register" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default Login;
