import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      },
      take: 10
    });

    console.log('\n📊 Utilisateurs dans la base de données:\n');
    
    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé dans la base de données.');
      console.log('\n💡 Vous devez créer un compte via l\'interface:');
      console.log('   - Email: test@malodoc.com');
      console.log('   - Mot de passe: test123456');
    } else {
      console.log(`✅ ${users.length} utilisateur(s) trouvé(s):\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
        console.log(`   📧 Email: ${user.email}`);
        console.log(`   📱 Téléphone: ${user.phone}`);
        console.log(`   👤 Rôle: ${user.role}`);
        console.log(`   📅 Créé le: ${user.createdAt.toLocaleDateString('fr-FR')}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
