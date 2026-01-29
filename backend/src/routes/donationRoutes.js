import express from 'express';
import { body } from 'express-validator';
import {
  createDonation,
  confirmDonation,
  getDonations,
  getDonationStats,
  getMyDonations,
  getDonation,
  getTopDonors,
} from '../controllers/donationController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import validate from '../middleware/validator.js';

const router = express.Router();

// Créer un don (public ou authentifié)
router.post(
  '/',
  optionalAuth,
  [
    body('amount').isFloat({ min: 100 }).withMessage('Montant minimum 100 XOF'),
    body('paymentMethod').isIn(['mobile_money', 'card']).withMessage('Méthode de paiement invalide'),
    body('paymentProvider').optional().isString(),
    body('donorName').optional().isString(),
    body('donorEmail').optional().isEmail(),
    body('donorPhone').optional().isMobilePhone('any'),
  ],
  validate,
  createDonation
);

// Confirmer un don (webhook)
router.post('/confirm', confirmDonation);

// Obtenir tous les dons (public)
router.get('/', getDonations);

// Obtenir les statistiques des dons (public)
router.get('/stats', getDonationStats);

// Obtenir mes dons (authentifié)
router.get('/my-donations', authenticate, getMyDonations);

// Tableau d'honneur des donateurs (public)
router.get('/top-donors', getTopDonors);

// Obtenir un don spécifique
router.get('/:id', optionalAuth, getDonation);

export default router;
