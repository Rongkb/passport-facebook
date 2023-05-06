var express = require('express');
var app = express();
const path = require('path')
var jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
var passport = require('passport');
const session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var cors = require('cors')

require('./src/helper/connect_mongodb')
const { AcountModel } = require('./src/model/accountModel');
app.use(cors())
require('dotenv').config()
const port = process.env.PORT || 3000
app.use(cookieParser())
var bodyParser = require('body-parser');

app.use('/static', express.static(path.join(__dirname, 'src/public')))
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
})
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// passport

app.use(session({
    secret: 'mysecret',
    resave: false, // Thêm tùy chọn resave
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user); // lưu vào session, lập tức req.user có giá trị
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/', (req, res, next) => {
    res.json('chao mung den trang home')
})
app.get('/private', (req, res, next) => {
    var token = req.headers['authorization'].split(' ')[1]
    console.log('token: ', token)
    jwt.verify(token, '123', function (err, data) {
        if (err) return res.status(403).json('Invalid token')
        next()
    })
}, (req, res, next) => {
    res.json('du lieu bi mat')
})

app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, './src/view/login.html'))
})

app.get('/logiFacebook', (req, res, next) => {
    res.sendFile(path.join(__dirname, './src/view/login_facebook.html'))

})
app.get('/logout', function (req, res) {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
});

app.get('/success', async (req, res) => {
    const data = req.user
    console.log(req.isAuthenticated())
    console.log(data)
    if (req.isAuthenticated()) {
        res.json(data)
    } else {
        // console.log(req.isAuthenticated())
        res.json('ban chua dang nhap')
    }
});
app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }),
);
passport.use(new FacebookStrategy({
    clientID: '639057604940357',
    clientSecret: '7ebcd1864fa811450eca6c221cf19bf4',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['email', 'gender', 'displayName']
},
    async function (accessToken, refreshToken, profile, done) {
        console.log(profile)

        const user = await AcountModel.findOne({
            id: profile.id,

        });
        if (!user) {
            console.log('Adding new facebook user to DB..');
            const user = new AcountModel({
                id: profile.id,
                username: profile.displayName,

            });
            await user.save();
            // console.log(user);
            const token = jwt.sign({ profile }, '123')
            return done(null, profile);
        } else {
            console.log('Facebook User already exist in DB..');
            // console.log(profile);
            return done(null, profile);
        }

    }
));

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })
// passport.deserializeUser((id, done) => {
//     AcountModel.findOne({ id: id }, (err, user) => {
//         done(null, user)
//     })
// })



app.use((err, req, res, next) => {
    res.status(500).json({
        message: " thong bao loi tu server ",
        status: err
    })
})
app.listen(port, function () {
    console.log(`servering running in port: ${port}`)
})