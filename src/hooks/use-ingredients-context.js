import { useContext } from "react";
import IngredientsContext from "../context/ingredients";

function useIngredientsContext() {
  return useContext(IngredientsContext);
}

export default useIngredientsContext;
