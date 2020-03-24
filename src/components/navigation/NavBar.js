import React from 'react';
import {Link} from 'react-router-dom'
import 'bulma/css/bulma.css';

const NavBar = () => {
    return(
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="google.com">
                    <img src="./images/logopos.png" alt="Ironhack Point of Sale"/>
                </Link>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to='/'>Home</Link>
                    <Link className="navbar-item" to='/products'>Products</Link>
                </div>

                <div class="navbar-end">
                </div>
            </div>
        </nav>

    )
};
 export default NavBar;