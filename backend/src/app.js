import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Import des routes
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();

// Middlewares de sécurité
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Bienvenue sur l\'API MALOdoc',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            appointments: '/api/appointments',
            professionals: '/api/professionals',
            pharmacies: '/api/pharmacies',
            donations: '/api/donations',
        },
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/donations', donationRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Erreur serveur interne',
    });
});

// Export pour Vercel
export default app;
