import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/berry/";

export const fetchBerries = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching berries:", error);
    throw error;
  }
};

export const fetchBerryDetail = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching berry detail:", error);
    throw error;
  }
};
