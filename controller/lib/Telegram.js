const { Axios } = require("./axios");
const { createBetMessage, helpMessage } = require("../../constants/messages");
const { handleCreateBet } = require("../createBet.route");
const { sendMessage } = require("./botActions");

function handleMessage(message) {
  if (!message?.text) return;
  const firstWord = message.text.split(" ")[0];

  const messageText = message.text || "";

  // return sendMessage(message, messageText);
  if (firstWord.charAt(0) === "/") {
    const command = firstWord.substring(1);
    switch (command) {
      case "start":
        return sendMessage(message, "Hello, I'm a bot!");
      case "createBet":
        handleCreateBet(message);
        break;
      case "help":
        return sendMessage(message, helpMessage);
      default:
        return sendMessage(message, "No command found.");
    }
  } else {
    return sendMessage(message, messageText);
  }
}

module.exports = { handleMessage };
