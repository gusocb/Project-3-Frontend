import React, { useState } from 'react';
import AuthService from './auth-services';
import { Link, useHistory } from 'react-router-dom';

const Signup = props => {

    const [state, setState] = useState({
       name: '', 
       lastname: '', 
       store: '', 
       username: '',
       password: '' 
      })
    const service = new AuthService();
    const history = useHistory()
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const name = state.name;
    const lastname = state.lastname;
    const store = state.store;
    const username = state.username;
    const password = state.password;
  
    service.signup(name, lastname, store, username, password)
    .then( response => {
        setState({
            name: "", 
            lastname: "",
            store: "",
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
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" name="name" value={state.name} onChange={ e => handleChange(e)} placeholder='Frodo'/>
          </div>
        </div>

        <div className="field">
          <label className="label">Lastname</label>
          <div className="control">
            <input className="input" type="text" name="lastname" value={state.lastname} onChange={ e => handleChange(e)} placeholder='Baggins'/>
          </div>
        </div>

        <div className="field">
          <label className="label">Store name</label>
          <div className="control">
            <input className="input" type="text" name="store" value={state.store} onChange={ e => handleChange(e)} placeholder='The Green Dragon'/>
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="text" name="username" value={state.username} onChange={ e => handleChange(e)} placeholder='example@mail.com'/>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" name="password" value={state.password} onChange={ e => handleChange(e)} placeholder='Must be 8 or more characters'/>
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