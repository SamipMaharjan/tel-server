const { BASE_URL } = require("./lib/axios");
const { parseCreateBetData } = require("./lib/botActions");
const { sendMessage } = require("./lib/botActions");
const User = require("../model/user.model");
const Blink = require("../model/blink.model");
const { createSlug } = require("./lib/utils");
async function handleCreateBet(message) {
  const messageText = message.text || "";
  const parsedData = parseCreateBetData(messageText);

  const blinkExists = await Blink.findOne({ title: parsedData.title });

  if (blinkExists) {
    console.log("blinkExists", blinkExists);
    return sendMessage(message, "A bet with the same title already exists.");
  }

  try {
    const blink = new Blink({
      userId: message.from.id,
      ...parsedData,
      slug: createSlug(parsedData.title),
    });

    await blink.save();

    sendMessage(message, `Blink created ${JSON.stringify(blink)}`);
  } catch (e) {
    console.error("Failed to save blink", e);
    return sendMessage(message, "Something went wrong!");
  }

  return;
}
module.exports = { handleCreateBet };
