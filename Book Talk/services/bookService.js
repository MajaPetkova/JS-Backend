const Book = require("../models/Book");

async function createBook(book) {
  const result = new Book(book);
  await result.save();
  return result;
}
