// express is a framework that built on the node.js
// its like a react for js
const express = require("express");

const app = express();

// parse int so it work as an object
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is working"
  });
});

app.listen(8080, () => {
  console.log("Listening at http://localhost:8080");
});
