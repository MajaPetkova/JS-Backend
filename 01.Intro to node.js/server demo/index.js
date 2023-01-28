const http = require("http");
const router = require("./router");
const { layout } = require("./util");

const homePage = `<h1>Home Page</h1> 
<p>Welcome to our page</p>`;

const aboutPage = `
<h1>About Us</h1> 
<p> Contact Information</p>
`;
const catalogPage = `
<h1>Catalog</h1> 
<ul> 
<li>Item 1</li>
<li>Item 2</li>
</ul>
`;

const server = http.createServer(router.main);
router.routes["/"]= homeController;
router.routes["/about"]= aboutController;
router.routes["/catalog"]= catalogController;
server.listen(3000);

function homeController(req, res) {
  res.write(layout(homePage));
  res.end();
}

function aboutController(req, res) {
  res.write(layout(aboutPage));
  res.end();
}

function catalogController(req, res) {
  res.write(layout(catalogPage));
  res.end();
}
