const http = require("http");
const { catalogController } = require("./controllers/catalogController");
const { homeController, aboutController } = require("./controllers/homeController");

const router = require("./router");
const server = http.createServer(router.main);
router.register("/", homeController);
router.register("/about", aboutController);
router.register("/catalog", catalogController);
server.listen(3000);