const router = require('express').Router();
const { register, login } = require('../services/userService');
const { isGuest, isUser } = require('../middleware/guards');
const mapErrors = require('../util/mapper');



router.get('/register', isGuest(), (req, res) => {
    res.render('register')
});


router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == "") {
            throw new Error('Password is required')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match')
        }
        // return console.log(req.body)
        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;

        res.redirect('/') //TODO check redirect requirements
    } catch (err) {
        console.error(err);
        //TODO send error messages
        const errors = mapErrors(err)
        const isMale = req.body.gender == 'male';
        res.render('register', { data: { email: req.body.email, isMale }, errors })
    }

});

router.get('/login', isGuest(), (req, res) => {
    res.render('login')
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        // console.log(user)
        res.redirect('/') //TODO check redirect request
    } catch (err) {
        console.error(err)
        //TODO send error messages
        const errors = mapErrors(err)
        res.render('login', { data: { email: req.body.email }, errors })
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user
    res.redirect('/')
});
module.exports = router