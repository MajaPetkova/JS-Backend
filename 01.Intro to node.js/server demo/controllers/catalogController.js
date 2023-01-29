const { layout, data } = require("../util");
const { IncomingForm } = require("formidable");

const catalogPage = (data) => `
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
${data.map((i) => `<li>${i.name} -${i.color}</li>`).join("\n")}
</ul>
`;

function catalogController(req, res) {
  res.write(layout(catalogPage(data)));
  res.end();
}
function createController(req, res) {
  console.log("created request");

  const form = new IncomingForm();
  form.parse(req, (err, fields) => {
    console.log(fields);

   const item= {
    name: fields.name,
    color: fields.color
   }
 data.push(item)
    res.writeHead(301, {
      Location: "/catalog",
    });
    res.end();
  });

}
module.exports = {
  catalogController,
  createController,
};
