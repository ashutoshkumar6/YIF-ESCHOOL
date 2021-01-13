const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const User = require('./models/user');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/yifEschool', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind('OH NO ERROR!'));
db.once('open', () => {
    console.log('MONGO CONNECTION OPEN');
})
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended : true }));
app.use(methodOverride('_method'));
app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      }
}));

app.use('/', userRoutes);

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { name, phone, standard, address, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ name, phone, standard, address, email, password });
    await user.save();

    req.session.user_id = user._id;
    res.redirect('/');
})


app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findAndValidate(email, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
})

app.post('/logout', (req, res) => {
    if (req.session.user_id) {
        req.session.destroy();
    }
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})
