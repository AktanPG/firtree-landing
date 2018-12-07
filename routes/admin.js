const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const fs = require('fs');

const Trees = require('../models/firtree');
const Offers = require('../models/offer');
const validate = require('./validate');
const Massages = require('../models/massage');

router.get('/admin', async(req, res) => {
    const queries = req.query;
    
    if(queries.name === 'mirsaid' && queries.password === 'admintaw') {
        const firtrees = await Trees.find({});
        const massages = await Massages.find({});
        const offers = await Offers.find({});

        res.render('admin', {trees: firtrees, massages, offers});
    } else {
        res.redirect('/');
    }
});

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage});

cloudinary.config({
    cloud_name: 'grami',
    api_key: '966272348285316',
    api_secret: 'gqvP_uCAQXVYf79PwcwXGrdr5yk'
});

router.post('/admin/create', upload.single('avatar'), async(req, res) => {

    try {
        cloudinary.v2.uploader.upload(req.file.path, async(err, result) => {
            if(err) return console.log(error);
    
            try {
                fs.unlinkSync(req.file.path);
    
                const newTree = await new Trees({
                    title: req.body.title,
                    prices: JSON.parse(req.body.prices),
                    image: result.url
                }).save()
                
                res.json({created: true});
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/admin/remove', async(req, res) => {
    const removed = await Trees.findByIdAndDelete(req.body.id);
    res.json({removed: true});
});

router.post('/offer/create', async(req, res) => {
    console.log(req.body);
    if(req.body.name.length > 4) {
        if(req.body.phone.length > 5) {
            const offer = new Offers({
                treeName: req.body.orderBody[0],
                height: req.body.orderBody[1],
                name: req.body.name,
                phone: req.body.phone
            }).save();

            res.json({created: true});
        } else {
            res.json({
                created: false,
                massage: 'Телефон должен состоять более чем из 5 символов'
            });
        }
    } else {
        res.json({
            created: false,
            massage: 'Имя должно состоять более чем из 6 символов'
        });
    }
});

router.post('/massage', async(req, res) => {
    const trees = await Trees.find({});

    if(validate.checkEmail(req.body.email)) {
        if(req.body.name.length > 3) {
            if(req.body.text.length > 0) {
                const mewMassage = await new Massages({
                    name: req.body.name,
                    email: req.body.email,
                    text: req.body.text
                }).save();

                res.render('index', {trees, error: 'Cообщение отправленно'});

            } else {
                res.render('index', {trees, error: 'Вы не написали ашо сообщение'});
            }
        } else {
            res.render('index', {trees, error: 'Подозрительно короткое имя'});
        }
    } else {
        res.render('index', {trees, error: 'Некоректная почта'});
    }
});

module.exports = router;