import '../../styles/recipes/RecipesList.css';
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { API_COLLECTIONS_URL } from '../../api/constantsAPI';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { COLLECTIONS_PATH } from '../../constants';
import useRecipesContext from '../../hooks/use-recipes-context';
import useCollectionsContext from '../../hooks/use-collections-context';
import { fetchData } from '../../api/fetchData';

function RecipesList() {
  const { selectedCollection } = useCollectionsContext();
  const { recipes, isLoadingRecipes, errorRecipes, fetchRecipes } = useRecipesContext();

  const [collectionName, setCollectionName] = useState("Toutes mes recettes");
  const [isLoadingCollectionName, setLoadingCollectionName] = useState(true);
  const [errorCollectionName, setErrorCollectionName] = useState(null);

  // fetch the name of the current collection from the API
  const loadCollectionName = async () => {
    try {
      const urlCollection = (selectedCollection === "all") ? `${API_COLLECTIONS_URL}` : `${API_COLLECTIONS_URL}/${selectedCollection}`;
      const response = await fetchData(urlCollection);
      (selectedCollection === "all") ? setCollectionName("Toutes mes recettes") : setCollectionName(response.name);
    } catch (error) {
      setErrorCollectionName(error);
      // console.error("An error occured: ", error);
    } finally {
      setLoadingCollectionName(false);
    }
  };

  // fetch the recipes and the current collection name from the API
  useEffect(() => {
    fetchRecipes();
    loadCollectionName();
    return () => {
      fetchRecipes();
      loadCollectionName();
    }
  }, [])

  // selection of the recipes to display according to the collection
  const selectionRecipes = (selectedCollection === "all") ? recipes : recipes.filter((recipe) => (recipe.collection_id).toString() === selectedCollection.toString());

  // display the content of the recipes list
  let recipesListContent = <div />
  if (isLoadingRecipes) {
    recipesListContent = <div><p>Loading recipes...</p></div>
  } else if (errorRecipes) {
    recipesListContent = <div><p>Error while fetching recipes... {errorRecipes.message}</p></div>
  } else {
    recipesListContent = <div className="RecipesList">
      {selectionRecipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div>
  }

  return (
    <div className='container-page'>
      <Link to={COLLECTIONS_PATH} className='gobackbtn'>
        <FaArrowLeft />
        <p>Go Back</p>
      </Link>

      { !isLoadingCollectionName && <h1 className='recipesListName'>{collectionName.charAt(0).toUpperCase() + collectionName.slice(1).toLowerCase()}</h1>}
      { recipesListContent }
    </div>
  )
}

export default RecipesList;
