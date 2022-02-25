import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import './Navbar.css';

import logo from '../../assets/logo_1.png';
import logoSmall from '../../assets/logo_1_small.png';

const Navbar = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <nav className='Navbar'>
      <div className='Navbar-container'>
        <div className='Navbar-container-left'>
          <Link to='/'>
            <img
              src={isSmallScreen ? logoSmall : logo}
              alt='coder_merch'
              height={isSmallScreen ? '16px' : '24px'}
            />
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
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
