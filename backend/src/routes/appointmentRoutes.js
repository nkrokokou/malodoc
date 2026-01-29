import express from 'express';
import { body } from 'express-validator';
import {
  createAppointment,
  getMyAppointments,
  getAppointment,
  cancelAppointment,
  completeAppointment,
} from '../controllers/appointmentController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import validate from '../middleware/validator.js';

const router = express.Router();

// Créer un rendez-vous (patient uniquement)
router.post(
  '/',
  authenticate,
  authorize('PATIENT'),
  [
    body('availabilityId').notEmpty().withMessage('ID de disponibilité requis'),
    body('reason').optional().isString(),
    body('notes').optional().isString(),
  ],
  validate,
  createAppointment
);

// Obtenir mes rendez-vous
router.get('/my-appointments', authenticate, getMyAppointments);

// Obtenir un rendez-vous spécifique
router.get('/:id', authenticate, getAppointment);

// Annuler un rendez-vous
router.put('/:id/cancel', authenticate, cancelAppointment);

// Marquer comme complété (professionnel uniquement)
router.put(
  '/:id/complete',
  authenticate,
  authorize('PROFESSIONAL', 'ADMIN'),
  completeAppointment
);

export default router;
