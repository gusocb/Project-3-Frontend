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
import SalesSearch from './components/sales/SalesSearch'
import Signup from './components/auth/Signup';


function App() {
  return (
    <Router>
      <div className='container'>
        <Route exact path="/signup" component={Signup}/>
        <NavBar/>
        <Route path='/' exact component={Home} />
        <Route path='/products' exact component={ProductList} />
        <Route path='/products/detail/:id' exact component={ProductDetail} />
        <Route path='/products/update/:id' exact component={ProductUpdate} />
        <Route path='/sales' exact component={SalesSearch} />
      </div>
    </Router>
  );
}

export default App;
