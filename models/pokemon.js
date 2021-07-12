const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    pokemon_1_name: { type: String, min: 2, max: 50, required: true },
    pokemon_1_id: { type: Number, min: 1, required: true },
    pokemon_2_name: { type: String, min: 2, max: 50, required: true },
    pokemon_2_id: { type: Number, min: 1, required: true },
    game_winner_name: { type: String, min: 2, max: 50, required: true },
    game_winner_id: { type: Number, min: 1, required: true },
    game_rounds: { type: Number, min: 1, required: true },
    game_timestamp: { type: Date }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
