import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import users from "./routes/users";

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();

app.use(
  cors({
    credentials: true
  })
);

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", users);

app.get("/hello", (req, res) => {
  res.status(200).send("Hey there!");
});

exports.api = functions.https.onRequest(app);
