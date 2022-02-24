import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AllProductsPage from './pages/AllProductsPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<AllProductsPage />} />
    </Routes>
  );
}

export default App;
