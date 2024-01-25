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

app.use(cors({ origin: "*" }));

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
