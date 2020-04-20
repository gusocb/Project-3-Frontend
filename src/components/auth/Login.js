import React, { useState } from 'react';
import AuthService from './auth-services';
import { Link, useHistory } from 'react-router-dom';

const Login = props => {

    const [state, setState] = useState({ username: '', password: '' })
    const service = new AuthService();
    const history = useHistory()
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = state.username;
    const password = state.password;
    service.login(username, password)
    .then( response => {
        setState({ username: "", password: "" });
        props.getUser(response)
    })
    .then(() => history.push('/dashboard'))
    .catch( error => console.log(error) )
  }
    
  const handleChange = (event) => {  
    const { name, value } = event.target;
    setState(Object.assign({}, state, {[name]: value}))
  }
    
  return(
    <section className='hero'>
      <div className='hero-body'>
        <div className='container'>
        <div className='columns is-centered'>
          <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
            
            <form onSubmit={handleFormSubmit} className='box'>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="text" name="username" value={state.username} onChange={ e => handleChange(e)} placeholder='example@mail.com'/>
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" name="password" value={state.password} onChange={ e => handleChange(e)} placeholder='Your password here'/>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className='button is-link is-light' type="submit">Login</button>
                </div>
              </div>

              <div className='field'>
                <div className='control'>
                  <p>Don't have an account? 
                      <Link to={"/signup"}> Signup</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </section>

   


    
  )
  
}

export default Login;