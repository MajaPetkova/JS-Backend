const router = require('express').Router();
const { isUser, isGuest } = require('../middleware/guards');
const { register, login } = require('../services/userService');
const  mapErrors  = require('../util/mapper');


router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' })
});

// TODO check form action, method, field names
router.post('/register', isGuest(), async(req, res) => {
    // return console.log(req.body)
    try {
        if (req.body.password.trim().length <3) {
            throw new Error('Password is required')
        } else if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match')
        }
        // console.log(req.body)
        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/') //TODO check redirect requirements
    } catch (err) {
        console.error(err);
        //TODO send error messages
        const errors = mapErrors(err);
        // const data = {
        //     username: req.body.username

        // }
        res.render('register', {data:{username:req.body.username}, errors})
        // res.render('register',{ title: 'Register Page', errors, data })
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' })
});

router.post('/login', isGuest(), async(req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/') //TODO check redirect request
    } catch (err) {
        console.error(err)
            //TODO send error messages
        const errors = mapErrors(err)
        res.render('login', { title: 'Login Page', data: { username: req.body.username },errors})
    }
});

router.get('/logout', isUser(), ((req, res) => {
    delete req.session.user
    res.redirect('/')
}));
module.exports = router;