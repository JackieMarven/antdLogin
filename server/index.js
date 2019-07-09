require("dotenv").config();

const express = require("express");
const next = require("next");
const routers = require("./routers/index.js");

const { NODE_ENV, PORT } = process.env;
const dev = NODE_ENV !== "production";
const port = parseInt(PORT, 10);
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  server.use(routers(app));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`>> Ready on http://localhost:${port}`);
  });
});
