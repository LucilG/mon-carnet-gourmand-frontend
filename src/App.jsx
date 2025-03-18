import './App.css'
import './styles/Colors.css';
import './styles/Buttons.css';
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import { ROOT_PATH, COLLECTIONS_PATH, RECIPES_PATH, COLLECTION_NEW_PATH, RECIPES_NEW_PATH, RECIPES_SHOW_PATH } from './constants';
import CollectionsList from './components/collections/CollectionsList';
import RecipesList from './components/recipes/RecipesList';
import CollectionNew from './components/collections/CollectionNew';
import RecipeNew from './components/recipes/RecipeNew';
import RecipeShow from './components/recipes/RecipeShow';
import CollectionsContext from './context/collections';

function App() {
  // (dark/light) theme mode which takes by default the local config
  const preferences = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(preferences);
  useEffect(() => {
    setDarkMode(preferences);
  }, []);

  // fetch to the json server when refreshing the page
  const { fetchCollections } = useContext(CollectionsContext);
  useEffect(()=> {
    fetchCollections();
    return () => fetchCollections();
  }, []);

  return (
    <Router>
      <div className='App' data-theme={darkMode ? 'dark' : 'light'}>
        <NavBar setDarkMode={setDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path={ROOT_PATH} element={<HomePage />} />
          <Route path={RECIPES_PATH} element={<RecipesList />} />
          <Route path={RECIPES_SHOW_PATH} element={<RecipeShow />} />
          <Route path={RECIPES_NEW_PATH} element={<RecipeNew />} />
          <Route path={COLLECTIONS_PATH} element={<CollectionsList />} />
          <Route path={COLLECTION_NEW_PATH} element={<CollectionNew />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
