const routes = {};

function register(method, path, handler) {
  if (routes[path] == undefined) {
    routes[path] = {};
  }
  routes[path][method] = handler;
}

function get(path, handler) {
  register("GET", path, handler);
}
function post(path, handler) {
  register("POST", path, handler);
}

function match(req, res) {
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

function defaultController(req, res) {
  // return 404
  res.writeHead(404);
  res.write("Not found");
  res.end();
}

module.exports = {
  get,
  post,
  match,
};
