import { useContext } from "react";
import RecipesContext from "../context/recipes";

function useRecipesContext() {
  return useContext(RecipesContext);
}

export default useRecipesContext;
