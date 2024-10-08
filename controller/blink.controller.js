const { sendMessage } = require("../controller/lib/botActions");
const Blink = require("../model/blink.model");
const { ACTIONS_CORS_HEADERS } = require("@solana/actions");

const getBlinkBySlug = async (req, res) => {
  const slug = req.params.slug;
  const blink = await Blink.findOne({ slug });
  if (!blink) {
    sendMessage("Bet not found");
    return res.status(404).send({ message: "Blink not found" });
  }

  return res.set(ACTIONS_CORS_HEADERS).send(blink);
};
module.exports = { getBlinkBySlug };
