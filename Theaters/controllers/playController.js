const router = require('express').Router();
const { createPlay, updatePlay, deletePlay } = require('../services/playService');
const mapErrors = require('../util/mapper');
const preload = require('../middleware/preload')
const { isUser, isGuest, isOwner } = require('../middleware/guards');




router.get('/create', isUser(), (req, res) => {
   res.render('create', { title: 'Create Play', data: {} })
});
router.post('/create', isUser(), async (req, res) => {
   const play = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      isPublic: Boolean(req.body.isPublic),
      owner: req.session.user._id
   }
   try {
      await createPlay(play);
      res.redirect('/')

   } catch (err) {
      console.error(err)
      const errors = mapErrors(err);
      res.render('create', { data: play, errors })
   }
   console.log(req.body)
});

router.get('/edit/:id', preload(), (req, res) => {
   res.render('edit', { title: 'Edit Play' })
})
router.post('/edit/:id', preload(), async(req, res) => {
   const id = req.params.id;

   const play = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      isPublic: Boolean(req.body.isPublic)
   }
   try {
      await updatePlay(id, play);
         res.redirect('/')
      

   } catch (err) {
      console.error(err);
      const errors = mapErrors(err);
      play._id = id;
      res.render('edit', { title: 'Edit Play', play, errors })
   }
})

router.get('/delete/:id', preload(), async(req,res)=>{
   await deletePlay(req.params.id)
   res.redirect('/')
})


module.exports = router;