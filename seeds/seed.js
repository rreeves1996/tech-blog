const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userSeed = require('./userSeed.json');
const postSeed = require('./postSeed.json');
const commentSeed = require('./commentSeed.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeed, {
        individualHooks: true,
        returning: true
    });

    await Post.bulkCreate(postSeed, {
        individualHooks: true,
    });

    await Comment.bulkCreate(commentSeed, {
        individualHooks: true,
    });

    process.exit(0);
};

seedDatabase();