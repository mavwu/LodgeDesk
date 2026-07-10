require('dotenv').config();
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');
const { PrismaClient, RoomStatus } = require('@prisma/client');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const rooms = [
  {
    name: 'Garden Standard',
    slug: 'garden-standard',
    type: 'Standard',
    pricePerNight: 520,
    capacity: 2,
    status: RoomStatus.AVAILABLE,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Affordable comfort with a garden-facing window.',
    description:
      'A calm room for solo travellers or couples, with a queen bed, fan, writing desk, and easy access to the courtyard.',
    amenities: ['Wi-Fi', 'Queen bed', 'Desk', 'Garden view'],
  },
  {
    name: 'Lakeview Deluxe',
    slug: 'lakeview-deluxe',
    type: 'Deluxe',
    pricePerNight: 880,
    capacity: 2,
    status: RoomStatus.AVAILABLE,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'A brighter room with balcony seating and extra space.',
    description:
      'Ideal for weekend stays, this deluxe room includes a balcony, modern shower, lounge chair, and a mini-fridge.',
    amenities: ['Wi-Fi', 'Balcony', 'Mini-fridge', 'Hot shower'],
  },
  {
    name: 'Family Courtyard Suite',
    slug: 'family-courtyard-suite',
    type: 'Family',
    pricePerNight: 1350,
    capacity: 4,
    status: RoomStatus.AVAILABLE,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Spacious family suite with two sleeping areas.',
    description:
      'A practical suite for families or small groups with extra floor space, two sleeping zones, and close access to the dining area.',
    amenities: ['Wi-Fi', '2 sleeping areas', 'Dining access', 'Family seating'],
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@lodgedesk.demo';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Demo Admin',
      passwordHash,
    },
    create: {
      name: 'Demo Admin',
      email: adminEmail,
      passwordHash,
    },
  });

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { slug: room.slug },
      update: room,
      create: room,
    });
  }

  console.log('Seed completed successfully.');
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
