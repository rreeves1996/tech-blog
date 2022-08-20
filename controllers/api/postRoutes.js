const router = require('express').Router();
const { Post } = require('../../models');
const auth = require('../../utils/auth');

router.post('/', auth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const newPost = await Post.destroy({
            where: {
              id: req.params.id,
              user_id: req.session.user_id,
            },
          });

        if (!newPost) {
            res.status(404).json('Post not found!');
        };

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;