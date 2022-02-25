import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@mui/material';

import AddressForm from '../components/Checkout/AddressForm';
import PaymentForm from '../components/Checkout/PaymentForm';

import { commerce } from '../lib/commerce';

import './CheckoutPage.css';

const steps = ['Shipping Address', 'Payment Details'];

const CheckoutPage = ({
  cart,
  order,
  onCaptureCheckout,
  error,
  userDataFromStorage,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });

        setCheckoutToken(token);
      } catch (error) {
        if (activeStep !== steps.length) history.push('/');
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    localStorage.setItem('user', JSON.stringify(data));
    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Divider className='CheckoutPage-divider' />
          <Typography variant='subtitle2'>
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </>
    ) : (
      <div className='CheckoutPage-spinner'>
        <CircularProgress />
      </div>
    );

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant='h5'>Error: {error}</Typography>
        <br />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        next={next}
        userDataFromStorage={userDataFromStorage}
      />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <div className='CheckoutPage'>
      <div className='Checkout-container'>
        <Paper elevation={3}>
          <h1>Checkout</h1>
          <Stepper activeStep={activeStep} className='Checkout-stepper'>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </div>
    </div>
  );
};

export default CheckoutPage;
