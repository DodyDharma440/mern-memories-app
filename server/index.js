import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.info(`App is listen in port ${PORT}`);
});

app.get("/", (req, res) => {
  return res.json({
    hai: "HAi",
  });
});
