const router = require('express').Router();
const { getAllTrips, getTripsByUSer } = require('../services/tripService');
const preload = require('../middleware/preload');
const { isUser } = require('../middleware/guards');


router.get('/', (req, res) => {
    // console.log(req.session)
    res.render('home')
})

router.get('/trips', async (req, res) => {
    const trips = await getAllTrips()
    res.render('catalog', { title: 'Shered Trip', trips })
})

router.get('/trips/:id', preload(true), (req, res) => {
    //    console.log(res.locals.trip)
    res.locals.trip.remainingSeats = res.locals.trip.seats - res.locals.trip.buddies.length;
    res.locals.trip.buddiesList = res.locals.trip.buddies.map(b => b.email).join(', ')
    if (req.session.user) {
        res.locals.trip.hasUser = true;
        res.locals.trip.isOwner = req.session.user._id == res.locals.trip.owner._id;

        if (res.locals.trip.buddies.some(b => b._id == req.session.user._id)) {
            res.locals.trip.isJoined = true
        }
    }

    res.render('details', { title: 'Trip details' })
})
router.get('/profile', isUser(), async(req,res)=>{
    const tripsByUser= await getTripsByUSer(res.locals.user._id);
    res.locals.user.tripCount= tripsByUser.length;
    res.locals.user.trips= tripsByUser
    res.render('profile', { title: 'Profile Page' })
})
module.exports = router;