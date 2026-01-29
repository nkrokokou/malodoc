import prisma from '../config/database.js';
import moment from 'moment';

// Créer un rendez-vous
export const createAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { availabilityId, reason, notes } = req.body;

    // Vérifier la disponibilité
    const availability = await prisma.availability.findUnique({
      where: { id: availabilityId },
      include: {
        professional: {
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
    });

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: 'Créneau non trouvé',
      });
    }

    if (availability.isBooked) {
      return res.status(400).json({
        success: false,
        message: 'Ce créneau est déjà réservé',
      });
    }

    // Vérifier si la date n'est pas passée
    const appointmentDateTime = moment(`${availability.date.toISOString().split('T')[0]} ${availability.startTime}`, 'YYYY-MM-DD HH:mm');
    if (appointmentDateTime.isBefore(moment())) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de réserver un créneau passé',
      });
    }

    // Créer le rendez-vous
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        professionalId: availability.professionalId,
        availabilityId,
        reason,
        notes,
        isSolidarity: availability.isSolidarity,
        amount: availability.isSolidarity ? 0 : availability.professional.consultationFee,
        status: 'CONFIRMED',
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        professional: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        availability: true,
      },
    });

    // Marquer la disponibilité comme réservée
    await prisma.availability.update({
      where: { id: availabilityId },
      data: { isBooked: true },
    });

    // Créer une notification pour le professionnel
    await prisma.notification.create({
      data: {
        userId: availability.professional.userId,
        type: 'appointment_confirmed',
        title: 'Nouveau rendez-vous',
        message: `${req.user.firstName} ${req.user.lastName} a pris rendez-vous avec vous`,
        relatedId: appointment.id,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Rendez-vous créé avec succès',
      data: appointment,
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du rendez-vous',
      error: error.message,
    });
  }
};

// Obtenir les rendez-vous de l'utilisateur
export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, upcoming } = req.query;

    let whereClause = {};

    if (req.user.role === 'PATIENT') {
      whereClause.patientId = userId;
    } else if (req.user.role === 'PROFESSIONAL') {
      const professional = await prisma.professionalProfile.findUnique({
        where: { userId },
      });
      whereClause.professionalId = professional.id;
    }

    if (status) {
      whereClause.status = status;
    }

    if (upcoming === 'true') {
      const now = new Date();
      whereClause.availability = {
        date: {
          gte: now,
        },
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        professional: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        availability: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des rendez-vous',
      error: error.message,
    });
  }
};

// Obtenir un rendez-vous spécifique
export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            patientProfile: true,
          },
        },
        professional: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        availability: true,
        prescription: true,
        review: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Rendez-vous non trouvé',
      });
    }

    // Vérifier que l'utilisateur a le droit d'accéder à ce rendez-vous
    const hasAccess = 
      appointment.patientId === userId ||
      appointment.professional.userId === userId ||
      req.user.role === 'ADMIN';

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du rendez-vous',
      error: error.message,
    });
  }
};

// Annuler un rendez-vous
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        availability: true,
        professional: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Rendez-vous non trouvé',
      });
    }

    // Vérifier que l'utilisateur a le droit d'annuler
    const canCancel = 
      appointment.patientId === userId ||
      appointment.professional.userId === userId ||
      req.user.role === 'ADMIN';

    if (!canCancel) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'avez pas le droit d\'annuler ce rendez-vous',
      });
    }

    // Vérifier que le rendez-vous peut être annulé
    if (appointment.status === 'CANCELLED' || appointment.status === 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: 'Ce rendez-vous ne peut pas être annulé',
      });
    }

    // Annuler le rendez-vous
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    // Libérer la disponibilité
    await prisma.availability.update({
      where: { id: appointment.availabilityId },
      data: { isBooked: false },
    });

    // Créer une notification
    const notificationUserId = appointment.patientId === userId 
      ? appointment.professional.userId 
      : appointment.patientId;

    await prisma.notification.create({
      data: {
        userId: notificationUserId,
        type: 'appointment_cancelled',
        title: 'Rendez-vous annulé',
        message: 'Un rendez-vous a été annulé',
        relatedId: id,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Rendez-vous annulé avec succès',
      data: updatedAppointment,
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'annulation du rendez-vous',
      error: error.message,
    });
  }
};

// Marquer un rendez-vous comme complété (professionnel uniquement)
export const completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        professional: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Rendez-vous non trouvé',
      });
    }

    // Vérifier que c'est bien le professionnel
    if (appointment.professional.userId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Seul le professionnel peut marquer le rendez-vous comme complété',
      });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });

    res.status(200).json({
      success: true,
      message: 'Rendez-vous marqué comme complété',
      data: updatedAppointment,
    });
  } catch (error) {
    console.error('Complete appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la complétion du rendez-vous',
      error: error.message,
    });
  }
};

export default {
  createAppointment,
  getMyAppointments,
  getAppointment,
  cancelAppointment,
  completeAppointment,
};
