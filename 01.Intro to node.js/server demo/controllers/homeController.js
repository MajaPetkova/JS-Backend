const { layout } = require("../util");

const homePage = `<h1>Home Page</h1> 
<p>Welcome to our page</p>`;

const aboutPage = `
<h1>About Us</h1> 
<p> Contact Information</p>
`;

function homeController(req, res) {
  res.write(layout(homePage));
  res.end();
}

function aboutController(req, res) {
  res.write(layout(aboutPage));
  res.end();
}

module.exports = {
  homeController,
  aboutController,
};
