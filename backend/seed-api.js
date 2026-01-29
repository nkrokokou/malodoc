import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const testData = {
    patients: [
        {
            email: 'test@malodoc.com',
            phone: '+22890000000',
            password: 'test123456',
            firstName: 'Test',
            lastName: 'Utilisateur',
            role: 'PATIENT'
        },
        {
            email: 'marie.koffi@example.com',
            phone: '+22891111111',
            password: 'test123456',
            firstName: 'Marie',
            lastName: 'Koffi',
            role: 'PATIENT'
        }
    ],
    professionals: [
        {
            email: 'dr.kouadio@malodoc.com',
            phone: '+22892000000',
            password: 'test123456',
            firstName: 'Jean',
            lastName: 'Kouadio',
            role: 'PROFESSIONAL'
        },
        {
            email: 'dr.ablavi@malodoc.com',
            phone: '+22892111111',
            password: 'test123456',
            firstName: 'Marie',
            lastName: 'Ablavi',
            role: 'PROFESSIONAL'
        },
        {
            email: 'dr.koffi@malodoc.com',
            phone: '+22892222222',
            password: 'test123456',
            firstName: 'Thomas',
            lastName: 'Koffi',
            role: 'PROFESSIONAL'
        }
    ],
    pharmacies: [
        {
            email: 'pharmacie.centre@malodoc.com',
            phone: '+22893000000',
            password: 'test123456',
            firstName: 'Pharmacie',
            lastName: 'du Centre',
            role: 'PHARMACY'
        },
        {
            email: 'pharmacie.paix@malodoc.com',
            phone: '+22893111111',
            password: 'test123456',
            firstName: 'Pharmacie',
            lastName: 'de la Paix',
            role: 'PHARMACY'
        }
    ]
};

async function seedViaAPI() {
    console.log('🌱 Starting API-based seed...\n');

    try {
        // Test API connection
        console.log('🔍 Testing API connection...');
        const healthCheck = await axios.get(`${API_URL}/../health`);
        console.log('✅ API is running:', healthCheck.data.message);
        console.log('');

        // Create patients
        console.log('👥 Creating patients...');
        for (const patient of testData.patients) {
            try {
                const response = await axios.post(`${API_URL}/auth/register`, patient);
                console.log(`✅ Created patient: ${patient.email}`);
            } catch (error) {
                if (error.response?.data?.message?.includes('already exists')) {
                    console.log(`⚠️  Patient already exists: ${patient.email}`);
                } else {
                    console.log(`❌ Error creating ${patient.email}:`, error.response?.data?.message || error.message);
                }
            }
        }
        console.log('');

        // Create professionals
        console.log('👨‍⚕️ Creating healthcare professionals...');
        for (const professional of testData.professionals) {
            try {
                const response = await axios.post(`${API_URL}/auth/register`, professional);
                console.log(`✅ Created professional: ${professional.email}`);
            } catch (error) {
                if (error.response?.data?.message?.includes('already exists')) {
                    console.log(`⚠️  Professional already exists: ${professional.email}`);
                } else {
                    console.log(`❌ Error creating ${professional.email}:`, error.response?.data?.message || error.message);
                }
            }
        }
        console.log('');

        // Create pharmacies
        console.log('💊 Creating pharmacies...');
        for (const pharmacy of testData.pharmacies) {
            try {
                const response = await axios.post(`${API_URL}/auth/register`, pharmacy);
                console.log(`✅ Created pharmacy: ${pharmacy.email}`);
            } catch (error) {
                if (error.response?.data?.message?.includes('already exists')) {
                    console.log(`⚠️  Pharmacy already exists: ${pharmacy.email}`);
                } else {
                    console.log(`❌ Error creating ${pharmacy.email}:`, error.response?.data?.message || error.message);
                }
            }
        }
        console.log('');

        console.log('✅ Seed completed successfully!\n');
        console.log('📊 Summary:');
        console.log(`   - Patients: ${testData.patients.length}`);
        console.log(`   - Professionals: ${testData.professionals.length}`);
        console.log(`   - Pharmacies: ${testData.pharmacies.length}`);
        console.log('\n🔑 Test credentials:');
        console.log('   Email: test@malodoc.com');
        console.log('   Password: test123456');
        console.log('\n💡 Next steps:');
        console.log('   1. Login with test credentials');
        console.log('   2. Complete professional/pharmacy profiles via API');
        console.log('   3. Create availabilities and appointments');

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }
}

seedViaAPI();
