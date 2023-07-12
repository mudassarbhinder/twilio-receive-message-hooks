const http = require("http");
const express = require("express");
const { urlencoded } = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();
app.use(urlencoded({ extended: false }));

// Number from which you will recieve otp
const from_number = "";

let codeMsg = "OTP is 952384";

app.get("/getcode", (req, res) => {
  let code = codeMsg.match(/[0-9]{6,}/gim);

  try {
    console.log("Sending  Code ");
    res.status(200).send(code[0]);
  } catch (error) {
    res.status(400).send(codeMsg);
  }
});
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  // Access the message body and the number it was sent from.
  console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

  if (req.body.From == `${from_number}`) {
    codeMsg = req.body.Body;
  }

  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

http.createServer(app).listen(3000, () => {
  console.log("Express server listening on port 3000");
});
