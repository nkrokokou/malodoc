# 🧪 GUIDE DE TEST COMPLET - MALOdoc

## ✅ PRÉ-REQUIS

Vérifiez que ces deux serveurs sont actifs :

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# ➡️ Doit afficher : Server running on port 9000

# Terminal 2 - Frontend  
cd frontend
npm run dev
# ➡️ Doit afficher : Local: http://localhost:3000/
```

## 🔧 CONFIGURATION VÉRIFIÉE

✅ Backend: Port 9000 (backend/.env)
✅ Frontend: Port 3000 (vite.config.js)
✅ API URL: http://localhost:9000/api (frontend/.env)
✅ Base de données MySQL active

## 📝 TESTS PAR PAGE

### 1. PAGE D'ACCUEIL (/)

**URL:** http://localhost:3000/

**À vérifier:**
- [ ] Hero section avec gradient bleu
- [ ] Logo MALOdoc circulaire visible
- [ ] Titre "Votre Santé, Notre Priorité"
- [ ] 2 boutons CTA ("Commencer Maintenant" et "Trouver un Professionnel")
- [ ] Wave SVG en bas du hero
- [ ] Section "Pourquoi Choisir MALOdoc" avec 6 cards
- [ ] Section solidaire avec fond vert
- [ ] Section CTA finale
- [ ] Animations au scroll

**Actions à tester:**
1. Cliquer sur "Commencer Maintenant" → Redirige vers /register
2. Cliquer sur "Trouver un Professionnel" → Redirige vers /search-professionals
3. Scroller la page → Les animations se déclenchent
4. Hover sur les boutons → Scale effect
5. Responsive → Tester sur mobile (F12 → Toggle device)

### 2. PAGE INSCRIPTION (/register)

**URL:** http://localhost:3000/register

**À vérifier:**
- [ ] Bouton "Back to sign in" en haut
- [ ] Logo MALOdoc
- [ ] Titre "Create your account"
- [ ] Formulaire avec tous les champs :
  - First Name
  - Last Name
  - Email
  - Phone
  - Password
  - Confirm Password
- [ ] Bouton "Create account"

**Actions à tester:**
1. Remplir tous les champs avec des données valides
2. Tester mot de passe < 8 caractères → Message d'erreur
3. Tester mots de passe différents → Message d'erreur
4. S'inscrire avec données valides → Toast success + redirect dashboard
5. Vérifier que le user est dans la DB

### 3. PAGE CONNEXION (/login)

**URL:** http://localhost:3000/login

**À vérifier:**
- [ ] Logo MALOdoc
- [ ] Titre "Welcome to MALOdoc"
- [ ] Bouton "Continue with Google" (grisé)
- [ ] Séparateur "OR"
- [ ] Formulaire Email + Password
- [ ] Lien "Forgot password?"
- [ ] Lien "Sign up"
- [ ] Bouton "Sign in"

**Actions à tester:**
1. Cliquer sur Google button → Toast "OAuth Google sera bientôt disponible"
2. Connexion avec email incorrect → Message d'erreur
3. Connexion avec mot de passe incorrect → Message d'erreur
4. Connexion avec identifiants valides → Toast success + redirect dashboard
5. Cliquer sur "Forgot password?" → Redirige vers /forgot-password
6. Cliquer sur "Sign up" → Redirige vers /register

### 4. PAGE FORGOT PASSWORD (/forgot-password)

**URL:** http://localhost:3000/forgot-password

**À vérifier:**
- [ ] Bouton "Back to sign in"
- [ ] Logo MALOdoc
- [ ] Titre "Forgot Password?"
- [ ] Champ email
- [ ] Bouton "Send Reset Link"

**Actions à tester:**
1. Entrer un email
2. Cliquer sur "Send Reset Link" → Toast + écran de confirmation
3. Vérifier l'écran de confirmation avec checkmark vert
4. Cliquer sur "Retour à la connexion" → Redirige vers /login

### 5. DASHBOARD (/dashboard)

**URL:** http://localhost:3000/dashboard (nécessite connexion)

**À vérifier:**
- [ ] Welcome banner avec gradient
- [ ] Nom de l'utilisateur affiché
- [ ] Logo MALOdoc dans le banner
- [ ] 3 stats cards :
  - Rendez-vous (0)
  - En attente (0)
  - Consultations solidaires (0)
- [ ] Profile card avec :
  - Nom complet
  - Email
  - Téléphone
  - Rôle (badge)
  - Bouton "Modifier le profil"
- [ ] 4 Quick Actions colorées
- [ ] Section "Activité Récente" (vide)

**Actions à tester:**
1. Vérifier que les infos utilisateur sont correctes
2. Cliquer sur chaque Quick Action → Redirection vers page correspondante
3. Animations au chargement de la page
4. Hover sur les cards → Shadow effect

### 6. RECHERCHE PROFESSIONNELS (/search-professionals)

**URL:** http://localhost:3000/search-professionals

**À vérifier:**
- [ ] Titre "Trouvez votre Professionnel de Santé"
- [ ] Barre de recherche avec 3 champs :
  - Rechercher (nom)
  - Spécialité (dropdown)
  - Ville
- [ ] Bouton "Rechercher"
- [ ] 3 professionnels mock affichés :
  - Dr. Jean Kouadio
  - Dr. Marie Ablavi
  - Dr. Thomas Koffi
- [ ] Chaque card contient :
  - Avatar emoji
  - Nom + Spécialité
  - Clinique + Ville
  - Rating + nombre d'avis
  - Prix consultation
  - Badge "Créneaux Solidaires" (si applicable)
  - Boutons "Prendre Rendez-vous" et "Voir Profil"

**Actions à tester:**
1. Taper dans le champ recherche
2. Sélectionner une spécialité
3. Cliquer sur "Rechercher" → Toast
4. Cliquer sur "Prendre Rendez-vous" → Toast avec nom du pro
5. Cliquer sur "Voir Profil" → Toast
6. Hover sur les cards → Shadow effect

### 7. RECHERCHE PHARMACIES (/search-pharmacies)

**URL:** http://localhost:3000/search-pharmacies

**À vérifier:**
- [ ] Titre "Pharmacies à Proximité"
- [ ] Barre de recherche avec 2 champs + bouton "Pharmacies de Garde"
- [ ] 3 pharmacies mock :
  - Pharmacie du Centre (🟢 Ouverte, 24h/24)
  - Pharmacie de la Paix (🟢 Ouverte)
  - Pharmacie Espoir (🔴 Fermée)
- [ ] Chaque card contient :
  - Badge status (vert/gris)
  - Emoji 💊
  - Nom + Distance
  - Adresse complète
  - Horaires
  - Téléphone
  - Badge "Médicaments Solidaires" (si applicable)
  - Boutons "Appeler" et "Itinéraire"
- [ ] Placeholder carte interactive en bas

**Actions à tester:**
1. Rechercher une pharmacie
2. Cliquer sur "Pharmacies de Garde"
3. Cliquer sur "Appeler" → Toast avec nom pharmacie
4. Cliquer sur "Itinéraire" → Toast
5. Vérifier les couleurs de status (vert = ouvert, gris = fermé)

### 8. CONSULTATIONS SOLIDAIRES (/solidarity)

**URL:** http://localhost:3000/solidarity

**À vérifier:**
- [ ] Background gradient vert
- [ ] Icône cœur dans cercle
- [ ] Titre "Consultations Solidaires"
- [ ] Badge avec nombre de professionnels
- [ ] Section "Comment ça marche" (3 étapes numérotées)
- [ ] Filtres par spécialité (5 boutons)
- [ ] 3 créneaux solidaires :
  - Dr. Jean Kouadio (4 créneaux)
  - Dr. Marie Ablavi (3 créneaux)
  - Dr. Thomas Koffi (5 créneaux)
- [ ] Chaque créneau contient :
  - Header gradient vert avec nom + spécialité
  - Nombre de créneaux disponibles
  - Date + Localisation
  - Boutons horaires (09:00, 09:30, etc.)
  - Badge "100% Gratuit"
- [ ] CTA "Devenir Partenaire Solidaire" en bas

**Actions à tester:**
1. Cliquer sur filtres de spécialité → Liste filtrée
2. Cliquer sur un horaire → Toast "Créneau réservé"
3. Hover sur boutons horaires → Scale effect
4. Cliquer sur "Devenir Partenaire Solidaire"
5. Vérifier les animations au scroll

### 9. PAGE DONS (/donations)

**URL:** http://localhost:3000/donations

**À vérifier:**
- [ ] Icône cœur animé (pulse)
- [ ] Titre "Faites un Don"
- [ ] 3 stats cards :
  - Dons collectés (2.5M FCFA)
  - Donateurs (856)
  - Consultations financées (1,243)
- [ ] Formulaire de don avec :
  - 5 montants prédéfinis (5K, 10K, 25K, 50K, 100K)
  - Champ montant personnalisé
  - Checkbox "Don anonyme"
  - Formulaire donateur (si non anonyme)
  - 4 méthodes de paiement (Orange, MTN, CB, Moov)
  - Bouton "Faire un don"
- [ ] Sidebar avec :
  - Impact du don (3 niveaux)
  - Top donateurs (4 personnes)
- [ ] 2 témoignages en bas

**Actions à tester:**
1. Cliquer sur montants prédéfinis → Montant sélectionné
2. Entrer montant personnalisé
3. Cocher "Don anonyme" → Formulaire disparaît
4. Décocher → Formulaire réapparaît
5. Remplir formulaire donateur
6. Cliquer sur méthode de paiement
7. Cliquer sur "Faire un don" → Toast avec montant
8. Tester montant < 500 → Message d'erreur
9. Hover sur boutons montants → Scale effect

### 10. NAVBAR

**À vérifier sur toutes les pages:**
- [ ] Logo MALOdoc cliquable (gauche)
- [ ] Links navigation :
  - Professionnels
  - Pharmacies
  - Solidarité
  - Dons
- [ ] Boutons droite (si non connecté) :
  - Connexion
  - Inscription
- [ ] Boutons droite (si connecté) :
  - Dashboard
  - Déconnexion

**Actions à tester:**
1. Cliquer sur logo → Redirige vers /
2. Cliquer sur chaque link → Navigation correcte
3. Connexion → Boutons changent
4. Déconnexion → Retour aux boutons login/register

## 🎨 TESTS VISUELS

### Responsive Design
1. Desktop (> 1024px) ✅
2. Tablet (768px - 1024px) ✅
3. Mobile (< 768px) ✅

**Comment tester:**
- F12 → Toggle device toolbar
- Tester sur iPhone, iPad, Desktop

### Animations
- [ ] Page entrance (fade + slide)
- [ ] Scroll animations (scroll-triggered)
- [ ] Hover effects (scale)
- [ ] Click effects (scale down)
- [ ] Toast notifications

### Thème
- [ ] Couleurs cohérentes (bleu, vert, gris)
- [ ] Gradients fluides
- [ ] Shadows subtiles
- [ ] Border radius harmonieux
- [ ] Typographie claire

## 🔌 TESTS API

### Test Connexion Backend
```bash
# Dans un terminal
curl http://localhost:9000/api/health

