const router = require('express').Router();
const { getAllCryptos, searchCrypto } = require('../services/cryptoService')
const preload = require('../middleware/preload')
const { isUser, isOwner } = require('../middleware/guards');

// home
router.get('/', (req, res) => {

    res.render('home', { title: 'Home Page' })
});

//catalog
router.get('/catalog', async (req, res) => {
    const crypto = await getAllCryptos();
    res.render('catalog', { title: 'All Cryptos', crypto })
});

//details
router.get('/details/:id', preload(), (req, res) => {
    const crypto = res.locals.crypto;

    if (req.session.user) {
        crypto.hasUser = true;
        crypto.isOwner = req.session.user._id == crypto.owner._id;

        if (crypto.buy.some(b => b._id == req.session.user._id)) {
            crypto.isBuyed = true;
        }
    }

    res.render('details', { title: 'Crypto Details' })
});
//search
router.get('/search',isUser(), async(req, res) => {
    // console.log(req.query.text)
    const crypto= await searchCrypto(req.query.text)
    
    console.log(crypto)
    res.render('search', { title: 'search crypto', crypto })
})


module.exports = router;