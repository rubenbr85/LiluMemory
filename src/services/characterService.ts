import { SourceType } from '../constants/sources';
import { fetchDisneyCharacters } from './disneyService';
import { fetchPokemonCharacters } from './pokemonService';
import { getRandomNumber } from '../utils/random';
import { Character } from '../models/Character';
import { DisneyCharacter } from '../models/DisneyCharacter';
import { PokemonCharacter } from '../models/PokemonCharacter';

const MIN_CHARACTERS = 4;
const MAX_CHARACTERS = 15;

export const fetchCharacters = async (source: SourceType): Promise<Character[]> => {
  const limit = getRandomNumber(MIN_CHARACTERS, MAX_CHARACTERS);
  
  switch (source) {
    case 'disney':
      return fetchDisneyCharacters(limit);
    case 'pokemon':
      return fetchPokemonCharacters(limit);
    default:
      throw new Error(`Unknown source: ${source}`);
  }
}; 