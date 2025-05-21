import axios from 'axios';
import { EventResponse } from '../types/EventosData.types';

// Create the API client with base URL and timeout configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this is correctly set in your .env file
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch events
export const fetchEvents = async (): Promise<EventResponse> => {
  try {
    const response = await apiClient.get('/events');
    return response.data; // Return the events data
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; // Re-throw the error to ensure the function always returns a Promise<EventResponse>
  }
};
