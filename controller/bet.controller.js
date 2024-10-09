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
  const filteredParsedData = { ...parsedData };
  delete filteredParsedData.radios;

  try {
    const blink = new Blink({
      userId: message.from.id,
      ...parsedData,
      slug: createSlug(parsedData.title),
      links: {
        actions: [
          {
            label: "Place Your Bet",
            href: `${getDomainUrl()}/api/actions/create-poll?vote={vote}&amount={amount}`,
            parameters: [
              {
                name: "vote",
                label: "Vote for:",
                type: "radio",
                options: [...parsedData.options],
              },
              {
                name: "amount",
                label: "Put in your amount in SOL",
              },
            ],
          },
        ],
      },
    });

    await blink.save();

    sendMessage(
      message,
      `
      Bet created::
      https://dial.to/?action=solana-action:${getDomainUrl()}/api/blink/${
        blink.slug
      }
      `
    );
  } catch (e) {
    console.error("Failed to save blink", e);
    return sendMessage(message, "Something went wrong!");
  }

  return;
}

async function handleListBets(message) {
  const bets = await Blink.find({});
  console.log("bets", bets);
  if (bets.length === 0) {
    sendMessage(message, "No bets exists in your account");
  }
  bets.forEach((bet) => {
    sendMessage(
      message,
      `https://dial.to/?action=solana-action:${getDomainUrl()}/api/blink/${
        bet.slug
      }`
    );
  });
  return;
}

function getDomainUrl() {
  const host = process.env.HOST || "localhost";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const port =
    process.env.NODE_ENV === "production" ? "" : `:${process.env.PORT}`;

  return `${protocol}://${host}${port}`;
}

async function handleRemoveBets(message) {
  const url = message.text.split(" ")[1];
  const slug = url?.split("/")?.slice(-1)[0];
  console.log("slug", slug, "url", url);
  await Blink.findOneAndDelete({ slug });
  return sendMessage(message, "Bet removed!");
}

async function handleRemoveAllBets(message) {
  await Blink.deleteMany({});
  return sendMessage(message, "All bets removed!");
}
function getDomainUrl() {
  const host = process.env.HOST || "localhost";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const port =
    process.env.NODE_ENV === "production" ? "" : `:${process.env.PORT}`;

  return `${protocol}://${host}${port}`;
}

module.exports = {
  handleCreateBet,
  getDomainUrl,
  handleRemoveBets,
  handleListBets,
  handleRemoveAllBets,
};
