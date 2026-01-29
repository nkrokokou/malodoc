import prisma from '../config/database.js';
import moment from 'moment';

// Créer ou mettre à jour le profil professionnel
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      specialty,
      licenseNumber,
      clinicName,
      clinicAddress,
      city,
      country,
      latitude,
      longitude,
      consultationFee,
      bio,
      yearsOfExperience,
      languages,
      workingHours,
      hasSolidaritySlots,
      solidarityPercentage,
    } = req.body;

    // Vérifier si un profil existe déjà
    const existingProfile = await prisma.professionalProfile.findUnique({
      where: { userId },
    });

    let profile;

    if (existingProfile) {
      // Mise à jour
      profile = await prisma.professionalProfile.update({
        where: { userId },
        data: {
          specialty,
          clinicName,
          clinicAddress,
          city,
          country,
          latitude,
          longitude,
          consultationFee,
          bio,
          yearsOfExperience,
          languages,
          workingHours,
          hasSolidaritySlots,
          solidarityPercentage,
        },
      });
    } else {
      // Vérifier l'unicité du numéro de licence
      if (licenseNumber) {
        const existingLicense = await prisma.professionalProfile.findUnique({
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
      profile = await prisma.professionalProfile.create({
        data: {
          userId,
          specialty,
          licenseNumber,
          clinicName,
          clinicAddress,
          city,
          country: country || 'Togo',
          latitude,
          longitude,
          consultationFee: consultationFee || 0,
          bio,
          yearsOfExperience: yearsOfExperience || 0,
          languages: languages || ['Français'],
          workingHours,
          hasSolidaritySlots: hasSolidaritySlots || false,
          solidarityPercentage: solidarityPercentage || 0,
        },
      });

      // Mettre à jour le rôle de l'utilisateur
      await prisma.user.update({
        where: { id: userId },
        data: { role: 'PROFESSIONAL' },
      });
    }

    res.status(existingProfile ? 200 : 201).json({
      success: true,
      message: existingProfile ? 'Profil mis à jour avec succès' : 'Profil professionnel créé avec succès',
      data: profile,
    });
  } catch (error) {
    console.error('Create/Update professional profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création/mise à jour du profil',
      error: error.message,
    });
  }
};

// Rechercher des professionnels
export const searchProfessionals = async (req, res) => {
  try {
    const { 
      specialty, 
      city, 
      latitude, 
      longitude, 
      maxDistance, 
      solidarity,
      minRating,
      page = 1,
      limit = 20,
    } = req.query;

    let whereClause = {
      isVerified: true,
      user: {
        isActive: true,
      },
    };

    if (specialty) {
      whereClause.specialty = {
        contains: specialty,
        mode: 'insensitive',
      };
    }

    if (city) {
      whereClause.city = {
        contains: city,
        mode: 'insensitive',
      };
    }

    if (solidarity === 'true') {
      whereClause.hasSolidaritySlots = true;
    }

    const professionals = await prisma.professionalProfile.findMany({
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
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            appointments: true,
            reviews: true,
          },
        },
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    // Calculer la note moyenne et filtrer par distance si nécessaire
    let results = professionals.map(prof => {
      const avgRating = prof.reviews.length > 0
        ? prof.reviews.reduce((sum, r) => sum + r.rating, 0) / prof.reviews.length
        : 0;

      let distance = null;
      if (latitude && longitude) {
        // Calcul de distance simple (Haversine)
        const lat1 = parseFloat(latitude);
        const lon1 = parseFloat(longitude);
        const lat2 = prof.latitude;
        const lon2 = prof.longitude;

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
        ...prof,
        avgRating: Math.round(avgRating * 10) / 10,
        distance: distance ? Math.round(distance * 10) / 10 : null,
        reviews: undefined, // Supprimer les reviews détaillées
      };
    });

    // Filtrer par distance
    if (maxDistance && latitude && longitude) {
      results = results.filter(p => p.distance !== null && p.distance <= parseFloat(maxDistance));
    }

    // Filtrer par note minimale
    if (minRating) {
      results = results.filter(p => p.avgRating >= parseFloat(minRating));
    }

    // Trier par distance si applicable
    if (latitude && longitude) {
      results.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('Search professionals error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche de professionnels',
      error: error.message,
    });
  }
};

