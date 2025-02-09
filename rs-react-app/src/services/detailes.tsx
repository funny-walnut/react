import axios from 'axios';

export interface AbilityDetails {
  id: number;
  name: string;
  effect_entries: {
    short_effect: string;
    effect: string;
  }[];
}

export const fetchAbilityDetails = async (
  url: string
): Promise<AbilityDetails> => {
  try {
    const response = await axios.get<AbilityDetails>(url);
    return response.data;
  } catch {
    throw new Error('Failed to fetch ability details');
  }
};
