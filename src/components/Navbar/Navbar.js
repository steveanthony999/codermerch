import './Navbar.css';

import logo from '../../assets/logo_1.png';

const Navbar = () => {
  return (
    <nav className='Navbar'>
      {/* <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography variant='h6' className={classes.title} color='inherit'>
            <img
              src={logo}
              alt='coder_merch'
              height='25px'
              className={classes.image}
            />
            coderMerch
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label='show cart items' color='inherit'>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar> */}
    </nav>
  );
};

export default Navbar;
