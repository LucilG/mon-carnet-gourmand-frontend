import '../../styles/collections/CollectionNew.css';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { API_COLLECTIONS_URL } from '../../api/constantsAPI';
import { COLLECTIONS_PATH } from '../../constants';
import { FaArrowLeft } from "react-icons/fa6";
import useCollectionsContext from '../../hooks/use-collections-context';

function CollectionNew() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const { createCollection, isLoadingCollection, errorCollections } = useCollectionsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCollection({name});
    if (!isLoadingCollection && (errorCollections === null)) {
      navigate(`/collections`);
    }
  }

  return (
    <div className='CollectionNew'>
      <Link to={COLLECTIONS_PATH} className='gobackbtn'>
        <FaArrowLeft />
        <p>Go Back</p>
      </Link>

      <div>
        <h2>Ajouter une nouvelle catégorie à votre carnet de recette :</h2>
        <form action='submit' onSubmit={handleSubmit} id='CollectionNewForm'>
          <input type='text' name='name' placeholder='Nom de la nouvelle catégorie...' className='collectionInput' onChange={(e) => setName(e.target.value)} />
          <button type='submit' className='yellowbtn'>Ajouter maintenant !</button>
        </form>
      </div>
    </div>
  )
}

export default CollectionNew;
