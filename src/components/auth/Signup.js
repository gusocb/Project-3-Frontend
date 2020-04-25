import React, { useState } from 'react';
import AuthService from './auth-services';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


const Signup = props => {


  const service = new AuthService();
  const history = useHistory()
  const { register,errors, handleSubmit } = useForm()

  const onSubmit = (data) => {
    // event.preventDefault();
    const name = data.name;
    const lastname = data.lastname;
    const store = data.store;
    const username = data.username;
    const password = data.password;
  
    service.signup(name, lastname, store, username, password)
    .then( response => {
        props.getUser(response)
    })
    .then(() => history.push('/dashboard'))
    .catch( error => {
      console.log(error)
      if(error.response.status===401){
        Swal.fire({
          title: "Error!",
          text: 'Email already asociated with another account',
          icon: 'warning',
          confirmButtonText: 'Try another one'
        })
      }
      else{
        Swal.fire({
          title: "Error!",
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Try again'
        })
      }
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
                  <label className="label">Name</label>
                  <div className="control">
                    <input className="input" 
                    type="text" 
                    name="name" 
                    placeholder='Frodo' 
                    ref={register({required:true})}/>
                    {errors.name && <p className='error-form'>A name is required</p>}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Lastname</label>
                  <div className="control">
                    <input className="input" 
                    type="text" 
                    name="lastname" 
                    placeholder='Baggins' 
                    ref={register({required:true})}/>
                    {errors.lastname && <p className='error-form'>A lastname is required</p>}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Store name</label>
                  <div className="control">
                    <input className="input" 
                    type="text" 
                    name="store" 
                    placeholder='The Green Dragon' 
                    ref={register({required:true})}/>
                    {errors.store && <p className='error-form'>A store name is required</p>}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input className="input" 
                    type="text" 
                    name="username" 
                    placeholder='example@mail.com' 
                    ref={register({
                      required:true,
                      pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                  })}
                    />
                    {errors.username?.type === "required" && <p className='error-form'>An email is required</p>}
                    {errors.username?.type === "pattern" && <p className='error-form'>That's not a valid email</p>}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input className="input" 
                    type="password" 
                    name="password" 
                    placeholder='Must be 8 or more characters' 
                    ref={register({required:true,minLength:8})}/>
                    {errors.password?.type === "required" && <p className='error-form'>A password is required</p>}
                    {errors.password?.type === "minLength" && <p className='error-form'>Must be 8 characters at least</p>}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
  
}

export default Signup;