"use client"

import React, { createContext, useContext, useState } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        // Global
        "app.name": "Malodoc",
        "app.pro": "MaloPro",

        // Sidebar (Patient)
        "sidebar.overview": "Overview",
        "sidebar.appointments": "Appointments",
        "sidebar.patients": "Patients",
        "sidebar.pharmacy": "Pharmacy",
        "sidebar.solidarity": "Solidarity",
        "sidebar.settings": "Records",
        "sidebar.logout": "Logout",
        "sidebar.premium": "Premium Plan",
        "sidebar.premium_desc": "Priority booking access",
        "sidebar.upgrade": "Upgrade",

        // Sidebar (Doctor)
        "sidebar.doctor_portal": "Doctor Portal",
        "sidebar.my_patients": "My Patients",
        "sidebar.requests": "Requests",
        "sidebar.schedule": "Schedule",
        "sidebar.status_online": "Status: Online",
        "sidebar.status_desc": "Accepting new patients",
        "sidebar.go_offline": "Go Offline",

        // Dashboard (Patient)
        "dashboard.overview": "Overview",
        "dashboard.welcome": "Welcome back to Malodoc.",
        "dashboard.patients": "Total Patients",
        "dashboard.appointments": "Appointments",
        "dashboard.doctors": "Active Doctors",
        "dashboard.donations": "Donations",
        "dashboard.activity": "Activity Overview",

        // Dashboard (Doctor)
        "doctor.portal": "Doctor Portal",
        "doctor.welcome": "Welcome back, {name}.",
        "doctor.total_appointments": "Total Appointments",
        "doctor.pending_requests": "Pending Requests",
        "doctor.synced_live": "Synced Live",
        "doctor.action_required": "Action Required",
        "doctor.requests_title": "Appointment Requests",
        "doctor.requests_desc": "Live incoming requests from patients.",
        "doctor.todays_schedule": "Today's Schedule",
        "doctor.timeline": "Your timeline.",

        // Requests Page
        "requests.title": "Appointment Requests",
        "requests.desc": "Manage incoming consultation requests.",
        "requests.empty": "All caught up!",
        "requests.empty_desc": "No pending requests at the moment.",
        "requests.accept": "Accept",
        "requests.decline": "Decline",

        // Schedule Page
        "schedule.title": "My Schedule",
        "schedule.desc": "Your timeline for the week.",
        "schedule.sync": "Sync Calendar",
        "schedule.join_call": "Join Call",
        "schedule.consultation": "Consultation",
        "schedule.telemedicine": "Telemedicine",

        // Role Switcher
        "role.patient": "Patient View",
        "role.doctor": "Doctor View",

        // Appointments Page (Patient)
        "appointments.title": "Appointments",
        "appointments.desc": "Manage your upcoming and past appointments.",
        "appointments.col_id": "ID",
        "appointments.col_patient": "Patient",
        "appointments.col_date": "Date & Time",
        "appointments.col_doctor": "Doctor",
        "appointments.col_type": "Type",
        "appointments.col_status": "Status",
        "appointments.col_actions": "Actions",
        "appointments.action_view": "View details",
        "appointments.action_reschedule": "Reschedule",
        "appointments.action_cancel": "Cancel",

        // Pharmacy Page
        "pharmacy.title": "Pharmacy & Medicines",
        "pharmacy.search_title": "Find Medicine in Lomé",
        "pharmacy.search_desc": "Search for pharmacies with stock near you",
        "pharmacy.search_placeholder": "Search e.g., Amoxicillin, Paracetamol...",
        "pharmacy.search_btn": "Search",
        "pharmacy.in_stock": "In Stock",
        "pharmacy.out_of_stock": "Out of Stock",
        "pharmacy.view_map": "View Map (Lomé)",
        "pharmacy.quick_order": "Quick Order",
        "pharmacy.upload_desc": "Upload your prescription (Ordonnance)",
        "pharmacy.click_upload": "Click to Upload",
        "pharmacy.upload_formats": "Support PDF, JPG, PNG",
        "pharmacy.disclaimer": "By uploading, you agree to share this document with partner pharmacies.",
        "pharmacy.send_btn": "Send to Pharmacies",

        // Solidarity Page
        "solidarity.title": "Solidarity Slots",
        "solidarity.desc": "Access affordable healthcare sponsored by the Malodoc Foundation.",
        "solidarity.donate": "Make a Donation",
        "solidarity.free": "FREE / GRATUIT",
        "solidarity.reduced": "-50% REDUCED",
        "solidarity.book_free": "Book Free Slot",
        "solidarity.book_reduced": "Book Reduced Slot",
        "solidarity.reviews": "avis",

        // Admin & Profile
        "admin.portal": "Admin Portal",
        "admin.users": "User Management",
        "admin.settings": "System Settings",
        "profile.title": "My Profile",
        "profile.desc": "Manage your account settings and preferences.",
        "profile.personal_info": "Personal Information",
        "profile.security": "Security",
        "profile.name": "Full Name",
        "profile.email": "Email Address",
        "profile.role": "Current Role",
        "profile.save": "Save Changes",
    },
    fr: {
        // Global
        "app.name": "Malodoc",
        "app.pro": "MaloPro",

        // Sidebar (Patient)
        "sidebar.overview": "Accueil",
        "sidebar.appointments": "Rendez-vous",
        "sidebar.patients": "Patients",
        "sidebar.pharmacy": "Pharmacie",
        "sidebar.solidarity": "Solidarité",
        "sidebar.settings": "Dossier Médical",
        "sidebar.logout": "Déconnexion",
        "sidebar.premium": "Plan Premium",
        "sidebar.premium_desc": "Accès prioritaire",
        "sidebar.upgrade": "Améliorer",

        // Sidebar (Doctor)
        "sidebar.doctor_portal": "Portail Docteur",
        "sidebar.my_patients": "Mes Patients",
        "sidebar.requests": "Demandes",
        "sidebar.schedule": "Planning",
        "sidebar.status_online": "Statut: En Ligne",
        "sidebar.status_desc": "Accepte nouveaux patients",
        "sidebar.go_offline": "Passer Hors Ligne",

        // Admin Sidebar
        "sidebar.admin_portal": "Portail Admin",
        "sidebar.users": "Utilisateurs",
        "sidebar.system": "Système",
        "sidebar.profile": "Mon Profil",

        // Dashboard (Patient)
        "dashboard.overview": "Vue d'ensemble",
        "dashboard.welcome": "Bienvenue sur Malodoc.",
        "dashboard.patients": "Total Patients",
        "dashboard.appointments": "Rendez-vous",
        "dashboard.doctors": "Médecins Actifs",
        "dashboard.donations": "Dons",
        "dashboard.activity": "Activité Récente",

        // Dashboard (Doctor)
        "doctor.portal": "Portail Docteur",
        "doctor.welcome": "Bon retour, {name}.",
        "doctor.total_appointments": "Total Rendez-vous",
        "doctor.pending_requests": "Demandes En Attente",
        "doctor.synced_live": "Synchro Live",
        "doctor.action_required": "Action Requise",
        "doctor.requests_title": "Demandes de RDV",
        "doctor.requests_desc": "Demandes entrantes en temps réel.",
        "doctor.todays_schedule": "Planning du Jour",
        "doctor.timeline": "Votre chronologie.",

        // Admin & Profile
        "admin.portal": "Portail Admin",
        "admin.users": "Gestion Utilisateurs",
        "admin.settings": "Paramètres Système",
        "profile.title": "Mon Profil",
        "profile.desc": "Gérez vos paramètres de compte et préférences.",
        "profile.personal_info": "Informations Personnelles",
        "profile.security": "Sécurité",
        "profile.name": "Nom Complet",
        "profile.email": "Adresse Email",
        "profile.role": "Rôle Actuel",
        "profile.save": "Enregistrer",
        "profile.bio": "Biographie",
        "profile.location": "Localisation",

        // Requests Page
        "requests.title": "Demandes de Consultation",
        "requests.desc": "Gérer les demandes entrantes.",
        "requests.empty": "Tout est à jour !",
        "requests.empty_desc": "Aucune demande en attente pour le moment.",
        "requests.accept": "Accepter",
        "requests.decline": "Refuser",

        // Schedule Page
        "schedule.title": "Mon Planning",
        "schedule.desc": "Votre semaine en un coup d'œil.",
        "schedule.sync": "Synchro Calendrier",
        "schedule.join_call": "Rejoindre l'appel",
        "schedule.consultation": "Consultation",
        "schedule.telemedicine": "Téléconsultation",

        // Role Switcher
        "role.patient": "Vue Patient",
        "role.doctor": "Vue Docteur",

        // Appointments Page (Patient)
        "appointments.title": "Mes Rendez-vous",
        "appointments.desc": "Gérez vos rendez-vous passés et à venir.",
        "appointments.col_id": "ID",
        "appointments.col_patient": "Patient",
        "appointments.col_date": "Date & Heure",
        "appointments.col_doctor": "Docteur",
        "appointments.col_type": "Type",
        "appointments.col_status": "Statut",
        "appointments.col_actions": "Actions",
        "appointments.action_view": "Voir détails",
        "appointments.action_reschedule": "Reporter",
        "appointments.action_cancel": "Annuler",

        // Pharmacy Page
        "pharmacy.title": "Pharmacie & Médicaments",
        "pharmacy.search_title": "Trouver des médicaments à Lomé",
        "pharmacy.search_desc": "Cherchez des pharmacies avec du stock près de chez vous.",
        "pharmacy.search_placeholder": "Recherche ex: Amoxicilline, Paracétamol...",
        "pharmacy.search_btn": "Rechercher",
        "pharmacy.in_stock": "En Stock",
        "pharmacy.out_of_stock": "Rupture de Stock",
        "pharmacy.view_map": "Voir Carte (Lomé)",
        "pharmacy.quick_order": "Commande Rapide",
        "pharmacy.upload_desc": "Téléchargez votre ordonnance",
        "pharmacy.click_upload": "Cliquez pour envoyer",
        "pharmacy.upload_formats": "Support PDF, JPG, PNG",
        "pharmacy.disclaimer": "En téléchargeant, vous acceptez de partager ce document avec les pharmacies partenaires.",
        "pharmacy.send_btn": "Envoyer aux Pharmacies",

        // Solidarity Page
        "solidarity.title": "Créneaux Solidaires",
        "solidarity.desc": "Accédez à des soins abordables sponsorisés par la Fondation Malodoc.",
        "solidarity.donate": "Faire un Don",
        "solidarity.free": "GRATUIT",
        "solidarity.reduced": "-50% RÉDUIT",
        "solidarity.book_free": "Réserver (Gratuit)",
        "solidarity.book_reduced": "Réserver (Réduit)",
        "solidarity.reviews": "avis",
    }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("fr") // Default to French

    const t = (key: string) => {
        // @ts-expect-error - minimalist typing for demo
        return translations[language][key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
