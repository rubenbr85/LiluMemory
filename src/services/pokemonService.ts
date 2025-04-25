import axios from 'axios';

export interface PokemonCharacter {
  id: number;
  name: string;
  imageUrl: string;
}

export const fetchPokemonCharacters = async (limit: number): Promise<PokemonCharacter[]> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const pokemonList = response.data.results;

    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon: { url: string }) => {
        const detailResponse = await axios.get(pokemon.url);
        return {
          id: detailResponse.data.id,
          name: detailResponse.data.name,
          imageUrl: detailResponse.data.sprites.front_default
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error('Error fetching Pokemon characters:', error);
    throw error;
  }
}; 