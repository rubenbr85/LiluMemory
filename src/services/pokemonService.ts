import axios from 'axios';
import { PokemonCharacter } from '../models/PokemonCharacter';

export const fetchPokemonCharacters = async (limit: number): Promise<PokemonCharacter[]> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const pokemonList = response.data.results;

    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon: { url: string }) => {
        const detailResponse = await axios.get(pokemon.url);
        return new PokemonCharacter(
          detailResponse.data.id,
          detailResponse.data.name,
          detailResponse.data.sprites.front_default,
          detailResponse.data.types.map((type: any) => type.type.name),
          detailResponse.data.abilities.map((ability: any) => ability.ability.name)
        );
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error('Error fetching Pokemon characters:', error);
    throw error;
  }
}; 