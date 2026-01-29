import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import validate from '../middleware/validator.js';

const router = express.Router();

// Inscription
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('phone').isMobilePhone('any').withMessage('Numéro de téléphone invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('firstName').notEmpty().withMessage('Le prénom est requis'),
    body('lastName').notEmpty().withMessage('Le nom est requis'),
    body('role').optional().isIn(['PATIENT', 'PROFESSIONAL', 'PHARMACY']).withMessage('Rôle invalide'),
  ],
  validate,
  register
);

// Connexion
router.post(
  '/login',
  [
    body('identifier').notEmpty().withMessage('Email ou téléphone requis'),
    body('password').notEmpty().withMessage('Mot de passe requis'),
  ],
  validate,
  login
);

// Obtenir le profil (nécessite authentification)
router.get('/profile', authenticate, getProfile);

// Mettre à jour le profil
router.put(
  '/profile',
  authenticate,
  [
    body('firstName').optional().notEmpty().withMessage('Le prénom ne peut pas être vide'),
    body('lastName').optional().notEmpty().withMessage('Le nom ne peut pas être vide'),
    body('phone').optional().isMobilePhone('any').withMessage('Numéro de téléphone invalide'),
  ],
  validate,
  updateProfile
);

// Changer le mot de passe
router.put(
  '/change-password',
  authenticate,
  [
    body('currentPassword').notEmpty().withMessage('Mot de passe actuel requis'),
    body('newPassword').isLength({ min: 6 }).withMessage('Le nouveau mot de passe doit contenir au moins 6 caractères'),
  ],
  validate,
  changePassword
);

export default router;
