const express = require("express");

module.exports = app => {
  const router = express.Router();
  const handler = app.getRequestHandler();

  router.get("/_next/*", (req, res) => {
    return handler(req, res);
  });

  router.get("/", (req, res) => {
    res.redirect("/login");
  });

  router.get("/login", (req, res, next) => {
    app.render(req, res, "/login");
  });

  router.get("/test", (req, res, next) => {
    app.render(req, res, "/test");
  });

  router.use(handler);

  return router;
};
