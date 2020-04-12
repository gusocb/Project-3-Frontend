import React, { useState } from 'react';
import AuthService from './auth-services';
import { Link, useHistory } from 'react-router-dom';

const Signup = props => {

    const [state, setState] = useState({ username: '', password: '' })
    const service = new AuthService();
    const history = useHistory()
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = state.username;
    const password = state.password;
  
    service.signup(username, password)
    .then( response => {
        setState({
            username: "", 
            password: "",
        });
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
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" name="username" value={state.username} onChange={ e => handleChange(e)}/>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" name="password" value={state.password} onChange={ e => handleChange(e)}/>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className='button is-link' type="submit">Signup</button>
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <p>Already have an account? 
                <Link to={"/login"}> Login</Link>
            </p>
          </div>
        </div>

      </form>
  )
  
}

export default Signup;