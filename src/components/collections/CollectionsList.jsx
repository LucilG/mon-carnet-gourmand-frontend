import '../../styles/collections/CollectionsList.css';
import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { API_COLLECTION_URL } from '../../api/constantsAPI';
import { COLLECTION_NEW_PATH, RECIPES_PATH } from '../../constants';
import useCollectionsContext from '../../hooks/use-collections-context';

function CollectionsList() {

  const {collections, isLoadingCollections, errorCollections, setSelectedCollection} = useCollectionsContext();

  const navigate = useNavigate();

  function handleClick(collectionId) {
    setSelectedCollection(collectionId);  // Mise à jour du paramètre
    navigate(RECIPES_PATH);  // Navigation vers la nouvelle page avec le paramètre mis à jour
  };

  let content = <div />
  if(isLoadingCollections) {
    content = <div><p>Loading...</p></div>
  } else if (errorCollections) {
    content = <div><p>An error occured... {errorCollections.message} </p></div>
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
