import { createContext, useState } from "react";
import axios from "axios";
import { API_COLLECTION_URL } from '../api/constantsAPI';

const CollectionsContext = createContext();

function ProviderCollections( { children } ) {
  const [collections, setCollections] = useState([]);
  const [oneCollection, setOneCollection] = useState(null);

  const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  const [errorCollections, setErrorCollections] = useState(null);

  const [selectedCollection, setSelectedCollection] = useState("all");

  // FETCH COLLECTIONS : fetch to the json server
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

    // FETCH ONE COLLECTION : fetch to the json server
    async function fetchOneCollectionById(id) {
      try {
        const response = await axios.get(`${API_COLLECTION_URL}/${id}`);
        // console.log(response.data);
        setOneCollection(response.data);
        // console.log(oneCollection);
      } catch (error) {
        // console.error(error.message);
        setErrorCollections(error);
      } finally {
        // console.log('finally');
        setIsLoadingCollections(false);
      }
    };

  // CREATE A COLLECTION : create a new collection and send it to the json server
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

  // DELETE A COLLECTION : delete a collection and send it to the json server
  async function deleteCollectionById(id) {
    try {
      const response = await axios.delete(`${API_COLLECTION_URL}/${id}`);
      // console.log(response);
      const updatedCollections = collections.filter((collection) => {
        return collection.id != id;
      });
      setCollections(updatedCollections);
    } catch (error) {
      // console.error(error.message);
      setErrorCollections(error);
    } finally {
      // console.log('finally');
      setIsLoadingCollections(false);
    }
  };

    // EDIT A COLLECTION : edit a collection's name and send it to the json server
    async function editCollectionById(id, newName) {
      try {
        const response = await axios.put(`${API_COLLECTION_URL}/${id}`, {name: newName});
        // console.log(response);
        const updatedCollections = collections.map((collection) => {
          if (collection.id === id) {
            return {...collection, ...response.data};
          }
          return collection;
        });
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
    fetchCollections: fetchCollections,
    oneCollection: oneCollection,
    fetchOneCollectionById: fetchOneCollectionById,
    selectedCollection: selectedCollection,
    setSelectedCollection: setSelectedCollection,
    createCollection: createCollection,
    deleteCollectionById: deleteCollectionById,
    editCollectionById: editCollectionById,
    isLoadingCollections: isLoadingCollections,
    errorCollections: errorCollections,
  };

  return (
    <CollectionsContext.Provider value={valueToShare}>
      {children}
    </CollectionsContext.Provider>
  );
}

export { ProviderCollections };
export default CollectionsContext;
