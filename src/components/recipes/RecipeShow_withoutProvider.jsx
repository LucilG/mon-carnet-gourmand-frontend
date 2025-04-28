import '../../styles/recipes/RecipeShow.css';
import React, { useState, useEffect } from 'react';
import { API_RECIPES_URL } from '../../api/constantsAPI';
import { useParams } from 'react-router';
import { FaFileArrowDown, FaUsers, FaArrowLeft } from "react-icons/fa6";
import IconePrepaTime from '../../assets/icone_prepa_time.png';
import IconeCookingTime from '../../assets/icone_cooking_time.png';
import IconeTotalTime from '../../assets/icone_total_time.png';
import { fetchData } from '../../api/fetchData';
import { COLLECTIONS_PATH } from '../../constants';
import { Link } from "react-router-dom";

function RecipeShow() {
  const [recipe, setRecipe] = useState(null)
  const { id } = useParams();
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load recipe's information
  const loadRecipe = async () => {
    try {
      const response = await fetchData(`${API_RECIPES_URL}/${id}`);
      setRecipe(response);
    } catch (error) {
      setError(true);
      console.error("An error occured: ", error);
    } finally {
      setLoading(false);
    }
  };


  // when params[:id] changes, load recipe's details
  useEffect(() => {
    // loadRecipeDetails();
    loadRecipe();
  }, [id])

  let content = <div />

  if (recipe === null || loading === true ) {
    content = <div className="container-page"><h2>Loading...</h2></div>
  } else if (error) {
    content = <div className="container-page"><h2>Error while loading recipe...</h2></div>
  } else {
    content =
      <div className='RecipeShow'>
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
  }


  return (
    <div className="container-page">
      <Link to={COLLECTIONS_PATH} className='gobackbtn'>
        <FaArrowLeft />
        <p>Go Back</p>
      </Link>

      {content}
    </div>
  )
}

export default RecipeShow;
