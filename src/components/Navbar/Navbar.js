import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingBag, faBars } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useMobileMenu, useMobileMenuUpdate } from '../../MobileMenuContext';

import './Navbar.css';

import logo from '../../assets/logo_1.png';
import logoSmall from '../../assets/logo_1_small.png';
import closeMenu from '../../assets/close_mobile.png';

const Navbar = ({ cart }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1024px)' });

  const menuOpen = useMobileMenu();
  const toggleMenu = useMobileMenuUpdate();

  return (
    <nav className='Navbar'>
      {isSmallScreen ? (
        <div onClick={toggleMenu} className='Navbar-container'>
          <div className='Navbar-container-left'>
            {menuOpen ? (
              <img src={closeMenu} alt='cm' height={'16px'} />
            ) : (
              <img src={logoSmall} alt='cm' height={'16px'} />
            )}
          </div>
          <div className='Navbar-container-right'>
            <Link to='/cart'>
              <FontAwesomeIcon
                icon={faShoppingBag}
                size={isSmallScreen ? '1x' : '2x'}
              />
              <p>(&nbsp;{cart}&nbsp;)</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className='Navbar-container'>
          <div className='Navbar-container-left'>
            <Link to='/'>
              <img src={logo} alt='coder_merch' height={'24px'} />
            </Link>
          </div>
          {isSmallScreen ? null : (
            <div className='Navbar-container-center'>
              <Link to='/'>HOME</Link>
              <Link to='/products'>SHOP</Link>
            </div>
          )}
          <div className='Navbar-container-right'>
            <Link to='/cart'>
              <FontAwesomeIcon
                icon={faShoppingBag}
                size={isSmallScreen ? '1x' : '2x'}
              />
              <p>(&nbsp;{cart}&nbsp;)</p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
