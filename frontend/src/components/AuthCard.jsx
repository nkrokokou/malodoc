import { motion } from 'framer-motion';

const AuthCard = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
    >
      {children}
    </motion.div>
  );
};

export default AuthCard;
