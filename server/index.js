const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);

const dbConnection = require("./database");
const { strategy, strategyLocal } = require("./passport");
const routes = require("./routes");

const app = express();
const PORT = 8080;

const allowlist = ["https://todo-app-nu-bay.vercel.app"];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(
  session({
    secret: "sweetsesh",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: dbConnection }),
  })
);

passport.use(strategy);
passport.use(strategyLocal);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({ message: "welcome to passport" });
});

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
