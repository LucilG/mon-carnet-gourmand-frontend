import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CollectionsContext, {ProviderCollections} from './context/collections.jsx'
import RecipesContext, { ProviderRecipes } from './context/recipes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProviderCollections context={CollectionsContext}>
      <ProviderRecipes context={RecipesContext}>
        <App />
      </ProviderRecipes>
    </ProviderCollections>
  </StrictMode>,
)
