import { Grid } from '@mui/material';

import Product from './Product';

const products = [
  {
    id: 1,
    name: 'shirt',
    description: '#shashigang shirt',
    image: 'https://picsum.photos/id/237/200/300',
    price: '$20',
  },
  {
    id: 2,
    name: 'beanie',
    description: '#shashigang beanie',
    image: 'https://picsum.photos/id/237/200/300',
    price: '$20',
  },
];

const Products = () => {
  return (
    <main>
      <Grid container justify='center' spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
