require('dotenv').config();
require('./database/client');
const mongoose = require('mongoose');
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
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
    res.status(200).send(pokemonDataJson);
  } else {
    res.status(404).send("Couldn't get all pokemon data!");
    console.log("Coulnd't get all pokemon data.");
  }
});

app.get("/pokemon/:id", (req, res) => {
  console.log("route /pokemon accessed.");
  const allPokemonDataJson = jsonData;

  if (allPokemonDataJson) {
    //TODO: add retrieving and sending of pokemon data of one pokemon by :id
    //req.params.someParameter
    const onePokemonById = allPokemonDataJson.find((pokemon) => {
      if (pokemon.id === Number(req.params.id)) {
        return true;
      } else {
        return false;
      }
    });
    if (onePokemonById) {
      res.status(200).send(onePokemonById);
    } else {
      res.status(404).send("Couldn't get the specified pokemon's data!");
    }
  } else {
    res.status(404).send("Couldn't get the specified pokemon's data!");
  }
});

app.get("/pokemon/:id/:info", (req, res) => {
  console.log("route /pokemon accessed.");
  const allPokemonDataJson = jsonData;

  if (allPokemonDataJson) {
    const onePokemonById = allPokemonDataJson.find((pokemon) => {
      if (pokemon.id === Number(req.params.id)) {
        return true;
      } else {
        return false;
      }
    });
    let infoParam = req.params.info.toLowerCase();
    let oneInfoOnlyPokemon = { id: Number(onePokemonById.id) };
    switch (infoParam) {
      case "name":
        oneInfoOnlyPokemon.name = onePokemonById.name;
        break;
      case "type":
        oneInfoOnlyPokemon.type = onePokemonById.type;
        break;
      case "base":
        oneInfoOnlyPokemon.base = onePokemonById.base;
        break;
      default:
        infoParam = "invalid";
        break;
    }
    if (!infoParam || infoParam == "invalid") {
      res
        .status(400)
        .send(
          "Couldn't get the specified pokemon's detailed information & data! Invalid info passed"
        );
    } else {
      res.status(200).send(oneInfoOnlyPokemon);
      console.log(
        "Successfully retrieved one pokemon item by ID and INFO param."
      );
    }
    //TODO: add retrieving and sending of pokemon data of one pokemon (with info) by :id
  } else {
    res
      .status(40)
      .send(
        "Couldn't get the specified pokemon's detailed information & data!"
      );
  }
});

module.exports = app;
