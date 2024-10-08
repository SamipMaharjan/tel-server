const mainRouter = require("express").Router();

const { blinkRouter } = require("./blink.routes");

mainRouter.use(blinkRouter);

module.exports = { mainRouter };
