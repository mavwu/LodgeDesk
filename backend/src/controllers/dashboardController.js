const prisma = require('../prisma/client');

async function getDashboardStats(req, res, next) {
  try {
    const [totalRooms, totalBookings, pendingBookings, approvedBookings, recentBookings] =
      await Promise.all([
        prisma.room.count(),
        prisma.booking.count(),
        prisma.booking.count({ where: { status: 'PENDING' } }),
        prisma.booking.count({ where: { status: 'APPROVED' } }),
        prisma.booking.findMany({
          include: {
            room: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
      ]);

    const occupancyRate = totalRooms === 0 ? 0 : Math.round((approvedBookings / totalRooms) * 100);

    res.json({
      totalRooms,
      totalBookings,
      pendingBookings,
      approvedBookings,
      occupancyRate,
      recentBookings: recentBookings.map((booking) => ({
        ...booking,
        room: booking.room
          ? {
              ...booking.room,
              pricePerNight: Number(booking.room.pricePerNight),
            }
          : null,
      })),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboardStats,
};
