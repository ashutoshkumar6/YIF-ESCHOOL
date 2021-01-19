const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

const User = require('./models/user');
const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/payment');
const courseRoutes=require('./routes/courses')

const app = express();

mongoose.connect('mongodb://localhost:27017/eschool', {
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
app.use(function (req, res, next) {
    res.locals.session_id = req.session.user_id;
    res.locals.genders = ["Male", "Female", "Other"],
    res.locals.standards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    next();
})
  
app.use('/', userRoutes);
app.use('/razorpay', paymentRoutes);
app.use('/courses',courseRoutes);
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { fname, lname, mobileNo, email, password1 } = req.body;
    console.log(req.body);
    const hash = await bcrypt.hash(password1, 12);
    const user = new User({ firstName: fname, lastName: lname, mobileNo: mobileNo, email: email, password: password1 });
    await user.save();

    req.session.user_id = user._id;
    res.redirect('/');
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findAndValidate(email, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/');
    } else {
        res.redirect('/register');
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
