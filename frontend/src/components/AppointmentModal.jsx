import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCalendar, HiClock, HiCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { professionalsAPI, appointmentsAPI } from '../services/api';

const AppointmentModal = ({ isOpen, onClose, professional, onSuccess }) => {
    const [step, setStep] = useState(1);
    const [availabilities, setAvailabilities] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        if (isOpen && professional) {
            fetchAvailabilities();
            setStep(1);
            setSelectedDate(null);
            setSelectedSlot(null);
            setReason('');
        }
    }, [isOpen, professional]);

    const fetchAvailabilities = async () => {
        try {
            setLoading(true);
            // Fetch upcoming availabilities
            const response = await professionalsAPI.getAvailabilities(professional.id, {
                upcoming: true,
                isBooked: false
            });

            if (response.data.success) {
                setAvailabilities(processAvailabilities(response.data.data));
            }
        } catch (error) {
            console.error('Error fetching availabilities:', error);
            toast.error('Impossible de charger les disponibilités');
        } finally {
            setLoading(false);
        }
    };

    const processAvailabilities = (data) => {
        // Group by date
        const grouped = {};
        data.forEach(slot => {
            const dateStr = new Date(slot.date).toISOString().split('T')[0];
            if (!grouped[dateStr]) {
                grouped[dateStr] = {
                    dateObj: new Date(slot.date),
                    slots: []
                };
            }
            grouped[dateStr].slots.push(slot);
        });

        // Sort by date and slots by time
        return Object.values(grouped).sort((a, b) => a.dateObj - b.dateObj).map(group => ({
            ...group,
            slots: group.slots.sort((a, b) => a.startTime.localeCompare(b.startTime))
        }));
    };

    const handleBook = async () => {
        if (!selectedSlot) return;

        try {
            setBookingLoading(true);
            const response = await appointmentsAPI.create({
                availabilityId: selectedSlot.id,
                reason: reason || 'Consultation générale',
                notes: ''
            });

            if (response.data.success) {
                toast.success('Rendez-vous confirmé avec succès !');
                if (onSuccess) onSuccess();
                onClose();
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error(error.response?.data?.message || 'Erreur lors de la réservation');
        } finally {
            setBookingLoading(false);
        }
    };

    const formatDate = (dateObj) => {
        return dateObj.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-primary-600 p-6 text-white flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Prendre Rendez-vous</h2>
                            {professional && (
                                <p className="opacity-90 mt-1">
                                    Dr. {professional.user.firstName} {professional.user.lastName} - {professional.specialty}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <HiX className="text-2xl" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                            </div>
                        ) : availabilities.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p>Aucune disponibilité pour le moment.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Step 1: Date Selection */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <HiCalendar className="text-primary-600" />
                                        1. Choisissez une date
                                    </h3>
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {availabilities.map((group, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedDate(group);
                                                    setSelectedSlot(null);
                                                }}
                                                className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all text-center min-w-[100px] ${selectedDate === group
                                                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                                                        : 'border-gray-200 hover:border-primary-300'
                                                    }`}
                                            >
                                                <span className="block text-sm font-bold capitalize">
                                                    {group.dateObj.toLocaleDateString('fr-FR', { weekday: 'short' })}
                                                </span>
                                                <span className="block text-xl font-bold">
                                                    {group.dateObj.getDate()}
                                                </span>
                                                <span className="block text-xs text-gray-500 capitalize">
                                                    {group.dateObj.toLocaleDateString('fr-FR', { month: 'short' })}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 2: Slot Selection */}
                                {selectedDate && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <HiClock className="text-primary-600" />
                                            2. Choisissez une heure
                                        </h3>
                                        <div className="grid grid-cols-4 gap-3">
                                            {selectedDate.slots.map((slot) => (
                                                <button
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`py-2 px-3 rounded-md text-sm font-medium border transition-colors ${selectedSlot?.id === slot.id
                                                            ? 'bg-primary-600 text-white border-primary-600'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500 hover:text-primary-600'
                                                        }`}
                                                >
                                                    {slot.startTime}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Reason & Confirm */}
                                {selectedSlot && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-gray-50 p-4 rounded-xl border border-gray-100"
                                    >
                                        <h3 className="font-semibold text-gray-900 mb-3">Motif de la consultation</h3>
                                        <textarea
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            placeholder="Ex: Maux de tête persistants..."
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none mb-4"
                                            rows="2"
                                        />

                                        <button
                                            onClick={handleBook}
                                            disabled={bookingLoading}
                                            className="w-full py-3 bg-primary-600 text-white rounded-lg font-bold shadow-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {bookingLoading ? (
                                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <HiCheck className="text-xl" />
                                                    Confirmer le Rendez-vous
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-xs text-gray-500 mt-2">
                                            {selectedSlot.isSolidarity ? 'Consultation Solidaire (Gratuite)' : 'Paiement sur place'}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AppointmentModal;
