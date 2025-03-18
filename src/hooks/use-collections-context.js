import { useContext } from "react";
import CollectionsContext from "../context/collections";

function useCollectionsContext() {
  return useContext(CollectionsContext);
}

export default useCollectionsContext;
