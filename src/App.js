import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bulma/css/bulma.css';


//Components
import Home from './components/Home'
import NavBar from './components/navigation/NavBar'
import ProductList from './components/Products/ProductList'
import ProductDetail from './components/Products/ProductDetail'
import ProductUpdate from './components/Products/ProductUpdate'
import SalesList from './components/sales/SalesList'

function App() {
  return (
    <Router>
      <div className='container'>
        <NavBar/>
        <Route path='/' exact component={Home} />
        <Route path='/products' exact component={ProductList} />
        <Route path='/products/detail/:id' exact component={ProductDetail} />
        <Route path='/products/update/:id' exact component={ProductUpdate} />
        <Route path='/sales' exact component={SalesList} />
      </div>
    </Router>
  );
}

export default App;
