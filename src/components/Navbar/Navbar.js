import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { ClassNames } from "@emotion/react";

const Navbar = () => {
  return (
    <>
      <AppBar position='fixed' className={ClassNames.appBar} color='inherit'>
      <Toolbar>
        <Typography variant='h6' className={classes.title} color='inherit'>
          <img src={} alt="coder merch" height='25px' className={ClassNames.image} />
          coderMerch
        </Typography>
      </Toolbar>

      </AppBar>
    </>
  );
};

export default Navbar;
