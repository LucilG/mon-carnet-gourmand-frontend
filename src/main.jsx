import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CollectionsContext, {ProviderCollections} from './context/collections.jsx'
import RecipesContext, { ProviderRecipes } from './context/recipes.jsx'
import IngredientsContext, {ProviderIngredients} from './context/ingredients.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProviderCollections context={CollectionsContext}>
      <ProviderRecipes context={RecipesContext}>
        <ProviderIngredients context={IngredientsContext}>
          <App />
        </ProviderIngredients>
      </ProviderRecipes>
    </ProviderCollections>
  </StrictMode>,
)
