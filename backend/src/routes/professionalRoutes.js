import express from 'express';
import { body } from 'express-validator';
import {
  createOrUpdateProfile,
  searchProfessionals,
  getProfessionalProfile,
  createAvailabilities,
  getAvailabilities,
  deleteAvailability,
  getSolidaritySlots,
} from '../controllers/professionalController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import validate from '../middleware/validator.js';

const router = express.Router();

// Créer ou mettre à jour le profil professionnel
router.post(
  '/profile',
  authenticate,
  [
    body('specialty').notEmpty().withMessage('Spécialité requise'),
    body('licenseNumber').optional().isString(),
    body('clinicAddress').notEmpty().withMessage('Adresse requise'),
    body('city').notEmpty().withMessage('Ville requise'),
    body('latitude').isFloat().withMessage('Latitude invalide'),
    body('longitude').isFloat().withMessage('Longitude invalide'),
    body('consultationFee').optional().isFloat({ min: 0 }),
  ],
  validate,
  createOrUpdateProfile
);

// Rechercher des professionnels (public)
router.get('/search', optionalAuth, searchProfessionals);

// Obtenir un profil professionnel (public)
router.get('/:id', optionalAuth, getProfessionalProfile);

// Créer des disponibilités (professionnel uniquement)
router.post(
  '/availabilities',
  authenticate,
  authorize('PROFESSIONAL'),
  [
    body('date').notEmpty().withMessage('Date requise'),
    body('slots').isArray({ min: 1 }).withMessage('Au moins un créneau requis'),
  ],
  validate,
  createAvailabilities
);

// Obtenir les disponibilités d'un professionnel
router.get('/:professionalId/availabilities', getAvailabilities);

// Supprimer une disponibilité
router.delete(
  '/availabilities/:id',
  authenticate,
  authorize('PROFESSIONAL'),
  deleteAvailability
);

// Obtenir les créneaux solidaires (public)
router.get('/solidarity/slots', getSolidaritySlots);

export default router;
