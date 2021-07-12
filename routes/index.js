const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');
const moment = require('moment');

router.post('/game/save', async (req, res) => {
  const currentTime = moment().format();
  const game_timestamp = currentTime;

  const { pokemon_1_name, pokemon_1_id, pokemon_2_name, pokemon_2_id, game_winner_name, game_winner_id, game_rounds } = req.body;
  console.log({ pokemon_1_name, pokemon_2_name, game_timestamp });

  // Pokemon.create({ pokemon_1_name, pokemon_1_id, pokemon_2_name, pokemon_2_id, game_winner_name, game_winner_id, game_rounds, game_timestamp })
  //   .then((data) => res.json(data))
  //   .catch((e) => console.log(e.message));
  try {
    const allPokemon = await Pokemon.create({
      pokemon_1_name,
      pokemon_1_id,
      pokemon_2_name,
      pokemon_2_id,
      game_winner_name,
      game_winner_id,
      game_rounds,
      game_timestamp
    });
    res.json(allPokemon);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get('/game/leaderboard', async (req, res) => {
  try {
    const getPokemon = await Pokemon.find();
    res.json(getPokemon);
  } catch (e) {
    res.status(500).send(e.message);
  }
})

module.exports = router;
