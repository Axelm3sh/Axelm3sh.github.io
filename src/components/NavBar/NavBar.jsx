import React from 'react';
import './NavBar.css';

const NavButton = ({name}) => <li><button>{name}</button></li>;
function NavBar() {
  const navItems = ['Home', 'About', 'Projects'];
    
  return (
    <header>
      <nav>
        <ul>
          {navItems.map((item, index) => <NavButton key={index} name={item}></NavButton>)}
          {/* Add more navigation buttons as needed */} 
        </ul>
      </nav>
    </header>
  );
}



export default NavBar;