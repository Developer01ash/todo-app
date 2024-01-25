const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error(`🚫 → ${err.message}`);
});

module.exports = mongoose.connection;
