const router = require('express').Router();
const preload = require('../middleware/preload');
const { isUser, isOwner } = require('../middleware/guards');
const { getAllPlays, likePlay } = require('../services/playService');



router.get('/', async (req, res) => {
    const plays = await getAllPlays()
    res.render('home', { title: 'Catalog', plays })
})

router.get('/details/:id', preload(true), (req, res) => {
    const play = res.locals.play;
    play.likeCounts = play.users.length;


    if (req.session.user) {
        play.hasUser = true;
        play.isOwner = req.session.user._id == play.owner._id;

        if (play.users.some(x => x._id == req.session.user._id)) {
            play.isLiked = true;
        }
    }
    res.render('details', { title: 'Play Details' })
})

router.get('/like/:id',isUser(), async (req, res) => {
    const id = req.params.id

    try {
     await likePlay(id, req.session.user._id)
    } catch (err) {
        console.error(err)
    }finally{
        res.redirect('/details/' + id)
    }
})
module.exports = router;