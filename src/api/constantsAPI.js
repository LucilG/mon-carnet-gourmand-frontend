// get the URL of the API (backend app) for recipes
export const API_RECIPES_URL =
  import.meta.env.MODE === "development"
  ? import.meta.env.VITE_APP_RECIPES_URL
  : null;

// get the URL of the API (backend app) for collections
export const API_COLLECTIONS_URL =
import.meta.env.MODE === "development"
? import.meta.env.VITE_APP_COLLECTIONS_URL
: null;

// get the URL of the API (backend app) for ingredients
export const API_INGREDIENTS_URL =
  import.meta.env.MODE === "development"
  ? import.meta.env.VITE_APP_INGREDIENTS_URL
  : null;
