import './App.css'
import './styles/Colors.css';
import './styles/Buttons.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import { ROOT_PATH } from './constants';

function App() {
  // (dark/light) theme mode which takes by default the local config
  const preferences = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(preferences);

  useEffect(() => {
    setDarkMode(preferences);
}, []);

  return (
    <Router>
      <div className='App' data-theme={darkMode ? 'dark' : 'light'}>
        <NavBar setDarkMode={setDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path={ROOT_PATH} element={<HomePage />} />
          {/* <Route path='/recipes' element={<RecipesList collection={selectedCollection} />} /> */}
          {/* <Route path='/recipes/:id' element={<RecipeShow />} /> */}
          {/* <Route path='/recipes/new' element={<RecipeNew />} /> */}
          {/* <Route path='/collections' element={<CollectionsList setSelectedCollection={setSelectedCollection}/>} /> */}
          {/* <Route path='/collections/new' element={<CollectionNew />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
