const { layout } = require("../util");

const catalogPage = `
<h1>Catalog</h1> 
<ul> 
<li>Item 1</li>
<li>Item 2</li>
</ul>
`;

function catalogController(req, res) {
  res.write(layout(catalogPage));
  res.end();
}

module.exports = {
  catalogController,
};
