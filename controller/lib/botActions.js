const { Axios } = require("./axios");
// const parseCreateBetData = (data) => {
//   const lines = data.split("\n");
//   const json = {};
//   lines.forEach((line) => {
//     const [key, value] = line
//       .trim()
//       .split(":")
//       .map((s) => s.trim());
//     json[key] = value;
//   });
//   console.log("json", json);
//   return json;
// };

const parseCreateBetData = (data) => {
  const lines = data.split("\n");
  const json = {};

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || !trimmedLine.includes(":")) return;

    // Split only on the first colon
    const [key, ...valueParts] = trimmedLine.split(":");
    const value = valueParts.join(":").trim();

    if (key && value) {
      if (key.trim().toLowerCase() === "options") {
        json[key.trim()] = value.split(",").map((option) => ({
          label: option.trim(),
          value: option.trim(),
        }));
        return;
      }

      json[key.trim()] = value;
    }
  });

  return json;
};

function sendMessage(message, messageText) {
  return Axios.get("/sendMessage", {
    params: {
      chat_id: message.chat.id,
      text: messageText,
    },
  });
}

// const seperateCommand = (message) => {
//   if (message.charAt(0) === "/") {
//     const command = message.split(" ")[0];
//     return command;
//   }
//   return "";
// };
module.exports = { parseCreateBetData, sendMessage };
