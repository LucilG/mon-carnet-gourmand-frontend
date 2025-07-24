import '../../styles/recipes/RecipeNew.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API_RECIPES_URL, API_COLLECTIONS_URL } from '../../api/constantsAPI';
import useCollectionsContext from '../../hooks/use-collections-context';
import useRecipesContext from '../../hooks/use-recipes-context';

function RecipeNew() {
  const [name, setName] = useState('');
  const [nb_people, setNbPeople] = useState(0);
  const [prepa_time, setPrepaTime] = useState(0);
  const [cooking_time, setCookingTime] = useState(0);
  const [instructions, setInstructions] = useState('');
  const [collection_id, setCollectionID] = useState(0);
  const navigate = useNavigate();

  const { collections } = useCollectionsContext();
  const { createRecipe, isLoadingRecipes, errorRecipes} = useRecipesContext();

  const [currentIngredient, setCurrentIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  // When submit, to save the new recipe in the DB
  const handleSubmitRecipe = async (e) => {
    e.preventDefault();
    createRecipe({name, nb_people, prepa_time, cooking_time, instructions, collection_id});
    if (!isLoadingRecipes && (errorRecipes === null)) {
      navigate(`/collections`);
    }
  }

  // when add a new ingredient, to save a new ingredient
  const addIngredient = () => {
    console.log("ingredients before set: ");
    console.log(ingredients);
    const updatedIngredients = [...ingredients, currentIngredient];
    console.log("updatedIngredients: ");
    console.log(updatedIngredients);
    setIngredients(updatedIngredients);
    console.log("ingredients after set: ");
    console.log(ingredients);
    console.log("ingredients.length", ingredients.length);
  }

  // display all the ingredients of the recipe
  const ingredientsTest = ["sucre", "choco"];
  // let ingredientsList = <div />
  // if (ingredientsTest.length > 0) {
  //   ingredientsList = <div>
  //     {ingredientsTest.map((element) => {
  //       <p key={element}>{element}</p>
  //     })}
  //   </div>
  // }

  return (
    <div className='RecipeNew'>
      <h2>Ajouter une nouvelle recette à votre carnet :</h2>
      <form action='submit' onSubmit={handleSubmitRecipe} id='RecipeNewForm'>
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



      {/* ingredients */}
      <input type="text" name="ingredientInputName" key="ingredientInput" placeholder='Nouvel ingrédient...' onChange={(e) => { setCurrentIngredient(e.target.value); console.log("currentIngredient ", currentIngredient);}}/>
      <button onClick={addIngredient}>Ajouter l'ingrédient</button>
      <p>Ingrédients ajoutés :</p>
      {/* {ingredientsList} */}
      <ul>
        {ingredientsTest.map((element) => {
          <li key={element}>{element}</li>
        })}
      </ul>
    </div>
  )
}

export default RecipeNew;
