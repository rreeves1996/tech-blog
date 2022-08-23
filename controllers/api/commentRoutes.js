const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/auth');

router.post('/', auth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const newComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!newComment) {
            res.status(404).json('Comment not found!')
        };

        res.status(200).json('Comment successfully deleted!')
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;