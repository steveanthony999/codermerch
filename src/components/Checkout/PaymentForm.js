import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { motion } from 'framer-motion';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { commerce } from '../../lib/commerce';

import './PaymentForm.css';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_LIVE);

const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  nextStep,
  onCaptureCheckout,
  discountCode,
}) => {
  const [totalCart, setTotalCart] = useState(null);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.streetAddress,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        billing: {
          name: 'Primary',
          street: shippingData.streetAddress,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  useEffect(() => {
    commerce.checkout
      .checkDiscount(checkoutToken.id, { code: discountCode })
      .then((res) => setTotalCart(res));
  }, []);

  return (
    <div className='PaymentForm'>
      <Review checkoutToken={checkoutToken} price={totalCart} />
      <hr />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div className='PaymentForm-footer'>
                <div onClick={backStep} className='PaymentForm-back'>
                  <ArrowBackOutlinedIcon />
                </div>
                <motion.button
                  className='PaymentForm-btn'
                  type='submit'
                  disabled={!stripe}
                  whileHover={{
                    scale: 1.01,
                    transition: {
                      duration: 0.1,
                      type: 'spring',
                    },
                  }}
                >
                  {/* Pay {checkoutToken.live.subtotal.formatted_with_symbol} */}
                  Pay
                  {totalCart === null
                    ? checkoutToken.live.subtotal.formatted_with_symbol
                    : totalCart.live.total.formatted_with_symbol}
                </motion.button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
