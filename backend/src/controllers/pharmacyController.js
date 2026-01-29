import prisma from '../config/database.js';

// Créer ou mettre à jour le profil pharmacie
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      pharmacyName,
      licenseNumber,
      address,
      city,
      country,
      latitude,
      longitude,
      phone,
      openingHours,
    } = req.body;

    // Vérifier si un profil existe déjà
    const existingProfile = await prisma.pharmacyProfile.findUnique({
      where: { userId },
    });

    let profile;

    if (existingProfile) {
      // Mise à jour
      profile = await prisma.pharmacyProfile.update({
        where: { userId },
        data: {
          pharmacyName,
          address,
          city,
          country,
          latitude,
          longitude,
          phone,
          openingHours,
        },
      });
    } else {
      // Vérifier l'unicité du numéro de licence
      if (licenseNumber) {
        const existingLicense = await prisma.pharmacyProfile.findUnique({
          where: { licenseNumber },
        });

        if (existingLicense) {
          return res.status(400).json({
            success: false,
            message: 'Ce numéro de licence est déjà utilisé',
          });
        }
      }

      // Création
      profile = await prisma.pharmacyProfile.create({
        data: {
          userId,
          pharmacyName,
          licenseNumber,
          address,
          city,
          country: country || 'Togo',
          latitude,
          longitude,
          phone,
          openingHours,
        },
      });

      // Mettre à jour le rôle de l'utilisateur
      await prisma.user.update({
        where: { id: userId },
        data: { role: 'PHARMACY' },
      });
    }

    res.status(existingProfile ? 200 : 201).json({
      success: true,
      message: existingProfile ? 'Profil mis à jour avec succès' : 'Profil pharmacie créé avec succès',
      data: profile,
    });
  } catch (error) {
    console.error('Create/Update pharmacy profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création/mise à jour du profil',
      error: error.message,
    });
  }
};

// Rechercher des pharmacies
export const searchPharmacies = async (req, res) => {
  try {
    const { city, latitude, longitude, maxDistance, page = 1, limit = 20 } = req.query;

    let whereClause = {
      isVerified: true,
      user: {
        isActive: true,
      },
    };

    if (city) {
      whereClause.city = {
        contains: city,
        mode: 'insensitive',
      };
    }

    const pharmacies = await prisma.pharmacyProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        _count: {
          select: {
            medicines: true,
          },
        },
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    // Calculer les distances si coordonnées fournies
    let results = pharmacies.map(pharmacy => {
      let distance = null;
      if (latitude && longitude) {
        const lat1 = parseFloat(latitude);
        const lon1 = parseFloat(longitude);
        const lat2 = pharmacy.latitude;
        const lon2 = pharmacy.longitude;

        const R = 6371; // Rayon de la Terre en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        distance = R * c;
      }

      return {
        ...pharmacy,
        distance: distance ? Math.round(distance * 10) / 10 : null,
      };
    });

    // Filtrer par distance maximale
    if (maxDistance && latitude && longitude) {
      results = results.filter(p => p.distance !== null && p.distance <= parseFloat(maxDistance));
    }

    // Trier par distance
    if (latitude && longitude) {
      results.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('Search pharmacies error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche de pharmacies',
      error: error.message,
    });
  }
};

// Obtenir une pharmacie spécifique
export const getPharmacy = async (req, res) => {
  try {
    const { id } = req.params;

    const pharmacy = await prisma.pharmacyProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        medicines: {
          where: {
            status: 'AVAILABLE',
          },
          take: 50,
        },
      },
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: 'Pharmacie non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      data: pharmacy,
    });
  } catch (error) {
    console.error('Get pharmacy error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la pharmacie',
      error: error.message,
    });
  }
};

