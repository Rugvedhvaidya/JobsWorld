const mongoose = require("mongoose");
const Resume = require("../models/resume");

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

const seedResume = [
  {
    user_id: "624adaabbccbf774e9c8ad75",
    firstName: "sai",
    lastName: "t",
    currentCity: "Vijayawada",
    postalCode: 521185,
    email: "gopinadh546@gmail.com",
    phone: 9603213864,
    degree: "Bachelor's Of Technology",
    fieldOfStudy: "CSE",
    college: "IIITS",
    year: "2019 to 2023",
    jobTitle: "NA",
    company: "NA",
    jobCity: "NA",
    jobYear: "NA",
    jobDesc: "NA",
    skills: ["c", "python"],
  },
];

Resume.insertMany(seedResume)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
