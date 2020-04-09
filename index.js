// express is a framework that built on the node.js
// its like a react for js
const express = require("express");

// every app in real world needs data that can the client interact with it
// this is a fake data
const db = require("./database");

// there is 2 name that standardized  with calling the express either App or Server
const app = express();

// parse int so it work as an object
// because the express deals with string
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is working"
  });
});

// include all the methods that use the same endpoints

// Endpoint = "/users"
app
  .route("/users")
  .get("/users", (req, res) => {
    const users = db.getUsers();
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(404).send({
        message: "Not Found"
      });
    }
  })
  .post("/users", (req, res) => {
    let name = req.body.name || "Yasir";
    const newUser = db.createUser({
      name: name
    });
    if (!name) {
      return res.status(404).send({
        message: "Not Found"
      });
    }

    res.json(newUser);
  });

// include all the methods that use the same endpoints
// Endpoint = "/users/:id"

app
  .route("/users/:id")
  .get("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id);

    if (!user) {
      return res.status(404).send({
        message: "Not Found"
      });
    }

    return res.json(user);
  })
  .put("/users/:id", (req, res) => {
    let userID = req.params.id;
    if (!userID) {
      return res.status(404).send({
        message: "Not Found"
      });
    } else {
      let updateUser = db.updateUser(userID, {
        name: req.body.name
      });
      return res.json(updateUser);
    }
  })
  .delete("/users/:id", (req, res) => {
    let userID = req.params.id;
    let user = db.getUserById(userID);
    if (!user) {
      return res.status(404).send({
        message: "Not Found"
      });
    } else {
      let deletedUser = db.deleteUser(userID);
      res.status(204).json(deletedUser);
    }
  });

app.listen(8000, () => {
  console.log("Listening at http://localhost:8080");
});
