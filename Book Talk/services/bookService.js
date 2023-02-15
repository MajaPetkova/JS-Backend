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

async function getMyBooks(userId){
return Book.find({owner: userId}).populate("owner")
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
async function wishBook(bookId, userId){
const book= await Book.findById(bookId);
 if(book.wishingList.includes(userId)){
  throw new Error("User has already wished to read this book")
 }
 book.wishingList.push(userId);
   await book.save()
}
module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  getMyBooks,
  updateBook,
  deleteBookById,
  wishBook
};
