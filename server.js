const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const Trees = require('./models/firtree');

mongoose.connect('mongodb://asdf:asdf123@ds125502.mlab.com:25502/kambgram', {
    useNewUrlParser: true
},  (err) => {
    if(err) return console.log(err);
    console.log('__[ Connected MongoDB ]__');
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use('/assets/', express.static(path.resolve(__dirname, 'public')));
app.use('/modules/', express.static(path.resolve(__dirname, 'node_modules')));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'Mirsaid'
}));

app.get('/', async(req, res) => {
    const trees = await Trees.find({});
    res.render('index', {trees, error: null});
});

app.use('/', require('./routes/admin'));

app.listen(process.env.PORT || 5000, () => {
    console.log('__[ Server Started ]__');
});