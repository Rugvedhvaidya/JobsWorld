const mongoose = require("mongoose");
const Job = require("../models/jobs");
const {
  company,
  company_description,
  company_location,
  number_of_postings,
  job_title,
  job_description,
  role_category,
  salary,
  work_experience,
  job_type,
  education_level,
  userid,
} = require("./seedHelpers");

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedJobs = async () => {
  await Job.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const post = new Job({
      owner_id: "624adaabbccbf774e9c8ad75",
      role: "Hiring Manager",
      company_name: `${sample(company)}`,
      company_description: `${sample(company_description)}`,
      company_location: `${sample(company_location)}`,
      number_of_postings: `${sample(number_of_postings)}`,
      job_title: `${sample(job_title)}`,
      job_description: `${sample(job_description)}`,
      role_category: `${sample(role_category)}`,
      salary: `${sample(salary)}`,
      work_experience: `${sample(work_experience)}`,
      job_type: `${sample(job_type)}`,
      education_level: `${sample(education_level)}`,
      skills: ["Angular", "Python"],
    });
    await post.save();
  }
};

seedJobs().then(() => {
  mongoose.connection.close();
});

// const seedJobs = [
//   {
//     company_name: "Selfservit solutions pvt ltd",
//     company_description: " It is classified as Non-govt company and is registered at Registrar of Companies, Chennai. ",
//     company_location: "Chennai",
//     number_of_postings: 2,
//     job_title: "JavaScript Developer",
//     job_description: "Looking for suitable candidates for the post of Javascript developer in Chennai who can join immediately or 1 to 1.5 months.\nCandidates should have strong programming and logical thinking skills, responsible for developing the client side framework using html and javascript for both web and mobile application.\n",
//     role_category: "Software Development",
//     salary: 950000,
//     work_experience: 1,
//     job_type: "FullTime",
//     education_level: "Bachelor's Degree",
//     skills: 'c',
//   },
//   {
//     company_name: "Akqa Media India pvt ltd",
//     company_description: "AKQA is an ideas and innovation company. We exist to create the future for our clients.\n\n",
//     company_location: "Gurgaon",
//     number_of_postings: 3,
//     job_title: "Front End Web Developer",
//     job_description: "Understanding of JavaScript design patterns, including the Model-View-Controller and Observer patterns.Able to produce JavaScript unit tests.\n",
//     role_category: "Software Development",
//     salary: 500000,
//     work_experience: 4,
//     job_type: "FullTime",
//     education_level: "Bachelor's Degree",
//     skills: 'java'
//   },
//   {
//     company_name: "Accenture",
//     company_description: "Accenture solves our clients’ toughest challenges by providing unmatched services in strategy, consulting, digital, technology and operations. \n",
//     company_location: "Mumbai",
//     number_of_postings: 6,
//     job_title: "Application Developer",
//     job_description: "Design, build and configure applications to meet business process and application requirements.\n",
//     role_category: "Software Development",
//     salary: 1200000,
//     work_experience: 4,
//     job_type: "FullTime",
//     education_level: "Bachelor's Degree",
//     skills: 'python',
//   },
// {
//   company_name: "Revolux Solutions Pvt Ltd",
//   company_description: "REVOLUX SOLUTIONS PRIVATE LIMITED is a Mumbai based company working towards excellence in the Software Solutions space, and believe in pursuing business through innovation and technology.",
//   company_location: "Mumbai",
//   number_of_postings: 5,
//   job_title: "Full stack developer",
//   job_description: "Design, build and maintain good quality, high performance, reusable, and reliable code. Transform designs and wireframes into high-quality source code",
//   role_category: "Software Development",
//   salary: 750000,
//   work_experience: 1,
//   job_type: "FullTime",
//   education_level: "Bachelor's Degree",
//   skills: 'c'
// },
// ]

// Job.insertMany(seedJobs)
//   .then(res => {
//     console.log(res)
//   })
//   .catch(e => {
//     console.log(e)
//   })
