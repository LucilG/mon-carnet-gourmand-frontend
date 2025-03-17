import '../../styles/recipes/RecipeCard.css';
import React from 'react';
import { Link } from "react-router-dom"
import IconeNbPeople from '../../assets/icone_prepa_time.png';
import IconePrepaTime from '../../assets/icone_prepa_time.png';
import IconeCookingTime from '../../assets/icone_cooking_time.png';

function RecipeCard({recipe}) {
  return (
    <Link to={"/recipes/" + recipe.id} className="RecipeCard">
      <h2>{recipe.name.toUpperCase()}</h2>
      <div className='RecipeCardInfo'>
        <img src={IconeNbPeople} alt="number of people" className='RecipeCardIcone'/>
        <p>{recipe.nb_people} min.</p>
      </div>
      <div className='RecipeCardInfo'>
        <img src={IconePrepaTime} alt="preparation time" className='RecipeCardIcone'/>
        <p>{recipe.prepa_time} min.</p>
      </div>
      <div className='RecipeCardInfo'>
        <img src={IconeCookingTime} alt="cooking time" className='RecipeCardIcone'/>
        <p>{recipe.cooking_time} min.</p>
      </div>
    </Link>
  )
}

export default RecipeCard;
