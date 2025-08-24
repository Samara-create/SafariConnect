const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('@faker-js/faker').faker;
const User = require('./models/user'); // adjust this path if your model is located elsewhere
require('dotenv').config();

// ✅ MongoDB URI
const MONGO_URI = process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/safariconnect';

// 🎯 Predefined options
const interestsList = [
  'hiking', 'beach', 'wildlife', 'culture', 'food', 'photography',
  'camping', 'history', 'scuba diving', 'road trips', 'music festivals'
];

const destinations = [
  'Diani', 'Maasai Mara', 'Nairobi', 'Watamu', 'Naivasha',
  'Kisumu', 'Tsavo', 'Lamu', 'Malindi', 'Mount Kenya'
];

const languagesList = ['English', 'Swahili', 'French', 'German', 'Italian', 'Spanish'];

const createRandomUser = async () => {
  const rawPassword = faker.internet.password({ length: 8 });
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  const destination = faker.helpers.arrayElement(destinations);

  const startDate = faker.date.future();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + faker.number.int({ min: 2, max: 7 }));

  const travelPlans = [
    {
      destination,
      startDate,
      endDate,
      activities: faker.helpers.arrayElements(['hiking', 'beach', 'culture', 'wildlife'], 2)
    }
  ];

  return new User({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: hashedPassword,
    destination,
    travelPlans,
    interests: faker.helpers.arrayElements(interestsList, faker.number.int({ min: 3, max: 5 })),
    gender: faker.person.sexType(),
    rating: faker.number.float({ min: 3.0, max: 5.0, precision: 0.1 }),
    languages: faker.helpers.arrayElements(languagesList, 2),
    profilePicture: faker.image.avatar(), // Optional: helps UI
    createdAt: new Date()
  });
};

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🌱 Connected to MongoDB');

    await User.deleteMany({});
    console.log('🧹 Cleared existing users');

    const userPromises = [];
    for (let i = 0; i < 50; i++) {
      userPromises.push(createRandomUser());
    }

    const users = await Promise.all(userPromises);
    await User.insertMany(users);
    console.log(`✅ Seeded ${users.length} users successfully`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding users:', err);
    process.exit(1);
  }
};

seedUsers();
