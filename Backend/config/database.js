const { default: mongoose } = require("mongoose");

const db_Url = process.env.DB_URL || "mongodb://localhost:27017/jobsWorld";

const database = () => {
  mongoose
    .connect(db_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB CONNECTED");
    })
    .catch((err) => {
      console.log("OH NO!! MONGO CONNECTION ERROR!!!!");
      console.log(err);
    });
};

module.exports = database;
