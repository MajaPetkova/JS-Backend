const router = require('express').Router();
const { isUser, isOwner } = require('../middleware/guards');
const { createCrypto, updateCrypto, deleteById, buyCripto } = require('../services/cryptoService');
const mapErrors = require('../util/mapper');
const preload = require('../middleware/preload')

//-------create
router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' })
});

router.post('/create', isUser(), async (req, res) => {
    const crypto = {
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price),
        description: req.body.description,
        payment: req.body.payment,
        owner: req.session.user._id
    }
    // console.log(req.body)
    try {
        await createCrypto(crypto);
        res.redirect('/')
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Crypto', data: crypto, errors })
    }

});
//---------edit
router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Crypto' })
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const crypto = {
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price),
        description: req.body.description,
        payment: req.body.payment,

    };
    try {
        await updateCrypto(id, crypto);
        res.redirect('/details/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        crypto._id = id;
        res.render('edit', { title: 'Create', crypto, errors })
    }

});

//------------delete
router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/');
});

//------- buy
router.get('/buy/:id',  isUser(), async (req, res) => {
    const id = req.params.id;
    const userId= req.session.user?._id;
    try {
        await buyCripto(id, userId);
    } catch (err) {
        console.error(err);
        // const errors = mapErrors(err);
    } finally {
        res.redirect('/catalog/'+ id)
    }
})
module.exports = router;