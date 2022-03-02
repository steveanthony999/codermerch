import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import ShashiPhoto from '../assets/shashi.jpeg';

import './HomePage.css';

const url =
  'https://codermerch.us14.list-manage.com/subscribe/post?u=664a41c1d6f78be699ec13cd0&amp;id=8e0d088b73';

const SimpleForm = () => <MailchimpSubscribe url={url} />;

const HomePage = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    document.querySelector('input[type="email"]').placeholder =
      'Subscribe to the Newsletter';
  }, []);

  return (
    <div className='HomePage'>
      <div className='HomePage-container'>
        <h1>#shashigang</h1>
        <div className='HomePage-inner-container'>
          <div className='HomePage-inner-inner'>
            <img
              src={ShashiPhoto}
              alt='shashi'
              className='HomePage-main-photo'
            />
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
                developers break into tech. His advice to all aspiring
                developers is clear, straight-forward, and friendly! He’s quick
                to answer any questions anyone has and makes the process easier
                to understand and much, much more enjoyable! I’ve even had that
                feeling of renewed inspiration after receiving his guidance on
                certain questions I had.
                <br />
                <br />
                His enthusiasm to help us juniors understand the process is more
                than evident, and because he’s just so damn cool, we want to be
                in close contact with him all the time, and this is where
                #shashigang comes from, and I’m more than happy and proud to be
                a member!
                <br />
                <br />
                <span style={{ fontStyle: 'italic' }}>Steve - coderMerch</span>
              </p>
              <button>
                <Link to='/products'>
                  {isSmallScreen ? 'shop' : 'shop #shashigang'}
                </Link>
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='HomePage-drop-info'>
          <h4>mid-drop 03.16.2022</h4>
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
      </div>
    </div>
  );
};

export default HomePage;
