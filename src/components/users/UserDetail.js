import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useHistory} from 'react-router-dom'
import 'bulma/css/bulma.css';
import Swal from 'sweetalert2'

const UserDetail = () =>{

    const {id} = useParams();
    const history = useHistory();

    const [singleUser, updatesingleUser] = useState([{
        name:'',
        lastname: '',
        store:'',
        username: '',
        password: '',
        role:''
    }]);

    useEffect(() => {
        getSingleUser()
    },[]);

    const getSingleUser = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/detail/${id}`, {withCredentials:true})
        .then(response => {
            updatesingleUser(response.data)
        })
        .catch(err => console.log(err))
    }

    const deleteUser = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/users/detail/${id}`, {withCredentials:true})
        .then(() => {
            history.push('/users')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const deleteConfirm = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                deleteUser()
                Swal.fire(
                'Deleted!',
                'The user has been deleted.',
                'success'
              )
            }
        })
    }
    
    return (
        <div className='container'>
            <div className='card'>
                <div className='card-content'>
                    <p className='title is-'>{singleUser.store}</p>
                    <p className='title is-2'>{singleUser.name}</p>
                    <p className='subtitle is-2'>{singleUser.lastname}</p>
                    <p className='title is-3'>{singleUser.username}</p>
                    <p className='subtitle is-3'>{singleUser.role==='admin'?'Administrator':'User'}</p>
                </div>
                <footer class="card-footer">
                    <button  className="card-footer-item button is-link is-outlined"><Link to={'/users/update/'+id}>Edit</Link></button>
                    <button onClick={deleteConfirm}  className="card-footer-item button is-danger is-outlined" >Delete</button>
                </footer>
            </div>
        </div>
    )
}

export default UserDetail;