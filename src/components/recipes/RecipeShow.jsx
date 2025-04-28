import '../../styles/recipes/RecipeShow.css';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { FaFileArrowDown, FaUsers, FaArrowLeft } from "react-icons/fa6";
import IconePrepaTime from '../../assets/icone_prepa_time.png';
import IconeCookingTime from '../../assets/icone_cooking_time.png';
import IconeTotalTime from '../../assets/icone_total_time.png';
import { COLLECTIONS_PATH } from '../../constants';
import useRecipesContext from '../../hooks/use-recipes-context';
import useIngredientsContext from '../../hooks/use-ingredients-context';

function RecipeShow() {
  const { id } = useParams();

  const { oneRecipe, isLoadingRecipes, errorRecipes, fetchOneRecipe } = useRecipesContext();
  const { ingredients, fetchIngredients } = useIngredientsContext();

  // when params[:id] changes, load recipe's details
  useEffect(() => {
    console.log(id);
    fetchOneRecipe(id);
    fetchIngredients(id);
    console.log("ingredients: ");
    console.log(ingredients);
  }, [id])

  let content = <div />

  if (oneRecipe === null || isLoadingRecipes === true ) {
    content = <div className="container-page"><h2>Loading...</h2></div>
  } else if (errorRecipes) {
    content = <div className="container-page"><h2>Error while loading recipe...</h2></div>
  } else {
    content =
      <div className='RecipeShow'>
        <div className="RecipeShowBanner">
          <div className="RecipeShowBannerInfos">
            <h2>{oneRecipe.name.toUpperCase()}</h2>
            <div className="RecipeShowBannerSubIcones">
              <div className='RecipeShowBannerSubInfos'>
                <img src={IconeTotalTime} alt="total time" className='RecipeShowIcone'/>
                <p>Temps total : {oneRecipe.prepa_time + oneRecipe.cooking_time} min.</p>
              </div>
              <div className='RecipeShowBannerSubInfos'>
                <img src={IconePrepaTime} alt="preparation time" className='RecipeShowIcone'/>
                <p>Préparation : {oneRecipe.prepa_time} min.</p>
              </div>
              <div className='RecipeShowBannerSubInfos'>
                <img src={IconeCookingTime} alt="cooking time" className='RecipeShowIcone'/>
                <p>Cuisson : {oneRecipe.cooking_time} min.</p>
              </div>
            </div>
          </div>
          <FaFileArrowDown alt="download file" />
        </div>

        <div className="RecipeShowIngredients">
          <div className="RecipeShowIngredientsNbPeople">
            <FaUsers  alt="number of people" />
            <p>-</p>
            <p>{oneRecipe.nb_people}</p>
            <p>+</p>
          </div>
          <p>Ingredients :</p>
          <ul>
            {ingredients.map((ingredient) => {
              if (["a", "e", "i", "o", "u", "y"].includes(ingredient.name[0])) {
                return <li>{ingredient.quantity} {ingredient.unit} d'{ingredient.name}</li>
              } else {
                return <li>{ingredient.quantity} {ingredient.unit} de {ingredient.name}</li>
              }
            })}
          </ul>
        </div>

        <div className="RecipeShowInstructions">
          <p>Instructions : </p>
          <p>{oneRecipe.instructions}</p>
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
