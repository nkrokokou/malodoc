import prisma from '../config/database.js';

// Créer un don
export const createDonation = async (req, res) => {
  try {
    const {
      amount,
      paymentMethod,
      paymentProvider,
      donorName,
      donorEmail,
      donorPhone,
      isAnonymous,
      message,
    } = req.body;

    const userId = req.user?.id || null;

    // Créer le don
    const donation = await prisma.donation.create({
      data: {
        userId,
        amount: parseFloat(amount),
        currency: 'XOF', // Franc CFA
        status: 'PENDING',
        paymentMethod,
        paymentProvider,
        donorName: isAnonymous ? 'Anonyme' : donorName,
        donorEmail: isAnonymous ? null : donorEmail,
        donorPhone: isAnonymous ? null : donorPhone,
        isAnonymous: isAnonymous || false,
        message,
      },
    });

    // Note: Ici vous intégreriez l'API de paiement (Fedapay, Kkiapay, etc.)
    // Pour l'instant, on simule un paiement réussi

    res.status(201).json({
      success: true,
      message: 'Don créé avec succès. Redirection vers le paiement...',
      data: donation,
      paymentUrl: `https://payment-provider.com/pay/${donation.id}`, // URL factice
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du don',
      error: error.message,
    });
  }
};

// Confirmer un don (webhook de paiement)
export const confirmDonation = async (req, res) => {
  try {
    const { donationId, transactionId, status } = req.body;

    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Don non trouvé',
      });
    }

    // Mettre à jour le statut du don
    const updatedDonation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: status === 'success' ? 'COMPLETED' : 'FAILED',
        transactionId,
      },
    });

    // Si le don est complété, mettre à jour les statistiques
    if (status === 'success') {
      const stats = await prisma.systemStats.findFirst();
      if (stats) {
        await prisma.systemStats.update({
          where: { id: stats.id },
          data: {
            totalDonations: {
              increment: updatedDonation.amount,
            },
            lastUpdated: new Date(),
          },
        });
      } else {
        await prisma.systemStats.create({
          data: {
            totalDonations: updatedDonation.amount,
          },
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Statut du don mis à jour',
      data: updatedDonation,
    });
  } catch (error) {
    console.error('Confirm donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la confirmation du don',
      error: error.message,
    });
  }
};

// Obtenir tous les dons
export const getDonations = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    let whereClause = {};

    if (status) {
      whereClause.status = status;
    }

    const donations = await prisma.donation.findMany({
      where: whereClause,
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        donorName: true,
        message: true,
        isAnonymous: true,
        usedForAppointments: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    // Calculer le total des dons
    const totalAmount = await prisma.donation.aggregate({
      where: { status: 'COMPLETED' },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({
      success: true,
      count: donations.length,
      totalAmount: totalAmount._sum.amount || 0,
      data: donations,
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des dons',
      error: error.message,
    });
  }
};

// Obtenir les statistiques des dons
export const getDonationStats = async (req, res) => {
  try {
    // Total des dons complétés
    const completedDonations = await prisma.donation.aggregate({
      where: { status: 'COMPLETED' },
      _sum: {
        amount: true,
        usedForAppointments: true,
      },
      _count: true,
    });

    // Nombre de rendez-vous solidaires financés
    const solidarityAppointments = await prisma.appointment.count({
      where: { isSolidarity: true },
    });

    // Dons récents
    const recentDonations = await prisma.donation.findMany({
      where: {
        status: 'COMPLETED',
        isAnonymous: false,
      },
      select: {
        id: true,
        amount: true,
        donorName: true,
        message: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Calcul du montant utilisé
    const avgAppointmentCost = 5000; // Coût moyen d'une consultation en XOF
    const amountUsed = solidarityAppointments * avgAppointmentCost;
    const totalAmount = completedDonations._sum.amount || 0;

    res.status(200).json({
      success: true,
      data: {
        totalDonations: totalAmount,
        totalDonors: completedDonations._count,
        solidarityAppointments,
        amountUsed,
        amountAvailable: Math.max(0, totalAmount - amountUsed),
        utilizationRate: totalAmount > 0 ? Math.round((amountUsed / totalAmount) * 100) : 0,
        recentDonations,
      },
    });
  } catch (error) {
    console.error('Get donation stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message,
    });
  }
};

// Obtenir les dons d'un utilisateur
export const getMyDonations = async (req, res) => {
  try {
    const userId = req.user.id;

    const donations = await prisma.donation.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalAmount = donations
      .filter(d => d.status === 'COMPLETED')
      .reduce((sum, d) => sum + d.amount, 0);

    res.status(200).json({
      success: true,
      count: donations.length,
      totalAmount,
      data: donations,
    });
  } catch (error) {
    console.error('Get my donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de vos dons',
      error: error.message,
    });
  }
};

// Obtenir un don spécifique
export const getDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Don non trouvé',
      });
    }

    // Vérifier l'accès (admin ou propriétaire du don)
    const hasAccess = 
      req.user?.role === 'ADMIN' ||
      donation.userId === userId;

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé',
      });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du don',
      error: error.message,
    });
  }
};

// Tableau d'honneur des donateurs
export const getTopDonors = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Grouper par utilisateur et calculer le total
    const donations = await prisma.donation.groupBy({
      by: ['userId', 'donorName'],
      where: {
        status: 'COMPLETED',
        isAnonymous: false,
        userId: { not: null },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
      take: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      data: donations.map((d, index) => ({
        rank: index + 1,
        donorName: d.donorName,
        totalAmount: d._sum.amount,
      })),
    });
  } catch (error) {
    console.error('Get top donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du tableau d\'honneur',
      error: error.message,
    });
  }
};

export default {
  createDonation,
  confirmDonation,
  getDonations,
  getDonationStats,
  getMyDonations,
  getDonation,
  getTopDonors,
};
