import axios from 'axios';
import { tagsResponse} from '../types/tagsDatos.types';

// Create the API client with base URL and timeout configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this is correctly set in your .env file
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch events
export const fetchTags = async (): Promise<tagsResponse> => {
  try {
    const response = await apiClient.get('/tags');
    return response.data; // Return the events data
  } catch (error) {
    console.error('Error fetching tags', error);
    throw new Error('Failed to fetch tags');
  }
};
