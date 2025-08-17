import axios from 'axios';
import { Training } from '../types/training';

const BASE_URL = 'https://dawan.org/public/training';

export async function fetchTrainings(): Promise<Training[]> {
  const res = await axios.get<Training[]>(`${BASE_URL}/`);
  return res.data;
}

export async function fetchTrainingDetails(slug: string): Promise<Training> {
  const res = await axios.get<Training>(`${BASE_URL}/show/${slug}`);
  return res.data;
}
