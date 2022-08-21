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

    for (var post of postSeed) {
        await Post.create({
          ...post,
        });
    };

    for (var comment of commentSeed) {
        await Comment.create({
          ...comment,
        });
    };

    process.exit(0);
};

seedDatabase();