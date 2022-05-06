const functions = require("firebase-functions");

const express = require("express");

const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51KwOTEDvoRVbwmSqzxCQy3G0VSIuCUMYXRfhDllKtxRgG0ea9H3bKqfFSq8mZRWg1T9Luyd2hdM3mI6PJBZJGyyB00kikgt6Te"
);

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log('====================================');
  console.log("Bommmmmmmm", total);
  console.log('====================================');
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

// http://localhost:5001/react-208e4/us-central1/api
