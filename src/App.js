import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home';
import AllProductsPage from './pages/AllProductsPage';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products'>
          <AllProductsPage />
        </Route>
        <Route path='/products/:id'>{/* <AllProductsPage /> */}</Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
