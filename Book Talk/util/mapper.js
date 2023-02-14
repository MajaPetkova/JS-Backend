function mapErrors(err) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name == "ValidationError") {
    return Object.values(err.errors).map((e) => ({ msg: e.message }));
  } else if (typeof err.message == "string") {
    return [{ msg: err.message }];
  } else {
    return [{ msg: "Request Error" }];
  }
}

function bookViewModel(book) {
  return {
    _id:book._id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    stars: book.stars,
    image: book.image,
    review: book.review,
    wishingList: book.wishingList,
    owner: book.owner,
  };
}
module.exports ={
  mapErrors,
  bookViewModel

} 
