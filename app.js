var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const cors = require("cors");

let jsonData = require("./pokedex.json");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/pokemon", (req, res) => {
  console.log("route /pokemon accessed.");
  let pokemonDataJson = jsonData;

  if (pokemonDataJson) {
  res.status(404).send(pokemonDataJson);
  } else {
    res.status(404).send("Couldn\'t get all pokemon data!");
    console.log("Coulnd\'t do something");
  }
});

app.get("/pokemon/:id", (req, res) => {
    console.log("route /pokemon accessed.");
    let pokemonDataJson;
  
    if (pokemonDataJson) {
    //TODO: add retrieving and sending of pokemon data of one pokemon by :id
    } else {
      res.status(404).send("Couldn\'t get the specified pokemon\'s data!");
    }
  });

  app.get("/pokemon/:id/:info", (req, res) => {
    console.log("route /pokemon accessed.");
    let pokemonDataJson;
  
    if (pokemonDataJson) {
    //TODO: add retrieving and sending of pokemon data of one pokemon (with info) by :id
    } else {
      res.status(404).send("Couldn\'t get the specified pokemon\'s detailed information & data!");
    }
  });


module.exports = app;
