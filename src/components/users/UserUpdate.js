import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import 'bulma/css/bulma.css';
import axios from 'axios';

const UserUpdate = () =>{

    const {id} = useParams();
    const history = useHistory();

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
        axios.get(`http://localhost:5000/api/users/detail/${id}`, {withCredentials:true})
        .then( response => {
            updateFormState(response.data)
        })
        .catch(err => console.log(err))
    }

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))
    }

    const handleSubmitForm = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/users/detail/${id}`,formState, {withCredentials:true})
        .then(() => {
            history.push(`/users/detail/${id}`)
        })
        .catch(err => console.log(err))
    }

    return(
        <form onSubmit={handleSubmitForm}>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input class="input" name='name' type="text" value={formState.name} onChange={e => handleChange(e)} />
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
                        <option value=''>Select an option</option>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                    </div>
                </div>
            </div>

            <div class="control">
                <button type='submit' className="button is-primary">Update</button>
            </div>
        </form>
    )
}

export default UserUpdate;