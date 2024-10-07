const { BASE_URL } = require("./lib/axios");
const { parseCreateBetData } = require("./lib/botActions");
const { sendMessage } = require("./lib/botActions");
async function handleCreateBet(message) {
  const messageText = message.text || "";
  const parsedData = parseCreateBetData(messageText);

  //   console.log("parsedData", JSON.stringify(parsedData));
  sendMessage(message, `blink created ${JSON.stringify(parsedData)}`);
  return;
}
module.exports = { handleCreateBet };
