import express from 'express';
import { body } from 'express-validator';
import {
  createOrUpdateProfile,
  searchPharmacies,
  getPharmacy,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  searchMedicines,
  getSolidarityMedicines,
} from '../controllers/pharmacyController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import validate from '../middleware/validator.js';

const router = express.Router();

// Créer ou mettre à jour le profil pharmacie
router.post(
  '/profile',
  authenticate,
  [
    body('pharmacyName').notEmpty().withMessage('Nom de la pharmacie requis'),
    body('licenseNumber').optional().isString(),
    body('address').notEmpty().withMessage('Adresse requise'),
    body('city').notEmpty().withMessage('Ville requise'),
    body('latitude').isFloat().withMessage('Latitude invalide'),
    body('longitude').isFloat().withMessage('Longitude invalide'),
    body('phone').isMobilePhone('any').withMessage('Téléphone invalide'),
  ],
  validate,
  createOrUpdateProfile
);

// Rechercher des pharmacies (public)
router.get('/search', optionalAuth, searchPharmacies);

// Obtenir une pharmacie spécifique (public)
router.get('/:id', optionalAuth, getPharmacy);

// Ajouter un médicament (pharmacie uniquement)
router.post(
  '/medicines',
  authenticate,
  authorize('PHARMACY'),
  [
    body('name').notEmpty().withMessage('Nom du médicament requis'),
    body('category').notEmpty().withMessage('Catégorie requise'),
    body('price').isFloat({ min: 0 }).withMessage('Prix invalide'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantité invalide'),
  ],
  validate,
  addMedicine
);

// Mettre à jour un médicament (pharmacie uniquement)
router.put(
  '/medicines/:id',
  authenticate,
  authorize('PHARMACY'),
  updateMedicine
);

// Supprimer un médicament (pharmacie uniquement)
router.delete(
  '/medicines/:id',
  authenticate,
  authorize('PHARMACY'),
  deleteMedicine
);

// Rechercher des médicaments (public)
router.get('/medicines/search', searchMedicines);

// Obtenir les médicaments solidaires (public)
router.get('/medicines/solidarity', getSolidarityMedicines);

export default router;
