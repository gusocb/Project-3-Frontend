import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import 'bulma/css/bulma.css';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


const UserUpdate = () =>{

    const {id} = useParams();
    const history = useHistory();
    const { register,errors, handleSubmit } = useForm()

    const [formState, updateFormState] = useState({
        name:'',
        lastname: '',
        username: '',
        password: '',
        role:''
    });

    useEffect(() => {
        getSingleUser()
    },[]);

    const getSingleUser = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/detail/${id}`, {withCredentials:true})
        .then( response => {
            updateFormState(response.data)
        })
        .catch(err => console.log(err))
    }

    // const handleChange = (event) => {  
    //     const { name, defaultdefaultValue } = event.target;
    //     updateFormState(Object.assign({}, formState, {[name]: defaultdefaultValue}))
    // }

    const onSubmit = data => {
        // event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/users/detail/${id}`,data, {withCredentials:true})
        .then(() => {
            Swal.fire({
                title:'User updated',
                icon:'success'
            })
            .then((result) => {
                if (result.value) {
                    history.push(`/users/detail/${id}`)
                }
              })
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='container'>
            <form id='user-add-form' onSubmit={handleSubmit(onSubmit)} className='box'>
                <div className="field">
                    <label className="label">Name</label>
                    <div class="control">
                        <input className="input" 
                        name='name' 
                        type="text" 
                        defaultValue={formState.name}
                        // onChange={e => handleChange(e)} 
                        ref={register({required:true})}
                        />
                        {errors.name && <p className='error-form'>A name is required</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Lastname</label>
                    <div className="control">
                        <input className="input" 
                        name='lastname' type="text" 
                        defaultValue={formState.lastname} 
                        // onChange={e => handleChange(e)}
                        ref={register({required:true})}
                        />
                        {errors.lastname && <p className='error-form'>A lastname is required</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" 
                        name='username' 
                        type="text" 
                        defaultValue={formState.username} 
                        // onChange={e => handleChange(e)}
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
                        name='password' 
                        type="password" 
                        defaultValue={formState.password} 
                        // onChange={e => handleChange(e)}
                        ref={register({
                            required:true,
                            minLength:8
                        })}
                        />
                        {errors.password?.type === "required" && <p className='error-form'>An password is required</p>}
                        {errors.password?.type === "minLength" && <p className='error-form'>Must be 8 characters at least</p>}
                    </div>
                </div>

                <div class="field">
                    <label class="label">Role</label>
                    <div class="control">
                        <div class="select">
                        <select name='role' 
                        // onChange={e => handleChange(e)}
                        ref={register({required:true})}
                        >
                            <option value=''>Select an option</option>
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                        <span>{errors.role && <p className='error-form'>Please select a role</p>}</span>
                        </div>
                    </div>
                </div>

                <div className='field'>
                    <div class="control">
                        <button type='submit' className="button is-primary">Update User</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default UserUpdate;