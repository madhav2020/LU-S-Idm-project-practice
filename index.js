require("dotenv").config();
const express = require("express");
const router = require("./routes/index");

const app = express();
app.use(express.json());

// here we are requiring the DB connection code which means the require will execute all the code inside the specified path in require and since we are putting this just before the middleware first this code will execute all the code inside the path
// MONGODB CONNECTION
require("./database/index");

// this middleware will execute all the time
app.use("/api/v1", router);

// It's very special type of middleware which get activated whenever the next function is called
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is up and running on port ${process.env.PORT}`);
});
