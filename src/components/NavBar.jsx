import '../styles/NavBar.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom"
import Logo from '../assets/icone_mon_carnet_gourmand_bluegreen.png'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoHome, IoAddCircle, IoBook } from "react-icons/io5";
import NavbarBtn from './NavbarBtn';
import { ROOT_PATH, ADD_RECIPE_PATH, COLLECTIONS_PATH } from '../constants';

function NavBar({setDarkMode, darkMode}) {


  const [activePage, setActivePage] = useState(document.location.pathname);

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <header className="NavBar">
      {/* Logo + name */}
      <div id='NavbarLogoAndName'>
        <img src={Logo} alt='logo' id="NavbarLogo"></img>
        <h2>Mon Carnet Gourmand</h2>
      </div>

      {/* menu */}
      <nav className='linkBtns'>
        <NavbarBtn
          path={ROOT_PATH}
          icon={<IoHome alt="homepage"/>}
          text='Accueil'
          activePage={activePage}
          handleActivePage={handleActivePage}
        />
        <NavbarBtn
        path={COLLECTIONS_PATH}
        icon={<IoBook alt="recipes book"/>}
        text='Mon carnet'
        activePage={activePage}
        handleActivePage={handleActivePage}
        />
        <NavbarBtn
        path={ADD_RECIPE_PATH}
        icon={<IoAddCircle alt="Add a recipe"/>}
        text='Ajouter une recette'
        activePage={activePage}
        handleActivePage={handleActivePage}
        />
      </nav>

      {/* Toogle button for dark/light mode */}
      { darkMode ? <MdOutlineDarkMode onClick={() => setDarkMode(!darkMode)} className='iconDarkMode' /> : <MdOutlineLightMode onClick={() => setDarkMode(!darkMode)} className='iconDarkMode' />}
    </header>
  );
}

export default NavBar;
