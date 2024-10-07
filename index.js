const express = require("express");
const PORT = 4040;
const { handler } = require("./controller");
const { Axios, BASE_URL } = require("./controller/lib/axios");
const app = express();

app.use(express.json());

app.post("*", async (req, res) => {
  console.log("msg", req.body);
  console.log("base u2rl", BASE_URL);
  req.body && res.status(200).send("Succces");

  await handler(req);
  // Axios.post("/sendMessage", {
  //   chat_id: req.body.message.chat.id,
  //   text: "hiiii",
  // });

  // const response = await fetch(
  //   `${BASE_URL}/sendMessage?chat_id=${req.body.message.chat.id}&text=Hiiii_aslkdfjlkj`
  // );

  // console.log("rspnose", response);
  // res.ok && res.status(200).send("Success");
  // Axios.get("/sendMessage", {
  //   chat_id: req.body.message.chat.id,
  //   text: "hiiii",
  // });
});

app.get("/actions", async (req, res) => {});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Listening on port" + PORT);
});

// `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}`;
// https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID};
// fetch(
//   `https://api.telegram.org/bot7414092820:AAElgG1Lax888Yzzv3ME4LEtsAp_c_NuoCI/sendMessage?chat_id=6741229382&text=Hiiii_aslkdfjlkj`
// );
// fetch(
//   `https://api.telegram.org/bot7414092820:AAElgG1Lax888Yzzv3ME4LEtsAp_c_NuoCI/setWebhook?url=https://3592-2407-5200-401-d590-3ea6-e31e-6634-27ff.ngrok-free.app`
// );
