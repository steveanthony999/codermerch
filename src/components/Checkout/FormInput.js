import { TextField, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required, defaultValue }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        defaultValue={defaultValue}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
      />
    </Grid>
  );
};

export default FormInput;