// Ajouter un médicament
export const addMedicine = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      genericName,
      description,
      category,
      price,
      quantity,
      isSolidarity,
    } = req.body;

    // Récupérer le profil pharmacie
    const pharmacy = await prisma.pharmacyProfile.findUnique({
      where: { userId },
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: 'Profil pharmacie non trouvé',
      });
    }

    const medicine = await prisma.medicine.create({
      data: {
        pharmacyId: pharmacy.id,
        name,
        genericName,
        description,
        category,
        price,
        quantity,
        status: quantity > 0 ? 'AVAILABLE' : 'OUT_OF_STOCK',
        isSolidarity: isSolidarity || false,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Médicament ajouté avec succès',
      data: medicine,
    });
  } catch (error) {
    console.error('Add medicine error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout du médicament',
      error: error.message,
    });
  }
};

// Mettre à jour un médicament
export const updateMedicine = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, genericName, description, category, price, quantity, isSolidarity } = req.body;

    // Vérifier que le médicament appartient à cette pharmacie
    const medicine = await prisma.medicine.findUnique({
      where: { id },
      include: {
        pharmacy: true,
      },
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Médicament non trouvé',
      });
    }

    if (medicine.pharmacy.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'avez pas le droit de modifier ce médicament',
      });
    }

    const updatedMedicine = await prisma.medicine.update({
      where: { id },
      data: {
        name,
        genericName,
        description,
        category,
        price,
        quantity,
        status: quantity > 0 ? (quantity < 10 ? 'LOW_STOCK' : 'AVAILABLE') : 'OUT_OF_STOCK',
        isSolidarity,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Médicament mis à jour avec succès',
      data: updatedMedicine,
    });
  } catch (error) {
    console.error('Update medicine error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du médicament',
      error: error.message,
    });
  }
};

// Supprimer un médicament
export const deleteMedicine = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const medicine = await prisma.medicine.findUnique({
      where: { id },
      include: {
        pharmacy: true,
      },
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Médicament non trouvé',
      });
    }

    if (medicine.pharmacy.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'avez pas le droit de supprimer ce médicament',
      });
    }

    await prisma.medicine.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Médicament supprimé avec succès',
    });
  } catch (error) {
    console.error('Delete medicine error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du médicament',
      error: error.message,
    });
  }
};

// Rechercher des médicaments
export const searchMedicines = async (req, res) => {
  try {
    const { name, category, pharmacyId, solidarity, page = 1, limit = 50 } = req.query;

    let whereClause = {
      status: {
        not: 'OUT_OF_STOCK',
      },
    };

    if (name) {
      whereClause.OR = [
        { name: { contains: name, mode: 'insensitive' } },
        { genericName: { contains: name, mode: 'insensitive' } },
      ];
    }

    if (category) {
      whereClause.category = {
        contains: category,
        mode: 'insensitive',
      };
    }

    if (pharmacyId) {
      whereClause.pharmacyId = pharmacyId;
    }

    if (solidarity === 'true') {
      whereClause.isSolidarity = true;
    }

    const medicines = await prisma.medicine.findMany({
      where: whereClause,
      include: {
        pharmacy: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      count: medicines.length,
      data: medicines,
    });
  } catch (error) {
    console.error('Search medicines error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche de médicaments',
      error: error.message,
    });
  }
};

// Obtenir les médicaments solidaires
export const getSolidarityMedicines = async (req, res) => {
  try {
    const { city, page = 1, limit = 50 } = req.query;

    let whereClause = {
      isSolidarity: true,
      status: 'AVAILABLE',
    };

    if (city) {
      whereClause.pharmacy = {
        city: {
          contains: city,
          mode: 'insensitive',
        },
      };
    }

    const medicines = await prisma.medicine.findMany({
      where: whereClause,
      include: {
        pharmacy: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      count: medicines.length,
      data: medicines,
    });
  } catch (error) {
    console.error('Get solidarity medicines error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des médicaments solidaires',
      error: error.message,
    });
  }
};

export default {
  createOrUpdateProfile,
  searchPharmacies,
  getPharmacy,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  searchMedicines,
  getSolidarityMedicines,
};
