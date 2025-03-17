// get the URL of the API (backend app) for recipes
export const API_RECIPE_URL =
  import.meta.env.MODE === "development"
  ? import.meta.env.VITE_APP_RECIPES_URL
  : null;

// get the URL of the API (backend app) for collection
export const API_COLLECTION_URL =
import.meta.env.MODE === "development"
? import.meta.env.VITE_APP_COLLECTIONS_URL
: null;
