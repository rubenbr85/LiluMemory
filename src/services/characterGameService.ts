import { Character } from '../models/Character';

const CHARACTERS_LIMIT = 5;
//const API_BASE_URL = 'https://lilu-memory-backend.vercel.app/api';
const API_BASE_URL = 'http://localhost:3000/api';

export const fetchCharacters = async (sourceId: number, difficultyId: number): Promise<Character[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/characters?sourceId=${sourceId}&limit=${CHARACTERS_LIMIT}&difficultyId=${difficultyId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Character[];
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};