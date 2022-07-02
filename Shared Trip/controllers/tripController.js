const router = require('express').Router();
const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createTrip, updateTrip, deleteTrip, joinTrip } = require('../services/tripService');
const mapErrors = require('../util/mapper')

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Trip Offer', data: {} })
})

router.post('/create', isUser(), async (req, res) => {
    // console.log(req.body);
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.session.user._id
    }
    try {
        await createTrip(trip)
        res.redirect('/trips')
    } catch (err) {
        console.error(err)
        //TODO send error messages
        const errors = mapErrors(err)
        res.render('create', { title: 'Create Trip Offer', data: trip, errors })
    }

});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Offer' })
});
router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        // owner: req.session.user._id
    }
    try {
        await updateTrip(id, trip);
        res.redirect('/trips/' + id)
    } catch (err) {
        console.error(err)
        //TODO send error messages
        const errors = mapErrors(err)
        trip._id = id
        res.render('edit', { title: 'Create Trip Offer', trip, errors })

    }
    // console.log(req.body)
})

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteTrip(req.params.id)
    res.redirect('/trips')
})
router.get('/join/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await joinTrip(id, req.session.user._id);
    } catch (err) {
        console.error(err)
    }finally{
        res.redirect('/trips/' + id)
    }
})
module.exports = router;