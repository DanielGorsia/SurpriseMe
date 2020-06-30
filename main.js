const express = require("express");
const bodyParser = require("body-parser");
// const path = require("path");
const axios = require("axios");

const app = express();
const port = "3000";

//routes
const api = require("./routes/api");


const corsConfig = {
  origin: true,
  credentials: true
};

app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json



//routing
app.use("/api", api);


app.use((req, res) => {
    res.sendStatus(404);
});

//handle error
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
      error: {
          status: error.status || 500,
          message: error.message || 'Internal Server Error',
      },
  });
});


//check that the server is alive
app.listen(port, () => {
    console.log(`I am alive on port ${port}`);
})

module.exports = app;

