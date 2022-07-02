const Play = require('../models/Play');
const { hash, compare } = require('bcrypt');


async function getPlayById(id) {
    return Play.findById(id).populate('owner').lean();
}

async function getAllPlays() {
    return Play.find({}).lean();
}

async function createPlay(play) {
    const result = new Play(play);
    await result.save()
}


async function getPlayAndUsers(id) {
    return Play.findById(id).populate('owner').populate('users').lean();
}
async function updatePlay(id, play) {
    const existing = await Play.findById(id);

    existing.title = play.title;
    existing.description = play.description;
    existing.imageUrl = play.imageUrl;
    existing.isPublic = play.isPublic;

    await existing.save();
}

async function deletePlay(id) {
    await Play.findByIdAndDelete(id)
}

async function likePlay(playId, userId) {
    const play = await Play.findById(playId);
    if (play.users.includes(userId)) {
        throw new Error('You have already liked the play')
    }

    play.users.push(userId);
    await play.save();
}
module.exports = {
    getPlayById,
    getAllPlays,
    createPlay,
    getPlayAndUsers,
    updatePlay,
    deletePlay,
    likePlay
}