const router = require('express').Router();
const { isUser, isOwner } = require('../middleware/guards');
const { createHotel, updateHotel, deleteById , likeHotel} = require('../services/hotelService');
const mapErrors = require('../util/mapper');
const preload = require('../middleware/preload')

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Hotel Offer', data: {} })
});

router.post('/create', isUser(), async (req, res) => {
    // console.log(req.body)

    const hotel = {
        name: req.body.name,
        city: req.body.city,
        freeRooms: req.body.freeRooms,
        imgUrl: req.body.imgUrl,
        userBookedRoom: [],
        owner: req.session.user._id
    }

    try {
        await createHotel(hotel)
        res.redirect('/')
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { data: hotel, errors })
    }

});
router.get('/edit/:id', preload(), (req, res) => {
    res.render('edit', { title: 'Edit offer' })
})
router.post('/edit/:id', preload(), async (req, res) => {
    const id = req.params.id;

    const hotel = {
        name: req.body.name,
        city: req.body.city,
        freeRooms: req.body.freeRooms,
        imgUrl: req.body.imgUrl,

    }
    try {
        await updateHotel(id, hotel);
        res.redirect('/hotels/' + id);

    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        hotel._id = id
        res.render('edit', { title: 'Edit', hotel, errors })
    }
});
router.get('/delete/:id', preload(), async (req, res) => {
    await deleteById(req.params.id)
    res.redirect('/')
});

router.get('/booking/:id', isUser(), async(req, res)=>{
    const id= req.params.id;
    const userId= req.session.user._id;
    try {
        await likeHotel(id, userId)
     } catch (err) {
        console.error(err);
     } finally {
        res.redirect('/');
     }

})

module.exports = router;