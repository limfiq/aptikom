/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    // ensure all defined models have corresponding tables
    try {
        const { sequelize } = require('./models');
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully');
    } catch (syncErr) {
        console.error('Error synchronizing database:', syncErr);
        // decide whether to exit or continue; we'll continue so the server still starts
    }

    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
