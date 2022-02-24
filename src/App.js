import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

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
      </Switch>
    </div>
  );
}

export default App;
