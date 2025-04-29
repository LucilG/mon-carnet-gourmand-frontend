import '../../styles/recipes/RecipeShow.css';
import React, { useEffect, useState } from 'react';
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
  const [nbPeople, setNbPeople] = useState(1);

  // when params[:id] changes, load recipe's details
  useEffect(() => {
    fetchOneRecipe(id);
    fetchIngredients(id);
    oneRecipe && setNbPeople(oneRecipe.nb_people);
  }, [id]);

  // number of people
  const addNbPeople = () => {
    setNbPeople(nbPeople + 1);
  };
  const removeNbPeople = () => {
    nbPeople > 1 && setNbPeople(nbPeople - 1);
  };

  // recipe conten
  let content = <div />
  if (oneRecipe === null || isLoadingRecipes === true ) {
    content = <div className="container-page"><h2>Loading...</h2></div>
  } else if (errorRecipes) {
    content = <div className="container-page"><h2>Error while loading recipe...</h2></div>
  } else {
    content =
      <div className='RecipeShow'>

        {/* Recipe's banner : general informations */}
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

        {/* Ingredients */}
        <div className="RecipeShowIngredients">
          <div className="RecipeShowIngredientsNbPeople">
            <FaUsers  alt="number of people" />
            <p onClick={removeNbPeople}>-</p>
            <p>{nbPeople}</p>
            <p onClick={addNbPeople}>+</p>
          </div>
          <p>Ingredients :</p>
          <ul>
            {ingredients.map((ingredient) => {
              let quantity = Math.trunc(ingredient.quantity * nbPeople / oneRecipe.nb_people);
              // let quantity = (ingredient.quantity * nbPeople / oneRecipe.nb_people).toFixed(1);
              quantity = quantity === 0 ? 1 : quantity;
              if (["a", "e", "i", "o", "u", "y"].includes(ingredient.name[0])) {
                return <li key={ingredient.id}>{quantity} {ingredient.unit} d'{ingredient.name}</li>
              } else {
                return <li key={ingredient.id}>{quantity} {ingredient.unit} de {ingredient.name}</li>
              }
            })}
          </ul>
        </div>

          {/* Recipe's instructions */}
        <div className="RecipeShowInstructions">
          <p>Instructions : </p>
          <p>{oneRecipe.instructions}</p>
        </div>
      </div>
  }


  return (
    <div className="container-page">
      {/* go back button */}
      <Link to={COLLECTIONS_PATH} className='gobackbtn'>
        <FaArrowLeft />
        <p>Go Back</p>
      </Link>

      {/* recipe content */}
      {content}
    </div>
  )
}

export default RecipeShow;
