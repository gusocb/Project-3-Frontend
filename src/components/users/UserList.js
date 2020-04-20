import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.css';
import UserAdd from './UserAdd'

const UserList = props =>{

    const [listOfUsers, updateList] = useState([]);

    const getAllUsers = () => {
        axios.get('http://localhost:5000/api/users', {withCredentials:true})
        .then(response => {
            updateList(response.data)
        })
        .catch(err => console.log(err))
    }

    useEffect( () => {
        getAllUsers();
    },[])

    return (
        <div className='container'>
            <div className='columns'>
                <div className='column'>
                    <table className='table is-striped is-fullwidth'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listOfUsers.map(user => {
                                    return(
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.role==='admin'?'Administrator':'User'}</td>
                                            <td>
                                                <button className="button is-info is-outlined is-small">
                                                    <Link to={'users/detail/'+user._id}>Details</Link>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='column'>
                    <UserAdd user={props.loggedInUser} getData={getAllUsers} />
                </div>
            </div>
        </div>
    )
}

export default UserList;