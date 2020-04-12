import React from 'react';
import {Link} from 'react-router-dom'
import 'bulma/css/bulma.css';
import AuthService from '../auth/auth-services';

const NavBar = props => {

    const service = new AuthService();

    const logoutUser = () =>{
        service.logout()
        .then(() => {
          props.getUser(null);  
        })
      }

    if(props.userInSession){
        return(
            
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://github.com/gusocb">
                        <img src="./images/logopos.png" alt="Ironhack Point of Sale"/>
                    </a>
                </div>
    
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <div className='navbar-item'>Welcome {props.userInSession.username}</div>
                        <Link className="navbar-item" to='/dashboard'>Dashboard</Link>
                        <Link className="navbar-item" to='/products'>Products</Link>
                        <Link className="navbar-item" to='/sales'>Sales</Link>
                    </div>
    
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-danger" onClick={logoutUser}>
                                    Logout
                                </button>
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