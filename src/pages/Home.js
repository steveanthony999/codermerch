import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
  return (
    <div className='Home'>
      {/* TITLE */}
      {/* TITLE */}
      {/* TITLE */}
      <h1 className='Home-title'>coderMerch</h1>
      {/* BOX */}
      {/* BOX */}
      {/* BOX */}
      <div className='box'>
        <span></span>
        <div className='content'>
          <h2>Card One</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to='/'>Details</Link>
        </div>
      </div>

      <div className='box'>
        <span></span>
        <div className='content'>
          <h2>Card One</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to='/'>Details</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
