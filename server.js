import express from "express";
import cors from "cors";
import sendMail from "./send-mail.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse JSON body

app.post("/contact", sendMail);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
