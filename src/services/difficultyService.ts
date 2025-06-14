import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Difficulty } from '../models/Difficulty';

const API_URL = `${import.meta.env.VITE_API_URL}/api/difficultys`;

export const fetchDifficultys = async (): Promise<Difficulty[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching difficultys:', error);
    throw error;
  }
};

export const useDifficultys = () => {
  return useQuery<Difficulty[], Error>({
    queryKey: ['difficultys'],
    queryFn: fetchDifficultys,
    staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
    gcTime: 30 * 60 * 1000, // Los datos se mantienen en caché por 30 minutos
  });
};