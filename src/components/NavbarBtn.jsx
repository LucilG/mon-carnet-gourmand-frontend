import { Link } from 'react-router';
import React from 'react';
import "../styles/NavbarBtn.css"

function NavbarBtn({ path, icon, text, activePage, handleActivePage}) {


  return (
    <Link to={path} className={activePage === path ? "link-btn activePage" : "link-btn"} onClick={() => handleActivePage(path)}>
      {icon}
      <p>{text}</p>
    </Link>
  )
}

export default NavbarBtn;
