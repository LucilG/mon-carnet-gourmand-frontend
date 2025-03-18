import { createContext, useState } from "react";
import axios from "axios";
import { API_COLLECTION_URL } from '../api/constantsAPI';

const CollectionsContext = createContext();

function Provider( { children } ) {
  const [collections, setCollections] = useState([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  const [errorCollections, setErrorCollections] = useState(null);

  // fetch to the json server
  async function fetchCollections() {
    try {
      const response = await axios.get(API_COLLECTION_URL);
      // console.log(response);
      setCollections(response.data);
    } catch (error) {
      // console.error(error.message);
      setErrorCollections(error);
    } finally {
      // console.log('finally');
      setIsLoadingCollections(false);
    }
  };

  // create a new collection and send it to the json server
  async function createCollection(collection) {
    try {
      const response = await axios.post(API_COLLECTION_URL, {collection});
      // console.log(response);
      const updatedCollections = [...collections, response.data]
      setCollections(updatedCollections);
    } catch (error) {
      // console.error(error.message);
      setErrorCollections(error);
    } finally {
      // console.log('finally');
      setIsLoadingCollections(false);
    }
  };

  // data to share in the app
  const valueToShare = {
    collections: collections,
    isLoadingCollections: isLoadingCollections,
    errorCollections: errorCollections,
    fetchCollections: fetchCollections,
    createCollection: createCollection,
  };

  return (
    <CollectionsContext.Provider value={valueToShare}>
      {children}
    </CollectionsContext.Provider>
  );
}

export { Provider };
export default CollectionsContext;
