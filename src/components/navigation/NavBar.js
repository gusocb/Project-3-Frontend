import React from 'react';
import {Link} from 'react-router-dom'
import 'bulma/css/bulma.css';

const NavBar = () => {
    return(
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://github.com/gusocb">
                    <img src="./images/logopos.png" alt="Ironhack Point of Sale"/>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to='/'>Home</Link>
                    <Link className="navbar-item" to='/products'>Products</Link>
                    <Link className="navbar-item" to='/sales'>Sales</Link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <Link className="button is-danger">
                                Logout
                            </Link>
                    </div>
      </div>
                </div>
            </div>
        </nav>

    )
};
 export default NavBar;