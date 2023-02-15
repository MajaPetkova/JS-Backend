const Book = require("../models/Book");

async function createBook(book) {
  const result = new Book(book);
  await result.save();
  return result;
};

async function getAllBooks() {
  return Book.find({});

};
async function getBookById(id){
  return Book.findById(id).populate("owner")
}

async function updateBook(id, book){
const existing = await Book.findById(id);

existing.title= book.title;
existing.author=book.author;
existing.genre= book.genre;
existing.stars= book.stars;
existing.image= book.image;
existing.review= book.review;

await existing.save();
}

async function deleteBookById(id){
  return Book.findByIdAndDelete(id)
}
module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBookById
};
