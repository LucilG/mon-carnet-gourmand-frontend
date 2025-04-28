import '../../styles/recipes/RecipeNew.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { API_RECIPES_URL, API_COLLECTIONS_URL } from '../../api/constantsAPI';

function RecipeNew() {
  const [name, setName] = useState('');
  const [nb_people, setNbPeople] = useState(0);
  const [prepa_time, setPrepaTime] = useState(0);
  const [cooking_time, setCookingTime] = useState(0);
  const [instructions, setInstructions] = useState('');
  const [collection_id, setCollectionID] = useState(0);
  const [collections, setCollections] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(false);
  const navigate = useNavigate();

  // fetch the collections from the API
    useEffect(() => {
      async function loadCollections() {
        try {
          const response = await fetch(API_COLLECTIONS_URL);
          if (response.ok) {
            const CollectionJson = await response.json();
            setCollections(CollectionJson);
          } else {
            throw response;
          }
        } catch (e) {
          setError("An error occured...");
          console.log("An error occured: ", e);
        } finally {
          setLoading(false);
        }
      }
      loadCollections();
    }, [])

  // update the collection
  // const updateCollectionID = (e) => {
  //   const collectionSelected = collections.find((collection) => collection.name === e.target.value)
  //   setCollectionID(collections.find((collection) => collection.name === e.target.value).id);
  // }

  // When submit, to save the new recipe in the DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_RECIPES_URL,
                                  { method: 'POST',
                                    headers: { 'Content-Type': 'application/json'},
                                    body: JSON.stringify({ "recipe": {name, nb_people, prepa_time, cooking_time, instructions, collection_id} })
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
    <div className='RecipeNew'>
      <h2>Ajouter une nouvelle recette à votre carnet :</h2>
      <form action='submit' onSubmit={handleSubmit} id='RecipeNewForm'>
        <input type='text' name='name' key="name" placeholder='Nom de la nouvelle recette...' className='recipeInput' onChange={(e) => setName(e.target.value)} />
        <select name="collection" id="collection" key="collection" className='recipeInput' onChange={(e) => setCollectionID(collections.find((collection) => collection.name === e.target.value).id)}>
          <option value="" key="defaultOption">Sélectionner une catégorie...</option>
          {collections.map((collection) => (
            <option value={collection.name} params={collection.id} key={collection.id}>{collection.name}</option>
          ))}
        </select>
        <input type='integer' name='nb_people' key="nbPeople" placeholder='Nombre de personnes...' className='recipeInput' onChange={(e) => setNbPeople(parseInt(e.target.value, 10))} />
        <input type='integer' name='prepa_time' key="prepa_time" placeholder='Temps de préparation...' className='recipeInput' onChange={(e) => setPrepaTime(parseInt(e.target.value, 10))} />
        <input type='integer' name='cooking_time' key="cookingTime" placeholder='Temps de cuisson...' className='recipeInput' onChange={(e) => setCookingTime(parseInt(e.target.value, 10))} />
        <textarea name="instructions" id="instruction" col="10" row="3" key="instructions" placeholder='La recette...' className='recipeInput' onChange={(e) => setInstructions(e.target.value)}></textarea>
        <button type='submit' className='yellowbtn'>Ajouter la recette</button>
      </form>
    </div>
  )
}

export default RecipeNew;
