import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './Navbar.css';

import logo from '../../assets/logo_1.png';

const Navbar = () => {
  return (
    <nav className='Navbar'>
      <div className='Navbar-container'>
        <Link to='/'>
          <img src={logo} alt='coder_merch' height='25px' />
        </Link>
        <div>
          <Link to='/cart'>
            <FontAwesomeIcon icon={faShoppingBag} size={'2x'} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
