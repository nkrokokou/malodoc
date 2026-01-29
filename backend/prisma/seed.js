import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Nettoyer la base de données
    console.log('🧹 Cleaning database...');
    // Disable triggers for PostgreSQL to allow cleaning
    await prisma.$executeRawUnsafe(`SET session_replication_role = 'replica';`);

    await prisma.review.deleteMany();
    await prisma.prescription.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.availability.deleteMany();
    await prisma.medicine.deleteMany();
    await prisma.donation.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.professionalProfile.deleteMany();
    await prisma.pharmacyProfile.deleteMany();
    await prisma.patientProfile.deleteMany();
    await prisma.user.deleteMany();

    // Re-enable triggers
    await prisma.$executeRawUnsafe(`SET session_replication_role = 'origin';`);

    // Hash password
    const hashedPassword = await bcrypt.hash('test123456', 10);

    // 1. Créer des utilisateurs patients
    console.log('👥 Creating patients...');
    const patient1 = await prisma.user.create({
        data: {
            id: 'patient-1',
            email: 'test@malodoc.com',
            phone: '+22890000000',
            password: hashedPassword,
            role: 'PATIENT',
            firstName: 'Test',
            lastName: 'Utilisateur',
            isVerified: true,
            updatedAt: new Date(),
            patientProfile: {
                create: {
                    id: 'patient-profile-1',
                    dateOfBirth: new Date('1990-01-15'),
                    gender: 'MALE',
                    address: '123 Rue de la Paix',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1319,
                    longitude: 1.2228,
                    bloodType: 'O+',
                    updatedAt: new Date(),
                },
            },
        },
    });

    const patient2 = await prisma.user.create({
        data: {
            id: 'patient-2',
            email: 'marie.koffi@example.com',
            phone: '+22891111111',
            password: hashedPassword,
            role: 'PATIENT',
            firstName: 'Marie',
            lastName: 'Koffi',
            isVerified: true,
            updatedAt: new Date(),
            patientProfile: {
                create: {
                    id: 'patient-profile-2',
                    dateOfBirth: new Date('1985-05-20'),
                    gender: 'FEMALE',
                    address: '45 Avenue du Golfe',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1256,
                    longitude: 1.2116,
                    bloodType: 'A+',
                    updatedAt: new Date(),
                },
            },
        },
    });

    // 2. Créer des professionnels de santé
    console.log('👨‍⚕️ Creating healthcare professionals...');

    const professional1 = await prisma.user.create({
        data: {
            id: 'prof-1',
            email: 'dr.kouadio@malodoc.com',
            phone: '+22892000000',
            password: hashedPassword,
            role: 'PROFESSIONAL',
            firstName: 'Jean',
            lastName: 'Kouadio',
            isVerified: true,
            updatedAt: new Date(),
            professionalProfile: {
                create: {
                    id: 'prof-profile-1',
                    specialty: 'Cardiologue',
                    licenseNumber: 'MED-TG-2015-001',
                    isVerified: true,
                    clinicName: 'Clinique du Cœur',
                    clinicAddress: '15 Boulevard de la République',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1375,
                    longitude: 1.2123,
                    consultationFee: 15000,
                    bio: 'Cardiologue expérimenté avec 15 ans de pratique. Spécialisé dans les maladies cardiovasculaires et la prévention.',
                    yearsOfExperience: 15,
                    languages: JSON.stringify(['Français', 'Ewe', 'Anglais']),
                    workingHours: JSON.stringify({
                        monday: '08:00-17:00',
                        tuesday: '08:00-17:00',
                        wednesday: '08:00-17:00',
                        thursday: '08:00-17:00',
                        friday: '08:00-15:00',
                        saturday: '09:00-12:00',
                    }),
                    hasSolidaritySlots: true,
                    solidarityPercentage: 20,
                    updatedAt: new Date(),
                },
            },
        },
    });

    const professional2 = await prisma.user.create({
        data: {
            id: 'prof-2',
            email: 'dr.ablavi@malodoc.com',
            phone: '+22892111111',
            password: hashedPassword,
            role: 'PROFESSIONAL',
            firstName: 'Marie',
            lastName: 'Ablavi',
            isVerified: true,
            updatedAt: new Date(),
            professionalProfile: {
                create: {
                    id: 'prof-profile-2',
                    specialty: 'Pédiatre',
                    licenseNumber: 'MED-TG-2018-045',
                    isVerified: true,
                    clinicName: 'Centre Pédiatrique Espoir',
                    clinicAddress: '28 Rue des Enfants',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1289,
                    longitude: 1.2245,
                    consultationFee: 12000,
                    bio: 'Pédiatre passionnée par la santé des enfants. Consultations pour nourrissons, enfants et adolescents.',
                    yearsOfExperience: 8,
                    languages: JSON.stringify(['Français', 'Mina']),
                    workingHours: JSON.stringify({
                        monday: '09:00-18:00',
                        tuesday: '09:00-18:00',
                        wednesday: '09:00-18:00',
                        thursday: '09:00-18:00',
                        friday: '09:00-16:00',
                    }),
                    hasSolidaritySlots: true,
                    solidarityPercentage: 30,
                    updatedAt: new Date(),
                },
            },
        },
    });

    const professional3 = await prisma.user.create({
        data: {
            id: 'prof-3',
            email: 'dr.koffi@malodoc.com',
            phone: '+22892222222',
            password: hashedPassword,
            role: 'PROFESSIONAL',
            firstName: 'Thomas',
            lastName: 'Koffi',
            isVerified: true,
            updatedAt: new Date(),
            professionalProfile: {
                create: {
                    id: 'prof-profile-3',
                    specialty: 'Généraliste',
                    licenseNumber: 'MED-TG-2020-089',
                    isVerified: true,
                    clinicName: 'Cabinet Médical Santé Plus',
                    clinicAddress: '52 Avenue de la Paix',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1345,
                    longitude: 1.2189,
                    consultationFee: 10000,
                    bio: 'Médecin généraliste dévoué. Consultations générales, suivi médical et médecine préventive.',
                    yearsOfExperience: 5,
                    languages: JSON.stringify(['Français', 'Ewe', 'Kabyè']),
                    workingHours: JSON.stringify({
                        monday: '08:00-19:00',
                        tuesday: '08:00-19:00',
                        wednesday: '08:00-19:00',
                        thursday: '08:00-19:00',
                        friday: '08:00-19:00',
                        saturday: '08:00-13:00',
                    }),
                    hasSolidaritySlots: true,
                    solidarityPercentage: 25,
                    updatedAt: new Date(),
                },
            },
        },
    });

    const professional4 = await prisma.user.create({
        data: {
            id: 'prof-4',
            email: 'dr.mensah@malodoc.com',
            phone: '+22892333333',
            password: hashedPassword,
            role: 'PROFESSIONAL',
            firstName: 'Akossiwa',
            lastName: 'Mensah',
            isVerified: true,
            updatedAt: new Date(),
            professionalProfile: {
                create: {
                    id: 'prof-profile-4',
                    specialty: 'Gynécologue',
                    licenseNumber: 'MED-TG-2017-067',
                    isVerified: true,
                    clinicName: 'Clinique de la Femme',
                    clinicAddress: '10 Rue des Fleurs',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1412,
                    longitude: 1.2267,
                    consultationFee: 18000,
                    bio: 'Gynécologue-obstétricienne. Suivi de grossesse, consultations gynécologiques et planning familial.',
                    yearsOfExperience: 12,
                    languages: JSON.stringify(['Français', 'Ewe', 'Anglais']),
                    workingHours: JSON.stringify({
                        monday: '09:00-17:00',
                        tuesday: '09:00-17:00',
                        wednesday: '09:00-17:00',
                        thursday: '09:00-17:00',
                        friday: '09:00-15:00',
                    }),
                    hasSolidaritySlots: true,
                    solidarityPercentage: 15,
                    updatedAt: new Date(),
                },
            },
        },
    });

    const professional5 = await prisma.user.create({
        data: {
            id: 'prof-5',
            email: 'dr.amegah@malodoc.com',
            phone: '+22892444444',
            password: hashedPassword,
            role: 'PROFESSIONAL',
            firstName: 'Kossi',
            lastName: 'Amegah',
            isVerified: true,
            updatedAt: new Date(),
            professionalProfile: {
                create: {
                    id: 'prof-profile-5',
                    specialty: 'Dentiste',
                    licenseNumber: 'MED-TG-2019-123',
                    isVerified: true,
                    clinicName: 'Cabinet Dentaire Sourire',
                    clinicAddress: '33 Boulevard du 13 Janvier',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1298,
                    longitude: 1.2134,
                    consultationFee: 20000,
                    bio: 'Chirurgien-dentiste. Soins dentaires, orthodontie et esthétique dentaire.',
                    yearsOfExperience: 10,
                    languages: JSON.stringify(['Français', 'Ewe']),
                    workingHours: JSON.stringify({
                        monday: '08:00-18:00',
                        tuesday: '08:00-18:00',
                        wednesday: '08:00-18:00',
                        thursday: '08:00-18:00',
                        friday: '08:00-16:00',
                        saturday: '09:00-12:00',
                    }),
                    hasSolidaritySlots: false,
                    solidarityPercentage: 0,
                    updatedAt: new Date(),
                },
            },
        },
    });

    // 3. Créer des disponibilités (créneaux)
    console.log('📅 Creating availabilities...');

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    // Créneaux pour Dr. Kouadio (Cardiologue) - avec créneaux solidaires
    const availabilities1 = [];
    const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'];

    for (let i = 0; i < times.length; i++) {
        const startTime = times[i];
        const [hours, minutes] = startTime.split(':');
        const endHours = parseInt(hours);
        const endTime = `${endHours}:${parseInt(minutes) + 30}`;

        availabilities1.push({
            id: `avail-prof1-${i + 1}`,
            professionalId: 'prof-profile-1',
            date: i < 5 ? tomorrow : dayAfter,
            startTime,
            endTime,
            isBooked: false,
            isSolidarity: i % 3 === 0, // 1 créneau sur 3 est solidaire
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    // Créneaux pour Dr. Ablavi (Pédiatre) - avec créneaux solidaires
    const availabilities2 = [];
    for (let i = 0; i < 8; i++) {
        const startTime = times[i];
        const [hours, minutes] = startTime.split(':');
        const endHours = parseInt(hours);
        const endTime = `${endHours}:${parseInt(minutes) + 30}`;

        availabilities2.push({
            id: `avail-prof2-${i + 1}`,
            professionalId: 'prof-profile-2',
            date: i < 4 ? tomorrow : dayAfter,
            startTime,
            endTime,
            isBooked: false,
            isSolidarity: i % 4 === 0, // 1 créneau sur 4 est solidaire
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    // Créneaux pour Dr. Koffi (Généraliste) - avec créneaux solidaires
    const availabilities3 = [];
    for (let i = 0; i < 10; i++) {
        const startTime = times[i];
        const [hours, minutes] = startTime.split(':');
        const endHours = parseInt(hours);
        const endTime = `${endHours}:${parseInt(minutes) + 30}`;

        availabilities3.push({
            id: `avail-prof3-${i + 1}`,
            professionalId: 'prof-profile-3',
            date: i < 5 ? tomorrow : dayAfter,
            startTime,
            endTime,
            isBooked: false,
            isSolidarity: i % 3 === 0, // 1 créneau sur 3 est solidaire
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    // Créneaux pour Dr. Mensah (Gynécologue) - avec créneaux solidaires
    const availabilities4 = [];
    for (let i = 0; i < 6; i++) {
        const startTime = times[i];
        const [hours, minutes] = startTime.split(':');
        const endHours = parseInt(hours);
        const endTime = `${endHours}:${parseInt(minutes) + 30}`;

        availabilities4.push({
            id: `avail-prof4-${i + 1}`,
            professionalId: 'prof-profile-4',
            date: i < 3 ? tomorrow : dayAfter,
            startTime,
            endTime,
            isBooked: false,
            isSolidarity: i % 5 === 0, // 1 créneau sur 5 est solidaire
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    await prisma.availability.createMany({
        data: [...availabilities1, ...availabilities2, ...availabilities3, ...availabilities4],
    });

    // 4. Créer des pharmacies
    console.log('💊 Creating pharmacies...');

    const pharmacy1 = await prisma.user.create({
        data: {
            id: 'pharmacy-1',
            email: 'pharmacie.centre@malodoc.com',
            phone: '+22893000000',
            password: hashedPassword,
            role: 'PHARMACY',
            firstName: 'Pharmacie',
            lastName: 'du Centre',
            isVerified: true,
            updatedAt: new Date(),
            pharmacyProfile: {
                create: {
                    id: 'pharmacy-profile-1',
                    pharmacyName: 'Pharmacie du Centre',
                    licenseNumber: 'PHARM-TG-2010-001',
                    isVerified: true,
                    address: '5 Place de l\'Indépendance',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1319,
                    longitude: 1.2228,
                    phone: '+22893000000',
                    openingHours: JSON.stringify({
                        monday: '08:00-20:00',
                        tuesday: '08:00-20:00',
                        wednesday: '08:00-20:00',
                        thursday: '08:00-20:00',
                        friday: '08:00-20:00',
                        saturday: '08:00-20:00',
                        sunday: '08:00-20:00',
                    }),
                    updatedAt: new Date(),
                },
            },
        },
    });

    const pharmacy2 = await prisma.user.create({
        data: {
            id: 'pharmacy-2',
            email: 'pharmacie.paix@malodoc.com',
            phone: '+22893111111',
            password: hashedPassword,
            role: 'PHARMACY',
            firstName: 'Pharmacie',
            lastName: 'de la Paix',
            isVerified: true,
            updatedAt: new Date(),
            pharmacyProfile: {
                create: {
                    id: 'pharmacy-profile-2',
                    pharmacyName: 'Pharmacie de la Paix',
                    licenseNumber: 'PHARM-TG-2015-034',
                    isVerified: true,
                    address: '78 Avenue de la Paix',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1256,
                    longitude: 1.2156,
                    phone: '+22893111111',
                    openingHours: JSON.stringify({
                        monday: '07:30-19:00',
                        tuesday: '07:30-19:00',
                        wednesday: '07:30-19:00',
                        thursday: '07:30-19:00',
                        friday: '07:30-19:00',
                        saturday: '08:00-18:00',
                        sunday: 'Fermé',
                    }),
                    updatedAt: new Date(),
                },
            },
        },
    });

    const pharmacy3 = await prisma.user.create({
        data: {
            id: 'pharmacy-3',
            email: 'pharmacie.espoir@malodoc.com',
            phone: '+22893222222',
            password: hashedPassword,
            role: 'PHARMACY',
            firstName: 'Pharmacie',
            lastName: 'Espoir',
            isVerified: true,
            updatedAt: new Date(),
            pharmacyProfile: {
                create: {
                    id: 'pharmacy-profile-3',
                    pharmacyName: 'Pharmacie Espoir',
                    licenseNumber: 'PHARM-TG-2018-067',
                    isVerified: true,
                    address: '120 Boulevard du 13 Janvier',
                    city: 'Lomé',
                    country: 'Togo',
                    latitude: 6.1389,
                    longitude: 1.2289,
                    phone: '+22893222222',
                    openingHours: JSON.stringify({
                        monday: '08:00-18:00',
                        tuesday: '08:00-18:00',
                        wednesday: '08:00-18:00',
                        thursday: '08:00-18:00',
                        friday: '08:00-18:00',
                        saturday: '09:00-13:00',
                        sunday: 'Fermé',
                    }),
                    updatedAt: new Date(),
                },
            },
        },
    });

    // 5. Créer des médicaments
    console.log('💉 Creating medicines...');

    const medicines = [
        // Pharmacie du Centre
        { id: 'med-1', pharmacyId: 'pharmacy-profile-1', name: 'Paracétamol 500mg', category: 'Antalgique', price: 500, quantity: 200, isSolidarity: true },
        { id: 'med-2', pharmacyId: 'pharmacy-profile-1', name: 'Amoxicilline 1g', category: 'Antibiotique', price: 2500, quantity: 150, isSolidarity: false },
        { id: 'med-3', pharmacyId: 'pharmacy-profile-1', name: 'Ibuprofène 400mg', category: 'Anti-inflammatoire', price: 800, quantity: 180, isSolidarity: true },
        { id: 'med-4', pharmacyId: 'pharmacy-profile-1', name: 'Vitamine C 1000mg', category: 'Complément', price: 1500, quantity: 100, isSolidarity: false },

        // Pharmacie de la Paix
        { id: 'med-5', pharmacyId: 'pharmacy-profile-2', name: 'Aspirine 500mg', category: 'Antalgique', price: 600, quantity: 220, isSolidarity: true },
        { id: 'med-6', pharmacyId: 'pharmacy-profile-2', name: 'Métronidazole 500mg', category: 'Antibiotique', price: 1800, quantity: 120, isSolidarity: false },
        { id: 'med-7', pharmacyId: 'pharmacy-profile-2', name: 'Sirop contre la toux', category: 'Antitussif', price: 2000, quantity: 80, isSolidarity: true },

        // Pharmacie Espoir
        { id: 'med-8', pharmacyId: 'pharmacy-profile-3', name: 'Doliprane 1000mg', category: 'Antalgique', price: 700, quantity: 250, isSolidarity: true },
        { id: 'med-9', pharmacyId: 'pharmacy-profile-3', name: 'Ciprofloxacine 500mg', category: 'Antibiotique', price: 3000, quantity: 90, isSolidarity: false },
        { id: 'med-10', pharmacyId: 'pharmacy-profile-3', name: 'Multivitamines', category: 'Complément', price: 2500, quantity: 110, isSolidarity: false },
    ];

    await prisma.medicine.createMany({
        data: medicines.map(med => ({
            ...med,
            status: 'AVAILABLE',
            createdAt: new Date(),
            updatedAt: new Date(),
        })),
    });

    // 6. Créer des dons
    console.log('💝 Creating donations...');

    const donations = [
        { id: 'don-1', userId: 'patient-1', amount: 10000, donorName: 'Test Utilisateur', donorEmail: 'test@malodoc.com', isAnonymous: false, paymentMethod: 'Orange Money', status: 'COMPLETED' },
        { id: 'don-2', userId: null, amount: 25000, donorName: null, donorEmail: null, isAnonymous: true, paymentMethod: 'MTN Mobile Money', status: 'COMPLETED' },
        { id: 'don-3', userId: 'patient-2', amount: 50000, donorName: 'Marie Koffi', donorEmail: 'marie.koffi@example.com', isAnonymous: false, paymentMethod: 'Carte Bancaire', status: 'COMPLETED' },
        { id: 'don-4', userId: null, amount: 5000, donorName: null, donorEmail: null, isAnonymous: true, paymentMethod: 'Orange Money', status: 'COMPLETED' },
        { id: 'don-5', userId: null, amount: 100000, donorName: 'Entreprise ABC', donorEmail: 'contact@abc.tg', isAnonymous: false, paymentMethod: 'Virement', status: 'COMPLETED' },
    ];

    await prisma.donation.createMany({
        data: donations.map(don => ({
            ...don,
            currency: 'XOF',
            usedForAppointments: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        })),
    });

    // 7. Créer quelques avis
    console.log('⭐ Creating reviews...');

    // Créer un rendez-vous passé pour pouvoir laisser un avis
    const pastAppointment = await prisma.appointment.create({
        data: {
            id: 'appt-past-1',
            patientId: 'patient-1',
            professionalId: 'prof-profile-1',
            availabilityId: 'avail-prof1-1',
            status: 'COMPLETED',
            reason: 'Consultation de routine',
            isSolidarity: false,
            isPaid: true,
            amount: 15000,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Il y a 7 jours
            updatedAt: new Date(),
        },
    });

    // Marquer la disponibilité comme réservée
    await prisma.availability.update({
        where: { id: 'avail-prof1-1' },
        data: { isBooked: true },
    });

    await prisma.review.create({
        data: {
            id: 'review-1',
            appointmentId: 'appt-past-1',
            professionalId: 'prof-profile-1',
            rating: 5,
            comment: 'Excellent médecin, très à l\'écoute et professionnel. Je recommande vivement !',
            createdAt: new Date(),
        },
    });

    console.log('✅ Seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Patients: 2`);
    console.log(`   - Professionals: 5`);
    console.log(`   - Pharmacies: 3`);
    console.log(`   - Availabilities: ${availabilities1.length + availabilities2.length + availabilities3.length + availabilities4.length}`);
    console.log(`   - Medicines: ${medicines.length}`);
    console.log(`   - Donations: ${donations.length}`);
    console.log(`   - Reviews: 1`);
    console.log('\n🔑 Test credentials:');
    console.log(`   Email: test@malodoc.com`);
    console.log(`   Password: test123456`);
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
