import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
// source: https://www.youtube.com/watch?v=VzWBLj_CfpE&ab_channel=BrianDesign
function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    


    <>
    
      <nav className='navbar'>
        <Link to='/signup' className='navbar-logo' onClick={closeMobileMenu}>
        <img src={require('./logo.png')} width="170px"/>
        </Link>

       
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

          <li className='nav-item'>
            <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
              Profile
            </Link>

          </li>


          <li className='nav-item'>
            <Link to='/createTimetable' className='nav-links' onClick={closeMobileMenu}>
              Create
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to='/SearchPost'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Search
            </Link>
          </li>

          {/* <li className='nav-item'>
            <Link
              to='/'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Groups
            </Link>
          </li> */}
          
          <li>
            <Link
              to='/'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Logout
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;