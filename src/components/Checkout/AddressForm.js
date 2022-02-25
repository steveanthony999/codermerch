import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, InputLabel, MenuItem, Select } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useForm, FormProvider } from 'react-hook-form';
import { motion } from 'framer-motion';

import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';

import './AddressForm.css';

const AddressForm = ({ checkoutToken, next, userDataFromStorage }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[2]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    }
  }, [shippingSubdivision]);

  return (
    <div className='AddressForm'>
      <h4>Shipping Address</h4>
      <FormProvider {...methods}>
        <form
          className='AddressForm-form'
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput
              required
              name='firstName'
              label='First Name'
              defaultValue={userDataFromStorage.firstName}
            />
            <FormInput
              required
              name='lastName'
              label='Last Name'
              defaultValue={userDataFromStorage.lastName}
            />

            <FormInput
              required
              name='email'
              label='Email'
              defaultValue={userDataFromStorage.email}
            />
            <FormInput
              required
              name='streetAddress'
              label='Street Address (including apt / unit number)'
              defaultValue={userDataFromStorage.streetAddress}
            />
            <FormInput
              required
              name='city'
              label='City'
              defaultValue={userDataFromStorage.city}
            />
            <FormInput
              required
              name='zip'
              label='Zip / Postal Code'
              defaultValue={userDataFromStorage.zip}
            />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <div className='AddressForm-submit'>
            <Link to='/cart' className='btn-remove'>
              <ArrowBackOutlinedIcon />
              <ShoppingCartOutlinedIcon />
            </Link>
            <motion.button
              type='submit'
              className='btn-full'
              whileHover={{
                scale: 1.01,
                transition: {
                  duration: 0.1,
                  type: 'spring',
                },
              }}
            >
              Next
            </motion.button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;
