const { Prisma } = require('@prisma/client');
const prisma = require('../prisma/client');

function formatRoom(room) {
  return {
    ...room,
    pricePerNight: Number(room.pricePerNight),
  };
}

async function getPublicRooms(req, res, next) {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: 'asc' },
    });

    res.json(rooms.map(formatRoom));
  } catch (error) {
    next(error);
  }
}

async function getRoomBySlug(req, res, next) {
  try {
    const room = await prisma.room.findUnique({
      where: { slug: req.params.slug },
    });

    if (!room) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    res.json(formatRoom(room));
  } catch (error) {
    next(error);
  }
}

async function getAdminRooms(req, res, next) {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json(
      rooms.map((room) => ({
        ...formatRoom(room),
        bookingsCount: room._count.bookings,
      }))
    );
  } catch (error) {
    next(error);
  }
}

async function createRoom(req, res, next) {
  try {
    const {
      name,
      slug,
      type,
      pricePerNight,
      capacity,
      status,
      imageUrl,
      shortDescription,
      description,
      amenities,
    } = req.body;

    const room = await prisma.room.create({
      data: {
        name,
        slug,
        type,
        pricePerNight: new Prisma.Decimal(pricePerNight),
        capacity: Number(capacity),
        status,
        imageUrl,
        shortDescription,
        description,
        amenities: Array.isArray(amenities) ? amenities : [],
      },
    });

    res.status(201).json(formatRoom(room));
  } catch (error) {
    next(error);
  }
}

async function updateRoom(req, res, next) {
  try {
    const {
      name,
      slug,
      type,
      pricePerNight,
      capacity,
      status,
      imageUrl,
      shortDescription,
      description,
      amenities,
    } = req.body;

    const room = await prisma.room.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        slug,
        type,
        pricePerNight: new Prisma.Decimal(pricePerNight),
        capacity: Number(capacity),
        status,
        imageUrl,
        shortDescription,
        description,
        amenities: Array.isArray(amenities) ? amenities : [],
      },
    });

    res.json(formatRoom(room));
  } catch (error) {
    next(error);
  }
}

async function deleteRoom(req, res, next) {
  try {
    await prisma.room.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: 'Room deleted successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPublicRooms,
  getRoomBySlug,
  getAdminRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
