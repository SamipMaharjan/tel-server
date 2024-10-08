const blinkRouter = require("express").Router();
const { getBlinkBySlug } = require("../controller/blink.controller");

blinkRouter.get("/blink/:slug", getBlinkBySlug);

module.exports = { blinkRouter };
