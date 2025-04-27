import { CharacterSource } from '../models/CharacterSource';
import { fetchDisneyCharacters } from './disneyService';
import { fetchPokemonCharacters } from './pokemonService';
import { getRandomNumber } from '../utils/random';
import { Character } from '../models/Character';
import { DisneyCharacter } from '../models/DisneyCharacter';
import { PokemonCharacter } from '../models/PokemonCharacter';
import { SOURCE_POKEMON_ID, SOURCE_DISNEY_ID } from '../constants/sources';

const MIN_CHARACTERS = 4;
const MAX_CHARACTERS = 15;

export const fetchCharacters = async (source: CharacterSource): Promise<Character[]> => {
  const limit = getRandomNumber(MIN_CHARACTERS, MAX_CHARACTERS);
  
  switch (source.id) {
    case SOURCE_POKEMON_ID:
      return fetchPokemonCharacters(limit);
    case SOURCE_DISNEY_ID:
      return fetchDisneyCharacters(limit);
    default:
      throw new Error(`Unknown source: ${source.nombre}`);
  }
}; 