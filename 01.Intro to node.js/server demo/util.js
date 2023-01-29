function layout(body, title = "Hello World") {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <title>${title}</title>
  </head>
  <body>
     <nav>
       <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/catalog">Catalog</a></li>
       </ul>
     </nav>
  ${body}
  </body>
  </html>`;
}
const data = [
  {
    name: "product 1",
    color: "red",
  },
  {
    name: "product 2",
    color: "blue",
  },
  {
    name: "product 3",
    color: "green",
  },
  {
    name: "product 4",
    color: "purple",
  },
];
module.exports = {
  layout,
  data
};
