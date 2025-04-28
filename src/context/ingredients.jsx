import { createContext, useState } from "react";
import axios from "axios";
import { API_INGREDIENTS_URL } from '../api/constantsAPI';

const IngredientsContext = createContext();

function ProviderIngredients( { children } ) {
  const [ingredients, setIngredients] = useState([]);

  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [errorIngredients, setErrorIngredients] = useState(null);

  // fetch to the json server
  async function fetchIngredients(id) {
    try {
      const response = await axios.get(API_INGREDIENTS_URL);
      console.log("response try: ");
      console.log(response.data);
      if (response.data) {
        const filteredResponse = response.data.filter((element) => parseInt(element.recipe_id, 10) === parseInt(id, 10));
        setIngredients(filteredResponse);
      }

    } catch (error) {
      // console.error(error.message);
      setErrorIngredients(error);
    } finally {
      // console.log('finally');
      setIsLoadingIngredients(false);
    }
  };

  // data to share in the app
  const valueToShare = {
    ingredients: ingredients,
    isLoadingIngredients: isLoadingIngredients,
    errorIngredients: errorIngredients,
    fetchIngredients: fetchIngredients
  };

  return (
    <IngredientsContext.Provider value={valueToShare}>
      {children}
    </IngredientsContext.Provider>
  );
}

export { ProviderIngredients };
export default IngredientsContext;
