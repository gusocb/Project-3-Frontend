import React, { useState } from 'react';
import AuthService from './auth-services';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


const Login = props => {

    const service = new AuthService();
    const history = useHistory()
    const { register,errors, handleSubmit } = useForm()
  

  const onSubmit = (data) => {
    const username = data.username;
    const password = data.password;
    service.login(username, password)
    .then( response => {
        props.getUser(response)
    })
    .then(() => history.push('/dashboard'))
    .catch( error => {
      console.log(error)
      Swal.fire({
        title: "Can't login!",
        text: 'Email or password incorrect',
        icon: 'error',
        confirmButtonText: 'Try again'
      })
    } )
  }
    
    
  return(
    <section className='hero'>
      <div className='hero-body'>
        <div className='container'>
        <div className='columns is-centered'>
          <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
            
            <form onSubmit={handleSubmit(onSubmit)} className='box'>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    name="username" 
                    placeholder='example@mail.com'
                    ref={register({
                      required:true,
                      pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                  })}
                  />
                  {errors.username?.type === "required" && <p className='error-form'>Email is required</p>}
                  {errors.username?.type === "pattern" && <p className='error-form'>That's not a valid email</p>}
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="password" 
                    name="password" 
                    placeholder='Your password here'
                    ref={register({required:true})}
                  />
                  {errors.password && <p className='error-form'>Password is required</p>}
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