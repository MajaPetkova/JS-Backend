const { layout } = require("./util");

const routes = {};

const defaultPage = `
<h1>404 Not found</h1> 
<p>The resource you requested cannot be found</p>
`;

function main(req, res) {
  //   console.log(req.method, req.url);
  const url = new URL(req.url, `http://${req.headers.host}`);
  let handler;
  const actions = routes[url.pathname];
  if (actions) {
    handler = actions[req.method];
  }
  if (typeof handler == "function") {
    handler(req, res);
  } else {
    defaultController(req, res);
  }
}

function register(method, pathname, handler) {
  if (routes[pathname] == undefined) {
    routes[pathname] = {};
  }
  routes[pathname][method] = handler;
}

function get(pathname, handler) {
  register("GET", pathname, handler);
}
function post(pathname, handler) {
  register("POST", pathname, handler);
}

function defaultController(req, res) {
  res.statusCode = 404;
  res.write(layout(defaultPage));
  res.end();
}

module.exports = {
  main,
  register,
  get,
  post
};
