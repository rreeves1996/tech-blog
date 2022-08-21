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
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    
    res.render('login', {
      logged_in: req.session.logged_in
    });
});

router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id }
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

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { 
                    model: User,
                    atttributes: ['username', id],
                }
            ]
        });

        const post = postData.map((Post) => Post.get({ plain: true }));

        const commentData = await Comment.findAll({ where: { post_id: req.params.id }, 
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const comments = commentData.map((Comment) => Comment.get({ plain: true }));

        res.render('post', {
            post,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new-comment', auth, async (req, res) => {
    try {
        res.render('new-comment', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/new-post', auth, async (req, res) => {
    try {
        res.render('new-post', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);  
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    } else {
        try {
            res.render('login', {
                logged_in: req.session.logged_in
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
});



module.exports = router;