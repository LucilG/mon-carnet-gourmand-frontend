//////////////////////////////////////////////////////////////////////////
// without Provider. Using fetchData.js
//////////////////////////////////////////////////////////////////////////
import '../../styles/collections/CollectionsList.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { API_COLLECTIONS_URL } from '../../api/constantsAPI';
import { fetchData } from '../../api/fetchData';
import { COLLECTION_NEW_PATH, RECIPES_PATH } from '../../constants';

function CollectionsList({setSelectedCollection}) {

  const [collections, setCollections] = useState([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  const [errorCollections, setErrorCollections] = useState(false);

  const navigate = useNavigate();

  // fetch the collections from the API
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await fetchData(API_COLLECTIONS_URL);
        setCollections(response);
      } catch (error) {
        setErrorCollections(true);
        console.error("An error occured: ", error);
      } finally {
        setIsLoadingCollections(false);
        console.log("finally 2");
      }
    };

    getCollections();
  }, [])

  function handleClick(collection) {
    setSelectedCollection(collection);  // Mise à jour du paramètre
    navigate(RECIPES_PATH);  // Navigation vers la nouvelle page avec le paramètre mis à jour
  };

  let content = <div />
  if(isLoadingCollections) {
    content = <div><p>Loading...</p></div>
  } else if (errorCollections) {
    content = <div><p>An error occured...</p></div>
  } else {
    content = <div className="CollectionsList">
    <button key='all' onClick={() => handleClick(`all`)} className='collectionCard' >Voir tout</button>
    {collections.map((collection) => (
      <button key={collection.id} onClick={() => handleClick(`${collection.id}`)} className='collectionCard' >{collection.name}</button>
    ))}
    <Link to={COLLECTION_NEW_PATH} className='collectionCard' id="addCollection">+</Link>
    </div>
  }

  return (
    <div className='container-page'>
      {content}
    </div>
  )
}

export default CollectionsList;
