import '../styles/NavBar.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoHome, IoAddCircle, IoBook, IoMenu } from "react-icons/io5";
import NavbarBtn from './NavbarBtn';
import { ROOT_PATH, ADD_RECIPE_PATH, COLLECTIONS_PATH } from '../constants';
import { PiChefHatBold } from "react-icons/pi";

function NavBar({setDarkMode, darkMode}) {
  const [activePage, setActivePage] = useState(document.location.pathname);

  const handleActivePage = (page) => {
    setDisplayMenu(false);
    setActivePage(page);
  };

  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <header className="NavBar">
      {/* Logo + name */}
      <Link to={ROOT_PATH} id='NavbarLogoAndName'>
          <PiChefHatBold alt='logo' id="NavbarLogo"/>
          <h2>Mon Carnet Gourmand</h2>
      </Link>

      {/* menu */}
      <div className='menuContainer'>
        <div className='linkBtns'>
          {/* Burger menu button + Toogle button for dark/light mode*/}
          <IoMenu alt="menu" onClick={() => setDisplayMenu(!displayMenu)} />
          { darkMode ? <MdOutlineDarkMode onClick={() => setDarkMode(!darkMode)} /> : <MdOutlineLightMode onClick={() => setDarkMode(!darkMode)} className='iconDarkMode' />}
        </div>

        { displayMenu &&
          <div className="dropdownMenu" >
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
          </div>
        }
      </div>

    </header>
  );
}

export default NavBar;
