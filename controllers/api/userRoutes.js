const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log("hi");
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    
    console.log("asdoasdksa");

    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else (err) => {
        res.status(404).json(err).end();
    }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
        res.status(400).json({ message: 'Incorrect username or password' });
        return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        
            res.json({ user: userData, message: 'Login succesful!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;