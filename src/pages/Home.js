import { useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import './Home.css';

const url =
  'https://codermerch.us14.list-manage.com/subscribe/post?u=664a41c1d6f78be699ec13cd0&amp;id=8e0d088b73';

const SimpleForm = () => <MailchimpSubscribe url={url} />;

const Home = () => {
  useEffect(() => {
    document.querySelector('input[type="email"]').placeholder =
      'Enter your email';
  }, []);

  return (
    <div className='Home'>
      <h1 className='Home-title'>coderMerch</h1>
      <h2 className='Home-subtitle'>First drop - 03.02.2022</h2>
      <div className='Home-container'>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <div className='signup-form'>
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
  );
};

export default Home;
