const prisma = require('../prisma/client');

function formatBooking(booking) {
  return {
    ...booking,
    room: booking.room
      ? {
          ...booking.room,
          pricePerNight: Number(booking.room.pricePerNight),
        }
      : undefined,
  };
}

async function createBooking(req, res, next) {
  try {
    const {
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      guestsCount,
      specialRequest,
      roomId,
    } = req.body;

    const room = await prisma.room.findUnique({
      where: { id: Number(roomId) },
    });

    if (!room) {
      return res.status(404).json({ message: 'Selected room does not exist.' });
    }

    const booking = await prisma.booking.create({
      data: {
        guestName,
        guestEmail,
        guestPhone,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        guestsCount: Number(guestsCount),
        specialRequest,
        roomId: Number(roomId),
      },
      include: {
        room: true,
      },
    });

    res.status(201).json(formatBooking(booking));
  } catch (error) {
    next(error);
  }
}

async function getAdminBookings(req, res, next) {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        room: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(bookings.map(formatBooking));
  } catch (error) {
    next(error);
  }
}

async function updateBookingStatus(req, res, next) {
  try {
    const booking = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: {
        status: req.body.status,
      },
      include: {
        room: true,
      },
    });

    res.json(formatBooking(booking));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBooking,
  getAdminBookings,
  updateBookingStatus,
};
