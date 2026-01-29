# MALOdoc - Plateforme de Prise de Rendez-vous Médicaux

## 🏥 Présentation

MALOdoc est une plateforme solidaire de prise de rendez-vous médicaux conçue pour faciliter l'accès aux soins en Afrique.

## ✨ Fonctionnalités

### Pour les Patients
- 📅 Prise de rendez-vous en ligne
- 🔍 Recherche de professionnels de santé
- 📍 Géolocalisation des pharmacies
- 💝 Accès aux créneaux solidaires (consultations gratuites)
- 💰 Système de dons
- 🔔 Notifications SMS/Email

### Pour les Professionnels
- 📊 Gestion du calendrier
- ⏰ Gestion des créneaux horaires
- 🤝 Création de créneaux solidaires
- 👥 Gestion des patients

### Pour les Pharmacies
- 💊 Gestion du stock de médicaments
- 📋 Réception d'ordonnances numériques
- 📍 Géolocalisation

## 🛠 Stack Technique

### Backend
- Node.js + Express.js
- PostgreSQL + Prisma ORM
- JWT Authentication
- Bcrypt pour les mots de passe

### Frontend
- React.js + Vite
- Tailwind CSS
- React Router
- Axios

### Services
- Mapbox/Leaflet (géolocalisation)
- Fedapay/Kkiapay (Mobile Money)
- Twilio/Africa's Talking (SMS)

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- PostgreSQL (v14+)
- npm ou yarn

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 Variables d'environnement

Voir `.env.example` dans les dossiers backend et frontend.

## 📖 Documentation

- [API Documentation](./backend/docs/API.md)
- [Guide utilisateur](./docs/USER_GUIDE.md)

## 👥 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 Licence

MIT License - voir [LICENSE](./LICENSE)

## 📧 Contact

Pour toute question : contact@malodoc.com
