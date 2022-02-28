import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useMobileMenu, useMobileMenuUpdate } from '../../MobileMenuContext';

import './MobileMenu.css';

const MobileMenu = () => {
  const menuOpen = useMobileMenu();
  const toggleMenu = useMobileMenuUpdate();

  return (
    <>
      {menuOpen ? (
        <motion.div
          className='MobileMenu'
          initial={{ x: '-110vw' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{
            x: '-110vw',
            transition: { duration: 0.5 },
          }}
        >
          <div className='MobileMenu-container'>
            <Link to='/' onClick={toggleMenu}>
              HOME
            </Link>
            <Link to='/products' onClick={toggleMenu}>
              SHOP
            </Link>
            <Link to='/cart' onClick={toggleMenu}>
              CART
            </Link>
            {/* <a
              href='https://www.instagram.com/lasvegasluxuryhometours/'
              target='_blank'
              rel='noreferrer'
              onClick={toggleMenu}
            >
              <img src={IgLogo} alt='instagram' width='29px' />
            </a> */}
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default MobileMenu;
