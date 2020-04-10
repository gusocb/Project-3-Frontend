import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import 'bulma/css/bulma.css';

const NavBar = () => {

    const [loggedInUser, setLoggedInUser] = useState(null)

    const componentWillReceiveProps = nextProps => {
        setLoggedInUser(nextProps['userInSession'])
    }

    if(loggedInUser){
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
    
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link className="button is-danger" to='/logout'>
                                    Logout
                                </Link>
                        </div>
          </div>
                    </div>
                </div>
            </nav>
        )
    }
    else {
        return(
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://github.com/gusocb">
                        <img src="./images/logopos.png" alt="Ironhack Point of Sale"/>
                    </a>
                </div>
    
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link className="button is-link is-outlined" to='/login'>
                                    Login
                                </Link>
                                <Link className="button is-link" to='/signup'>
                                    Signup
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

};
 export default NavBar;