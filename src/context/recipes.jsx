import { createContext, useState } from "react";
import axios from "axios";
import { API_RECIPES_URL } from '../api/constantsAPI';

const RecipesContext = createContext();

function ProviderRecipes( { children } ) {
  const [recipes, setRecipes] = useState([]);
  const [oneRecipe, setOneRecipe] = useState(null);

  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  const [errorRecipes, setErrorRecipes] = useState(null);

  // fetch to the json server
  async function fetchRecipes() {
    try {
      const response = await axios.get(API_RECIPES_URL);
      // console.log(response);
      setRecipes(response.data);
    } catch (error) {
      // console.error(error.message);
      setErrorRecipes(error);
    } finally {
      // console.log('finally');
      setIsLoadingRecipes(false);
    }
  };

  // FETCH ONE Recipe : fetch to the json server
  async function fetchOneRecipe(id) {
    try {
      const response = await axios.get(`${API_RECIPES_URL}/${id}`);
      // console.log(response.data);
      setOneRecipe(response.data);
      // console.log(oneRecipe);
    } catch (error) {
      // console.error(error.message);
      setErrorRecipes(error);
    } finally {
      // console.log('finally');
      setIsLoadingRecipes(false);
    }
  };

  // CREATE A RECIPE : create a new recipe and send it to the json server
  async function createRecipe(recipe) {
    try {
      const response = await axios.post(API_RECIPES_URL, {recipe});
      // console.log(response);
      const updatedRecipes = [...recipes, response.data]
      setRecipes(updatedRecipes);
    } catch (error) {
      // console.error(error.message);
      setErrorRecipes(error);
    } finally {
      // console.log('finally');
      setIsLoadingRecipes(false);
    }
  };

  // data to share in the app
  const valueToShare = {
    recipes: recipes,
    oneRecipe: oneRecipe,
    isLoadingRecipes: isLoadingRecipes,
    errorRecipes: errorRecipes,
    fetchRecipes: fetchRecipes,
    fetchOneRecipe: fetchOneRecipe,
    createRecipe: createRecipe
  };

  return (
    <RecipesContext.Provider value={valueToShare}>
      {children}
    </RecipesContext.Provider>
  );
}

export { ProviderRecipes };
export default RecipesContext;
