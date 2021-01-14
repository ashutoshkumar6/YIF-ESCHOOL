const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', async (req, res) => {
    res.render('home');
})

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.render('users/index', { users });
})

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('users/show', { user });
})

router.get('/users/:id/edit', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('users/edit', { user });
})

router.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    for (let key in req.body) {
        if (req.body[key] !== "") {
            const newValue = req.body[key];
            user[key] = newValue;
        }
    }
    await user.save()
    res.redirect(`/users/${user._id}`);
})


module.exports = router;