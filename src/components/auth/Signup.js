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
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={state.username} onChange={ e => handleChange(e)}/>
        
        <label>Password:</label>
        <input name="password" value={state.password} onChange={ e => handleChange(e)} />
        
        <input type="submit" value="Signup" />
      </form>

      <p>Already have account? 
          <Link to={"/login"}> Login</Link>
      </p>

    </div>
  )
  
}

export default Signup;