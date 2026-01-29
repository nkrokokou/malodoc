import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting simplified seed...');

    // Hash password
    const hashedPassword = await bcrypt.hash('test123456', 10);

    try {
        // 1. Créer un utilisateur patient de test
        console.log('👥 Creating test patient...');
        const patient = await prisma.user.upsert({
            where: { email: 'test@malodoc.com' },
            update: {},
            create: {
                id: 'patient-test-1',
                email: 'test@malodoc.com',
                phone: '+22890000000',
                password: hashedPassword,
                role: 'PATIENT',
                firstName: 'Test',
                lastName: 'Utilisateur',
                isVerified: true,
                updatedAt: new Date(),
            },
        });

        console.log('✅ Patient created:', patient.email);

        // 2. Créer un professionnel de santé
        console.log('👨‍⚕️ Creating test professional...');
        const professional = await prisma.user.upsert({
            where: { email: 'dr.kouadio@malodoc.com' },
            update: {},
            create: {
                id: 'prof-test-1',
                email: 'dr.kouadio@malodoc.com',
                phone: '+22892000000',
                password: hashedPassword,
                role: 'PROFESSIONAL',
                firstName: 'Jean',
                lastName: 'Kouadio',
                isVerified: true,
                updatedAt: new Date(),
            },
        });

        console.log('✅ Professional created:', professional.email);

        console.log('\n✅ Seed completed successfully!');
        console.log('\n🔑 Test credentials:');
        console.log(`   Email: test@malodoc.com`);
        console.log(`   Password: test123456`);
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
