import { MOCK_DATA } from "./config.js";

// getting data by city name
export const getCurrentWeather = async (city) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ...MOCK_DATA, name: city };
  } catch (error) {
    throw new Error("Nu s-au putut incarca datele despre vreme dupa oras");
  }
};

// getting data by geographic coordinates
export const getWeatherByCoord = async (lat, lan) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ...MOCK_DATA, coord: { lat, lan } };
  } catch (error) {
    throw new Error(
      "Nu s-au putut incarca datele despre vreme pe baza coordonatelor"
    );
  }
};
