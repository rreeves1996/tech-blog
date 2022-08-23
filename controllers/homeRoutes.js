const router = require('express').Router();
const { User, Comment, Post} = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
              {
                model: User,
                attributes: ['username'],
              },
              {
                model: Comment,
                attributes: ['id','user_id','post_id','creation_date']
              }
            ],
          });

        const posts = postData.map((Post) => Post.get({ plain: true }));

        res.render('homepage', {
            logged_in: req.session.logged_in,
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('login', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);  
    }
});

router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    
    res.render('register', {});
});

router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                }
            ]
          });

        const posts = postData.map((Post) => Post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
              id: req.params.id,
            },
            include: [
                { 
                    model: User,
                    atttributes: ['username', 'id'],
                }
            ]
        });

        const posts = postData.map((Post) => Post.get({ plain: true }));

        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                },
            ]
        });
      
        const comments = commentData.map((Comment) => Comment.get({ plain: true }));

        res.render('post', {
            posts,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/edit-post/:id', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'id'],
                },
            ]
        });

        const posts = postData.map((Post) => Post.get({ plain: true }));

        res.render('editpost', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/update-post/:id', async (req, res) => {
    try {
        const editedPost = await Post.findOne({
            where: {
                id: req.params.id
            }
        });

        const postData = editedPost.update({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
  });

module.exports = router;