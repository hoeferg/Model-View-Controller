const sequelize = require('../config/connection');
const { User } = require('../models');
const seedComment = require('./commentSeeds');
const postSeed = require('./postSeeds');

const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await seedComment();
    console.log("-----COMMENT SEEDED-----")

    await postSeed();
    console.log("-----POST SEEDED-----")

    process.exit(0);
};

seedDatabase();
