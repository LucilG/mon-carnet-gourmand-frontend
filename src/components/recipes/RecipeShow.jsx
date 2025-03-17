import '../../styles/recipes/RecipeShow.css';
import React, { useState, useEffect } from 'react';
import { API_RECIPE_URL } from '../../api/constantsAPI';
import { useParams } from 'react-router';
import { FaFileArrowDown, FaUsers } from "react-icons/fa6";
import IconePrepaTime from '../../assets/icone_prepa_time.png';
import IconeCookingTime from '../../assets/icone_cooking_time.png';
import IconeTotalTime from '../../assets/icone_total_time.png';

function RecipeShow() {
  const [recipe, setRecipe] = useState(null)
  const { id } = useParams();
  const [, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load recipe's information
  async function loadRecipeDetails() {
    try {
      const response = await fetch(`${API_RECIPE_URL}/${id}`);
      if (response.ok) {
        const RecipeJson = await response.json();
        setRecipe(RecipeJson);
      } else {
        throw response;
      }
    } catch (e) {
      setError("An error occured...");
      console.log("An error occured: ", e);
    } finally {
      setLoading(false);
    }
  };

  // when params[:id] changes, load recipe's details
  useEffect(() => {
    loadRecipeDetails();
  }, [id])

  if (recipe === null || loading === true ) return <div className="RecipeShow"><h2>Loading...</h2></div>

  return (
    <div className="RecipeShow">
      <div className="RecipeShowBanner">
        <div className="RecipeShowBannerInfos">
          <h2>{recipe.name.toUpperCase()}</h2>
          <div className="RecipeShowBannerSubIcones">
            <div className='RecipeShowBannerSubInfos'>
              <img src={IconeTotalTime} alt="total time" className='RecipeShowIcone'/>
              <p>Temps total : {recipe.prepa_time + recipe.cooking_time} min.</p>
            </div>
            <div className='RecipeShowBannerSubInfos'>
              <img src={IconePrepaTime} alt="preparation time" className='RecipeShowIcone'/>
              <p>Préparation : {recipe.prepa_time} min.</p>
            </div>
            <div className='RecipeShowBannerSubInfos'>
              <img src={IconeCookingTime} alt="cooking time" className='RecipeShowIcone'/>
              <p>Cuisson : {recipe.cooking_time} min.</p>
            </div>
          </div>
        </div>
        <FaFileArrowDown alt="download file" />
      </div>
      <div className="RecipeShowIngredients">
        <div className="RecipeShowIngredientsNbPeople">
          <FaUsers  alt="number of people" />
          <p>-</p>
          <p>{recipe.nb_people}</p>
          <p>+</p>
        </div>
        <p>Ingredients :</p>
        <p>TO DO...</p>
      </div>
      <div className="RecipeShowInstructions">
        <p>Instructions : </p>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  )
}

export default RecipeShow;
