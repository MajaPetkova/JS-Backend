const { layout } = require("./util");

const routes = {};

const defaultPage = `
<h1>404 Not found</h1> 
<p>The resource you requested cannot be found</p>
`;

function main(req, res) {
//   console.log(req.method, req.url);
  const url = new URL(req.url, `http://${req.headers.host}`);
  const handler = routes[url.pathname];
  if (typeof handler == "function") {
    handler(req, res);
  } else {
    defaultController(req, res)
  }
}

// function match(url) {
//   const handler = routes[url.pathname];
//   return handler;
// }
function defaultController(req, res) {
  res.statusCode = 404;
  res.write(layout(defaultPage));
  res.end();
}

module.exports = {
  main,
  routes,
};
