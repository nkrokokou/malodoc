# 📖 Guide d'Installation - MALOdoc

## 🎯 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger](https://nodejs.org/)
- **PostgreSQL** (version 14 ou supérieure) - [Télécharger](https://www.postgresql.org/download/)
- **Git** - [Télécharger](https://git-scm.com/)
- Un éditeur de code (VS Code recommandé)

## 📦 Installation

### 1. Cloner le projet (si applicable)

```bash
git clone <votre-repo>
cd Malodoc
```

### 2. Configuration de la Base de Données

#### Créer la base de données PostgreSQL

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE malodoc;

# Quitter PostgreSQL
\q
```

### 3. Configuration du Backend

#### Installer les dépendances

```bash
cd backend
npm install
```

#### Configurer les variables d'environnement

Créez un fichier `.env` à la racine du dossier `backend` :

```bash
cp .env.example .env
```

Éditez le fichier `.env` et configurez vos variables :

```env
# Database
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/malodoc?schema=public"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=votre_secret_jwt_tres_securise_changez_moi
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Email Configuration (optionnel pour commencer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@malodoc.com
```

#### Générer le client Prisma et créer les tables

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables dans la base de données
npx prisma migrate dev --name init

# (Optionnel) Ouvrir Prisma Studio pour visualiser la base de données
npx prisma studio
```

### 4. Configuration du Frontend

#### Installer les dépendances

```bash
cd ../frontend
npm install
```

#### Configurer Tailwind CSS

```bash
# Générer le fichier postcss.config.js
echo "export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}" > postcss.config.js
```

#### Créer le fichier .env (optionnel)

```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

## 🚀 Lancement de l'application

### Option 1 : Lancement manuel (2 terminaux)

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Le backend démarrera sur `http://localhost:5000`

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Le frontend démarrera sur `http://localhost:3000`

### Option 2 : Script de lancement automatique (Windows)

Créez un fichier `start.bat` à la racine :

```batch
@echo off
echo Starting MALOdoc...
start cmd /k "cd backend && npm run dev"
timeout /t 5
start cmd /k "cd frontend && npm run dev"
echo MALOdoc started!
```

Puis double-cliquez sur `start.bat`

### Option 3 : Script de lancement (Linux/Mac)

Créez un fichier `start.sh` à la racine :

```bash
#!/bin/bash
echo "Starting MALOdoc..."
cd backend && npm run dev &
sleep 5
cd ../frontend && npm run dev &
echo "MALOdoc started!"
```

Rendez-le exécutable et lancez :

```bash
chmod +x start.sh
./start.sh
```

## ✅ Vérification de l'installation

1. **Backend** : Ouvrez `http://localhost:5000` dans votre navigateur
   - Vous devriez voir un message JSON de bienvenue

2. **Frontend** : Ouvrez `http://localhost:3000` dans votre navigateur
   - Vous devriez voir la page d'accueil de MALOdoc

3. **Base de données** : Vérifiez avec Prisma Studio
   ```bash
   cd backend
   npx prisma studio
   ```

## 🧪 Tester l'application

### 1. Créer un compte

1. Cliquez sur "Inscription" dans la navbar
2. Remplissez le formulaire :
   - Prénom: Test
   - Nom: Utilisateur
   - Email: test@malodoc.com
   - Téléphone: +22890000000
   - Mot de passe: test123456

3. Cliquez sur "S'inscrire"

### 2. Se connecter

1. Cliquez sur "Connexion"
2. Utilisez vos identifiants
3. Vous serez redirigé vers le Dashboard

### 3. Tester les API avec un outil comme Postman ou Thunder Client

#### Exemple: Login

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "identifier": "test@malodoc.com",
  "password": "test123456"
}
```

## 🐛 Résolution des problèmes

### Le backend ne démarre pas

- Vérifiez que PostgreSQL est bien démarré
- Vérifiez l'URL de connexion dans `.env`
- Vérifiez que le port 5000 n'est pas déjà utilisé

### Le frontend ne démarre pas

- Vérifiez que les dépendances sont installées : `npm install`
- Vérifiez que le port 3000 n'est pas déjà utilisé
- Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`

### Erreur de connexion à la base de données

```bash
# Vérifier que PostgreSQL est actif
# Windows
pg_ctl status

# Linux/Mac
sudo systemctl status postgresql
```

### Erreur Prisma

```bash
# Réinitialiser Prisma
cd backend
rm -rf node_modules
rm -rf prisma/migrations
npm install
npx prisma generate
npx prisma migrate dev --name init
```

## 📚 Prochaines étapes

Maintenant que l'application est installée, vous pouvez :

1. **Ajouter des données de test** :
   - Créer des profils professionnels
   - Ajouter des pharmacies
   - Créer des créneaux de disponibilité

2. **Développer les fonctionnalités manquantes** :
   - Recherche de professionnels avec filtres
   - Système de réservation complet
   - Intégration des cartes (Leaflet)
   - Système de paiement Mobile Money
   - Notifications SMS/Email

3. **Déployer en production** :
   - Configurer un serveur (VPS, Heroku, Vercel)
   - Utiliser une base de données cloud (Supabase, Railway)
   - Configurer un nom de domaine

## 🔐 Sécurité

⚠️ **IMPORTANT** : Avant de déployer en production :

1. Changez le `JWT_SECRET` dans `.env`
2. Utilisez des mots de passe forts pour PostgreSQL
3. Activez HTTPS
4. Configurez les CORS correctement
5. Ajoutez un système de rate limiting
6. Validez toutes les entrées utilisateur

## 📞 Support

Pour toute question ou problème :
- Consultez la documentation : README.md
- Vérifiez les logs dans la console
- Utilisez Prisma Studio pour inspecter la base de données

## 🎉 Félicitations !

Votre application MALOdoc est maintenant opérationnelle ! 🚀

Vous avez une base solide pour continuer le développement. Bonne chance ! 💪
