import '../../styles/collections/CollectionNew.css';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { API_COLLECTION_URL } from '../../api/constantsAPI';
import { COLLECTIONS_PATH } from '../../constants';
import { FaArrowLeft } from "react-icons/fa6";

function CollectionNew() {
  const [name, setName] = useState('');
  const [, setLoading] = useState(true);
  const [, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_COLLECTION_URL,
                                  { method: 'POST',
                                    headers: { 'Content-Type': 'application/json'},
                                    body: JSON.stringify({ "collection": {name} })
                                  });
      if (response.ok) {
        // const NewRecipeJson = await response.json();
        navigate(`/collections/`);
      } else {
        console.log("An error occured: ", e);
        throw response;
      }
    } catch (e) {
      setError("An error occured...");
      console.log("An error occured: ", e);
    } finally {
      setLoading(false);
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
