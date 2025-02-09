import axios from 'axios';
import { GET_ABILITY } from '../constants/api';

export interface Ability {
  name: string;
  url: string;
}

export interface AbilityListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Ability[];
}

export const fetchAllAbilities = async (
  page: number,
  limit: number = 10
): Promise<AbilityListResponse> => {
  try {
    const response = await axios.get<AbilityListResponse>(
      `${GET_ABILITY}/?offset=${(page - 1) * limit}&limit=${limit}`
    );
    return response.data;
  } catch {
    throw new Error('Failed to fetch abilities list');
  }
};
