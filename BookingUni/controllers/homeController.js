const router = require('express').Router();
const { getAllHotels, getHotelById } = require('../services/hotelService');
// const preload= require('../middleware/preload')
const preload = require('../middleware/preload');
const { isUser } = require ('../middleware/guards')

router.get('/', async (req, res) => {
  // console.log(req.session)
  const hotels = await getAllHotels();
  hotels.sort((a,b)=>(b.freeRooms-a.freeRooms))
  res.render('home', { title: 'Home Page', hotels })
})


router.get('/hotels/:id', preload(true), async (req, res) => {
  const hotel = res.locals.hotel;
  // hotel.bookedHotel= hotel.user.map(b=>b.name).join(', ');

  if (req.session.user) {
    hotel.hasUser = true;
    hotel.isOwner = req.session.user._id == hotel.owner._id;

    if (hotel.userBookedRoom.some(x => x._id == req.session.user._id)) {
      hotel.isLiked = true;
    }

  }
  res.render('details', { title: 'Details Page' })
});


router.get('/profile', isUser(), async (req, res)=>{
const hotels=await getAllHotels()
  res.render('profile', {titile: 'Profile Page'})
})



module.exports = router;