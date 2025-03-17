import React from 'react';
import '../styles/Homepage.css';
import { Link } from 'react-router';

function HomePage() {
  return (
    <div className='container-page'>
      <div className="banner">
        <h1>Bienvenue sur </h1>
        <h1 id="nomSiteBanner">Mon Carnet Gourmand</h1>
        <h2>votre livre de recettes personnel accessible partout !</h2>
        <Link to="/collections" className='greenbtn'>Voir mon carnet de recettes</Link>
      </div>
    </div>
  );
}

export default HomePage;
