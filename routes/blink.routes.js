const blinkRouter = require("express").Router();
const { getBlinkBySlug } = require("../controller/blink.controller");
const {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} = require("@solana/actions");
const {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} = require("@solana/web3.js");
// const {
//   createCloseAccountInstruction,
//   TOKEN_PROGRAM_ID,
// } = require("@solana/spl-token");

blinkRouter.get("/blink/:slug", getBlinkBySlug);

// blinkRouter.post("/actions/create-poll", async (req, res) => {
//   //   console.log("req", req.body);
//   const postRequest = await request.json();
//   const userPubkey = postRequest.account;
//   console.log(userPubkey);

//   const url = new URL(request.url);
//   const action = url.searchParams.get("vote");
//   const amount = url.searchParams.get("amount");

//   // console.log('performing action ' + action);
//   const user = new PublicKey(userPubkey);

//   const connection = new Connection(clusterApiUrl("devnet"));
//   const tx = new Transaction();
//   tx.feePayer = user;
//   const accountInfo = await connection.getAccountInfo(user);
//   const balance = accountInfo.lamports;
//   if (balance < parseInt(amount)) {
//     return res.status(400).send({ message: "Insufficient balance" });
//   }

//   tx.add(
//     SystemProgram.transfer({
//       fromPubkey: user,
//       toPubkey: new PublicKey("H5KxECK5ukwyVjRymdiHCyGK6UxBxNNX38hsHcMat7qJ"),
//       lamports: parseInt(amount),
//     })
//   );

//   const bh = (await connection.getLatestBlockhash({ commitment: "finalized" }))
//     .blockhash;

//   const ix = SystemProgram.transfer({
//     fromPubkey: user,
//     toPubkey: new PublicKey(userPubkey),
//     lamports: 1,
//   });
//   // if (action === 'another') {
//   // tx.add(ix);mitn nft compress gk crl`
//   // }
//   console.log("using blockhash" + bh);

//   // tx.recentBlockhash = SystemProgram.programId.toBase58();
//   tx.recentBlockhash = bh;
//   const serialTX = tx
//     .serialize({ requireAllSignatures: false, verifySignatures: false })
//     .toString("base64");
//   const x = 0;
//   const response = {
//     transaction: serialTX,
//     message: "closing " + +"token accoutns",
//   };

//   return res.json(response, { headers: ACTIONS_CORS_HEADERS });
// });

blinkRouter.post("/actions/create-poll", async (req, res) => {
  const postRequest = req.body;
  const userPubkey = postRequest.account;
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const url = new URL(fullUrl);
  console.log("URL ---------- ", url);
  const action = url.searchParams.get("vote");
  const amount = url.searchParams.get("amount");

  const user = new PublicKey(userPubkey);

  const connection = new Connection(clusterApiUrl("devnet"));
  const tx = new Transaction();
  tx.feePayer = user;
  const accountInfo = await connection.getAccountInfo(user);
  const balance = accountInfo.lamports;
  if (balance < parseInt(amount)) {
    return res.status(400).send({ message: "Insufficient balance" });
  }
  tx.add(
    SystemProgram.transfer({
      fromPubkey: user,
      toPubkey: new PublicKey("H5KxECK5ukwyVjRymdiHCyGK6UxBxNNX38hsHcMat7qJ"),
      lamports: parseInt(amount),
    })
  );

  const bh = (await connection.getLatestBlockhash({ commitment: "finalized" }))
    .blockhash;
  tx.recentBlockhash = bh;

  const serialTX = tx
    .serialize({ requireAllSignatures: false, verifySignatures: false })
    .toString("base64");

  res.status(200).json({
    transaction: serialTX,
    message: `send ${amount} SOL to ${new PublicKey(
      "H5KxECK5ukwyVjRymdiHCyGK6UxBxNNX38hsHcMat7qJ"
    )}`,
  });

  console.log("userPubkey", userPubkey);
});
module.exports = { blinkRouter };