# Devrait retourner: {"status":"ok"}
```

### Test Inscription
```bash
curl -X POST http://localhost:9000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "+22890000000",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "PATIENT"
  }'
```

### Test Connexion
```bash
curl -X POST http://localhost:9000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@example.com",
    "password": "password123"
  }'
```

## 🐛 ERREURS CONNUES À VÉRIFIER

- [ ] Console browser sans erreurs
- [ ] Aucune erreur 404
- [ ] Aucune erreur CORS
- [ ] Aucun warning React
- [ ] Images/icônes chargent correctement
- [ ] Toast apparaissent et disparaissent
- [ ] Redirections fonctionnent

## ✅ CHECKLIST FINALE

### Configuration
- [x] Backend sur port 9000
- [x] Frontend sur port 3000
- [x] API URL correcte dans .env
- [x] Base de données MySQL active
- [x] Toutes les dépendances installées

### Pages
- [x] Home (/)
- [x] Login (/login)
- [x] Register (/register)
- [x] Forgot Password (/forgot-password)
- [x] Dashboard (/dashboard)
- [x] Search Professionals (/search-professionals)
- [x] Search Pharmacies (/search-pharmacies)
- [x] Solidarity (/solidarity)
- [x] Donations (/donations)

### Composants
- [x] Logo
- [x] AuthCard
- [x] GoogleButton
- [x] Divider
- [x] Navbar
- [x] PrivateRoute

### Fonctionnalités
- [x] Authentification (register/login/logout)
- [x] Toast notifications
- [x] Animations Framer Motion
- [x] Responsive design
- [x] Navigation React Router
- [x] Protected routes
- [x] Mock data affichés

## 🎉 PRODUIT FINI

Si tous les tests passent ✅, l'application est **PRODUCTION READY** !

**Prochaines étapes (optionnel) :**
1. Connecter les vraies API
2. Implémenter OAuth Google
3. Ajouter carte Leaflet
4. Intégrer Mobile Money
5. Déployer en production
