const mongoose = require('mongoose');
const faker = require('@faker-js/faker').faker;
const User = require('./models/user');   // Adjust path if needed
const Match = require('./models/match'); // Adjust path if needed
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/safariConnect';

const seedMatches = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    console.log('🔁 Seeding matches...');
    await Match.deleteMany({});
    console.log('🧹 Existing matches cleared');

    const users = await User.find();
    const userCount = users.length;

    if (userCount < 2) {
      throw new Error('Not enough users to create matches');
    }

    const matches = [];

    for (let i = 0; i < 30; i++) {
      let user1, user2;

      do {
        user1 = users[Math.floor(Math.random() * userCount)];
        user2 = users[Math.floor(Math.random() * userCount)];
      } while (user1._id.equals(user2._id));

      const destination = user1.destination || user2.destination || faker.location.city();
      const date = faker.date.future();
      const compatibilityScore = faker.number.int({ min: 60, max: 100 });

      matches.push(
        new Match({
          user1: user1._id,
          user2: user2._id,
          destination,
          date,
          compatibilityScore,
        })
      );
    }

    await Match.insertMany(matches);
    console.log(`✅ Successfully seeded ${matches.length} matches`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedMatches();
