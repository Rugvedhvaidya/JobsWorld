const mongoose = require("mongoose");
const Shortlist = require("../models/shortlist");

mongoose
  .connect("mongodb://localhost:27017/jobsWorld", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const seedShortlist = [
  {
    user_id: "6246018f46f987660c6b69c7",
    job_ids: [],
  },
];

Shortlist.insertMany(seedShortlist)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
