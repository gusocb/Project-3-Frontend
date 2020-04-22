import React, {useState} from 'react'
import axios from 'axios';
import 'bulma/css/bulma.css';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'



const UserAdd = props => {

    // const [formState, updateFormState] = useState({
    //     name:'',
    //     lastname: '',
    //     store:props.user.store,
    //     username: '',
    //     password: '',
    //     role:''
    // })

    // const handleChange = (event) => {  
    //     const { name, value } = event.target;
    //     updateFormState(Object.assign({}, formState, {[name]: value}))
    // }

    const { register,errors, handleSubmit } = useForm()

    const onSubmit = data => {
        // event.preventDefault();
        data.store=props.user.store
        axios.post('http://localhost:5000/api/users/add',data, {withCredentials:true})
        .then( ()=>{
            props.getData();
            // updateFormState({
            //     name:'',
            //     lastname: '',
            //     store:props.user.store,
            //     username: '',
            //     password: '',
            //     role:''
            // })
            Swal.fire({
                title: "User Created!",
                icon: 'success',
            })
            document.getElementById('user-add-form').reset()
        })
        .catch(err => {
            console.log(err)
            if(err.response.status===401){
                Swal.fire({
                    title: "Wow!",
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
        })
    }

    return(
        <form id='user-add-form' onSubmit={handleSubmit(onSubmit)} className='box'>
            <div className="field">
                <label className="label">Name</label>
                <div class="control">
                    <input className="input" 
                    name='name' 
                    type="text" 
                    // value={formState.name}
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
                    // value={formState.lastname} 
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
                    // value={formState.username} 
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
                    // value={formState.password} 
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
                    {errors.role && <p className='error-form'>Please select a role</p>}
                    </div>
                </div>
            </div>

            <div className='field'>
            <div class="control">
                <button type='submit' className="button is-primary">Add New</button>
            </div>
            </div>

        </form>

        
    )

}

export default UserAdd;