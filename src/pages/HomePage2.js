import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { useMediaQuery } from 'react-responsive';

import { commerce } from '../lib/commerce';

import Product from '../components/Products/Product';

import HeroImg from '../assets/banner.png';
import HeroImgSmall from '../assets/banner_small.png';
import ShashiPhoto from '../assets/shashi.jpeg';

import './HomePage2.css';

const url =
  'https://codermerch.us14.list-manage.com/subscribe/post?u=664a41c1d6f78be699ec13cd0&amp;id=8e0d088b73';

const SimpleForm = () => <MailchimpSubscribe url={url} />;

const HomePage2 = () => {
  const [featuredItems, setFeaturedItems] = useState();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isExtraSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setFeaturedItems(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    document.querySelector('input[type="email"]').placeholder =
      'Subscribe to the Newsletter';
  }, []);

  return (
    <div className='HomePage2'>
      {/* HERO */}
      <div
        className='HomePage-hero'
        style={{
          background: `url(${
            isExtraSmallScreen ? HeroImgSmall : HeroImg
          }) no-repeat center center/cover`,
        }}
      >
        <div className='HomePage-hero-container'>
          <h1>Break Into Tech</h1>
          <h2>and look good while you're at it</h2>
          <button className='btn-glow'>
            <Link to='/products'>
              {isSmallScreen ? 'shop' : 'shop #shashigang'}
            </Link>
          </button>
        </div>
      </div>
      {/* FEATURED ITEMS */}
      <div className='HomePage-featured'>
        <div className='HomePage-featured-top'>
          <h1>Featured Items</h1>
        </div>
        <div className='HomePage-featured-middle'>
          {featuredItems &&
            featuredItems.map(
              (product) =>
                product.categories.length !== 0 && (
                  <Product product={product} key={product.id} />
                )
            )}
        </div>
      </div>
      {/* SUBSCRIBE */}
      <div className='HomePage-drop-info'>
        <h4>mid-drop 03.18.2022</h4>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <div className='HomePage-signup-form'>
              <SimpleForm onSubmitted={(formData) => subscribe(formData)} />
              {status === 'sending' && (
                <div style={{ color: 'white' }}>sending...</div>
              )}
              {status === 'error' && (
                <div
                  style={{ color: 'white' }}
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              )}
              {status === 'success' && (
                <div style={{ color: 'white' }}>Subscribed !</div>
              )}
            </div>
          )}
        />
      </div>
      {/* FEATURED DEV */}
      <div className='HomePage-inner-container'>
        <div className='HomePage-inner-inner'>
          <img src={ShashiPhoto} alt='shashi' className='HomePage-main-photo' />
          <div className='HomePage-inner-container-right'>
            <h3>Dev Spotlight</h3>
            <p>
              On behalf of the{' '}
              <a
                href='https://twitter.com/search?q=%23techtwitter&src=typed_query'
                target='_blank'
                rel='noreferrer'
              >
                #techtwitter
              </a>{' '}
              community, coderMerch would like to shout-out{' '}
              <a
                href='https://twitter.com/shashiwhocodes'
                target='_blank'
                rel='noreferrer'
              >
                Shashi Lo
              </a>
              ! Shashi is a senior UI engineer who's passion is helping junior
              developers break into tech. His advice to all aspiring developers
              is clear, straight-forward, and friendly! He’s quick to answer any
              questions anyone has and makes the process easier to understand
              and much, much more enjoyable! I’ve even had that feeling of
              renewed inspiration after receiving his guidance on certain
              questions I had.
              <br />
              <br />
              His enthusiasm to help us juniors understand the process is more
              than evident, and because he’s just so damn cool, we want to be in
              close contact with him all the time, and this is where #shashigang
              comes from, and I’m more than happy and proud to be a member!
              <br />
              <br />
              <span style={{ fontStyle: 'italic' }}>Steve - coderMerch</span>
            </p>
            <button className='btn-glow'>
              <Link to='/products'>
                {isSmallScreen ? 'shop' : 'shop #shashigang'}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage2;
