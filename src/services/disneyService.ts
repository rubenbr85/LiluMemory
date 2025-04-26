import axios from 'axios';
import { DisneyCharacter } from '../models/DisneyCharacter';

export const fetchDisneyCharacters = async (limit: number): Promise<DisneyCharacter[]> => {
  try {
    const response = await axios.get(`https://api.disneyapi.dev/character`);
    const allCharacters = response.data.data.map((character: any) => new DisneyCharacter(
      character._id,
      character.name,
      character.imageUrl || 'https://via.placeholder.com/150?text=Disney',
      character.films || [],
      character.tvShows || []
    ));

    // Mezclar el array de personajes de forma aleatoria
    const shuffled = allCharacters.sort(() => 0.5 - Math.random());
    // Seleccionar solo los primeros 'limit' elementos
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error('Error fetching Disney characters:', error);
    // Si hay un error, devolvemos algunos personajes de Disney por defecto
    const defaultCharacters = [
      new DisneyCharacter(1, 'Mickey Mouse', 'https://via.placeholder.com/150?text=Mickey', [], []),
      new DisneyCharacter(2, 'Minnie Mouse', 'https://via.placeholder.com/150?text=Minnie', [], []),
      new DisneyCharacter(3, 'Donald Duck', 'https://via.placeholder.com/150?text=Donald', [], []),
      new DisneyCharacter(4, 'Goofy', 'https://via.placeholder.com/150?text=Goofy', [], [])
    ];
    // También limitamos los personajes por defecto
    return defaultCharacters.slice(0, limit);
  }
}; 