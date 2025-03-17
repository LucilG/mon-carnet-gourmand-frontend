import '../../styles/recipes/RecipesList.css';
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { API_RECIPE_URL, API_COLLECTION_URL } from '../../api/constantsAPI';
import { fetchData } from '../../api/fetchData';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { COLLECTIONS_PATH } from '../../constants';

function RecipesList({collection}) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [isLoadingRecipes, setLoadingRecipes] = useState(true);
  const [ErrorRecipes, setErrorRecipes] = useState(false);

  const [collectionName, setCollectionName] = useState([]);
  const [isLoadingCollectionName, setLoadingCollectionName] = useState(true);
  const [ErrorCollectionName, setErrorCollectionName] = useState(false);

  //fetch the recipes from the API
  const loadRecipes = async () => {
    try {
      const response = await fetchData(API_RECIPE_URL);
      setRecipes(response);
      setSelectedRecipes((collection === "all") ? response : response.filter((recipe) => (recipe.collection_id).toString() === collection.toString()));
    } catch (error) {
      setErrorRecipes(true);
      console.error("An error occured: ", error);
    } finally {
      setLoadingRecipes(false);
    }
  };

  // fetch the name of the current collection from the API
  const loadCollectionName = async () => {
    try {
      const urlCollection = (collection === "all") ? `${API_COLLECTION_URL}` : `${API_COLLECTION_URL}/${collection}`;
      const response = await fetchData(urlCollection);
      (collection === "all") ? setCollectionName("Toutes mes recettes") : setCollectionName(response.name);
    } catch (error) {
      setErrorCollectionName(true);
      console.error("An error occured: ", error);
    } finally {
      setLoadingCollectionName(false);
    }
  };

  //fetch the recipes and the current collection name from the API
  useEffect(() => {
    loadRecipes();
    loadCollectionName();
  }, [])

  // display the content of the recipes list
  let recipesListContent = <div />
  if (isLoadingRecipes) {
    recipesListContent = <div><p>Loading recipes...</p></div>
  } else if (ErrorRecipes) {
    recipesListContent = <div><p>Error while fetching recipes...</p></div>
  } else {
    recipesListContent = <div className="RecipesList">
      {selectedRecipes.map((recipe) => (
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
