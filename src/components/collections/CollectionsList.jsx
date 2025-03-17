import '../../styles/collections/CollectionsList.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { API_COLLECTION_URL } from '../../api/constantsAPI';
import { fetchData } from '../../api/fetchData';
import { RECIPES_PATH } from '../../constants';

function CollectionsList({setSelectedCollection}) {

  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //fetch the collections from the API
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await fetchData(API_COLLECTION_URL);
        setCollections(response);
      } catch (error) {
        setError(true);
        console.error("An error occured: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCollections();
  }, [])

  function handleClick(collection) {
    setSelectedCollection(collection);  // Mise à jour du paramètre
    navigate(RECIPES_PATH);  // Navigation vers la nouvelle page avec le paramètre mis à jour
  };

  let content = <div />
  if(isLoading) {
    content = <div><p>Loading...</p></div>
  } else if (error) {
    content = <div><p>An error occured...</p></div>
  } else {
    content = <div className="CollectionsList">
    <button key='all' onClick={() => handleClick(`all`)} className='collectionCard' >Voir tout</button>
    {collections.map((collection) => (
      <button key={collection.id} onClick={() => handleClick(`${collection.id}`)} className='collectionCard' >{collection.name}</button>
    ))}
    <Link to="/collections/new" className='collectionCard' id="addCollection">+</Link>
    </div>
  }

  return (
    <div className='container-page'>
      {content}
    </div>
  )
}

export default CollectionsList;
