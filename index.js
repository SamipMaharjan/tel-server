const express = require("express");
require("dotenv").config();
const PORT = 4040;
const { handler } = require("./controller");
const { Axios, BASE_URL } = require("./controller/lib/axios");
const app = express();
const { createServer } = require("http");
const { connectToMongoDB } = require("./services/database.services");
const { mainRouter } = require("./routes/mainRouter");
const cors = require("cors");
app.use(cors());
// const corsOptions = {
//   origin: "*", // Allow all origins
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
app.use(express.json());

// app.listen(PORT, function (err) {
//   if (err) console.log(err);
//   console.log("Listening on port" + PORT);
// });

app.use("/api", mainRouter);
app.post("*", async (req, res) => {
  console.log("msg", req.body);
  // console.log("base u2rl", BASE_URL);
  req.body && res.status(200).send("Succces");

  await handler(req);
});
connectToMongoDB().then(async () => {
  startServer();
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 10000;
    const server = createServer(app); // Actual Web server

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error while starting the server: ", error);
  }
};

// `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}`;
// https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID};
// fetch(
//   `https://api.telegram.org/bot7414092820:AAElgG1Lax888Yzzv3ME4LEtsAp_c_NuoCI/sendMessage?chat_id=6741229382&text=Hiiii_aslkdfjlkj`
// );
// fetch(
//   `https://api.telegram.org/bot7414092820:AAElgG1Lax888Yzzv3ME4LEtsAp_c_NuoCI/setWebhook?url=https://3592-2407-5200-401-d590-3ea6-e31e-6634-27ff.ngrok-free.app`
// );
