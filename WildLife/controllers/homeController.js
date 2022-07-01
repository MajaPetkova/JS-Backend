const { getPosts, getPostById, getPostByAuthor } = require('../services/postService');
const { postViewModel } = require('../util/mapper');
const router = require('express').Router();
const { isUser } = require('../middleware/guards');

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' })
});
router.get('/catalog', async(req, res) => {
    const posts = (await getPosts()).map(postViewModel);
    res.render('catalog', { title: 'Catalog Page', posts })
});
router.get('/catalog/:id', async(req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if (req.session.user) {
        post.hasUser = true;
        if (req.session.user._id == post.author._id) {
            post.isAuthor = true;
        } else {
            post.hasVoted = post.votes.find(v => v._id == req.session.user._id) != undefined;
        }
        //TODO check votes
    }
    res.render('details', { title: post.title, post })
})
router.get('/profile', isUser(), async(req, res) => {
    const posts = (await getPostByAuthor(req.session.user._id)).map(postViewModel);
    res.render('profile', { title: 'My Posts', posts })

})
module.exports = router;