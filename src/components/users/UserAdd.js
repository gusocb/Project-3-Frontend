import React, {useState} from 'react'
import axios from 'axios';
import 'bulma/css/bulma.css';

const UserAdd = props => {

    const [formState, updateFormState] = useState({
        name:'',
        lastname: '',
        store:props.user.store,
        username: '',
        password: '',
        role:''
    })

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/users/add',formState, {withCredentials:true})
        .then( ()=>{
            props.getData();
            updateFormState({
                name:'',
                lastname: '',
                store:props.user.store,
                username: '',
                password: '',
                role:''
            })
        })
        .then(console.log(formState))
        .catch(err => console.log(err))
    }

    return(
        <form onSubmit={handleFormSubmit} className='box'>
            <div className="field">
                <label className="label">Name</label>
                <div class="control">
                    <input className="input" name='name' type="text" value={formState.name} onChange={e => handleChange(e)} />
                </div>
            </div>

            <div className="field">
                <label className="label">Lastname</label>
                <div className="control">
                    <input className="input" name='lastname' type="text" value={formState.lastname} onChange={e => handleChange(e)} />
                </div>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input className="input" name='username' type="text" value={formState.username} onChange={e => handleChange(e)}/>
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" name='password' type="password" value={formState.password} onChange={e => handleChange(e)}/>
                </div>
            </div>

            <div class="field">
                <label class="label">Role</label>
                <div class="control">
                    <div class="select">
                    <select name='role' onChange={e => handleChange(e)}>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                    </div>
                </div>
            </div>

            <div class="control">
                <button type='submit' className="button is-primary">Add New</button>
            </div>

        </form>

        
    )

}

export default UserAdd;