// Obtenir un profil professionnel
export const getProfessionalProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const professional = await prisma.professionalProfile.findUnique({
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
        reviews: {
          include: {
            appointment: {
              include: {
                patient: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            appointments: true,
            reviews: true,
          },
        },
      },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: 'Professionnel non trouvé',
      });
    }

    // Calculer la note moyenne
    const avgRating = professional.reviews.length > 0
      ? professional.reviews.reduce((sum, r) => sum + r.rating, 0) / professional.reviews.length
      : 0;

    res.status(200).json({
      success: true,
      data: {
        ...professional,
        avgRating: Math.round(avgRating * 10) / 10,
      },
    });
  } catch (error) {
    console.error('Get professional profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil',
      error: error.message,
    });
  }
};

// Créer des disponibilités (créneaux)
export const createAvailabilities = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, slots } = req.body; // slots = [{startTime, endTime, isSolidarity}]

    // Récupérer le profil professionnel
    const professional = await prisma.professionalProfile.findUnique({
      where: { userId },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: 'Profil professionnel non trouvé',
      });
    }

    // Créer les disponibilités
    const availabilities = await Promise.all(
      slots.map(slot =>
        prisma.availability.create({
          data: {
            professionalId: professional.id,
            date: new Date(date),
            startTime: slot.startTime,
            endTime: slot.endTime,
            isSolidarity: slot.isSolidarity || false,
          },
        })
      )
    );

    res.status(201).json({
      success: true,
      message: 'Disponibilités créées avec succès',
      data: availabilities,
    });
  } catch (error) {
    console.error('Create availabilities error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création des disponibilités',
      error: error.message,
    });
  }
};

// Obtenir les disponibilités d'un professionnel
export const getAvailabilities = async (req, res) => {
  try {
    const { professionalId } = req.params;
    const { startDate, endDate, solidarity } = req.query;

    let whereClause = {
      professionalId,
      isBooked: false,
    };

    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      whereClause.date = {
        gte: new Date(startDate),
      };
    }

    if (solidarity === 'true') {
      whereClause.isSolidarity = true;
    }

    const availabilities = await prisma.availability.findMany({
      where: whereClause,
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' },
      ],
    });

    // Grouper par date
    const groupedByDate = availabilities.reduce((acc, avail) => {
      const dateKey = moment(avail.date).format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(avail);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      count: availabilities.length,
      data: groupedByDate,
    });
  } catch (error) {
    console.error('Get availabilities error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des disponibilités',
      error: error.message,
    });
  }
};

// Supprimer une disponibilité
export const deleteAvailability = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const availability = await prisma.availability.findUnique({
      where: { id },
      include: {
        professional: true,
      },
    });

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: 'Disponibilité non trouvée',
      });
    }

    // Vérifier que c'est bien le professionnel
    if (availability.professional.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'avez pas le droit de supprimer cette disponibilité',
      });
    }

    // Vérifier que la disponibilité n'est pas réservée
    if (availability.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de supprimer une disponibilité réservée',
      });
    }

    await prisma.availability.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Disponibilité supprimée avec succès',
    });
  } catch (error) {
    console.error('Delete availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la disponibilité',
      error: error.message,
    });
  }
};

// Obtenir les créneaux solidaires disponibles
export const getSolidaritySlots = async (req, res) => {
  try {
    const { city, specialty } = req.query;

    let whereClause = {
      hasSolidaritySlots: true,
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

    if (specialty) {
      whereClause.specialty = {
        contains: specialty,
        mode: 'insensitive',
      };
    }

    const professionals = await prisma.professionalProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        availabilities: {
          where: {
            isSolidarity: true,
            isBooked: false,
            date: {
              gte: new Date(),
            },
          },
          orderBy: [
            { date: 'asc' },
            { startTime: 'asc' },
          ],
          take: 5,
        },
      },
    });

    // Filtrer les professionnels qui ont des créneaux disponibles
    const professionalsWithSlots = professionals.filter(
      prof => prof.availabilities.length > 0
    );

    res.status(200).json({
      success: true,
      count: professionalsWithSlots.length,
      data: professionalsWithSlots,
    });
  } catch (error) {
    console.error('Get solidarity slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des créneaux solidaires',
      error: error.message,
    });
  }
};

export default {
  createOrUpdateProfile,
  searchProfessionals,
  getProfessionalProfile,
  createAvailabilities,
  getAvailabilities,
  deleteAvailability,
  getSolidaritySlots,
};
