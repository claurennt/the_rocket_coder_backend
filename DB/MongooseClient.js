const mongoose = require("mongoose");

const { MONGODB_CONNECTION_URI } = process.env;

mongoose
  .connect(MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected successfully to MongoDB!"))
  .catch((e) => console.error(e));

const client = mongoose.connection;

client.on("error", (e) => {
  console.error(e);
});

module.exports = client;
