const { layout, data } = require("../util");

const catalogPage = `
<h1>Catalog</h1> 
<form method="POST" action="/create">
<label>Name: <input type="text" name= "name"/> </label>

<label>Color: <select name="color">
<option value="red">Red</option>
<option value="blue">Blue</option>
<option value="green">Green</option>
<option value="purple">Purple</option>
</select> </label>
<input type="submit" value="Create Item"/>
</form>
<ul> 
${data.map(i => 
    `<li>${i.name} -${i.color}</li>`
).join("\n")}
</ul>
`;

function catalogController(req, res) {
  res.write(layout(catalogPage));
  res.end();
}

module.exports = {
  catalogController,
};
