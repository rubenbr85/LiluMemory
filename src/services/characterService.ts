import { SourceType } from '../constants/sources';
import { fetchDisneyCharacters, DisneyCharacter } from './disneyService';
import { fetchPokemonCharacters, PokemonCharacter } from './pokemonService';
import { getRandomNumber } from '../utils/random';

export type Character = DisneyCharacter | PokemonCharacter;

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