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

function addItem(name, color) {
  const id = nextId();
  data[id] = {
    name,
    color
  }
}

function getItems(){
return Object.entries(data).map(([id, item]) => Object.assign({}, item, {id}))
}

function nextId() {
  return "xxxxxxxx".replace(/x/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  );
}

function deleteItem(id){
  delete data[id];
}
const data = {
  "4f65h7f6": {
    name: "product 1",
    color: "red",
  },
  "21d54g15": {
    name: "product 2",
    color: "blue",
  },
  "556d3g26": {
    name: "product 3",
    color: "green",
  },
  "45d3d353": {
    name: "product 4",
    color: "purple",
  },
};

module.exports = {
  layout,
  addItem,
  getItems,
  deleteItem
};
