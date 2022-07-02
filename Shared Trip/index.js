const express = require('express');
const expressConfig = require('./config/express')
const databaseConfic = require('./config/database')
const routesConfic = require('./config/routes');
const userSession = require('./middleware/userSession');

start();
async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfic(app);
    routesConfic(app);

    

    app.listen(3000, () => console.log('Server is running on port 3000...'))
    app.use(userSession())
}