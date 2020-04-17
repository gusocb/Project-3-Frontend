import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useHistory} from 'react-router-dom'
import 'bulma/css/bulma.css';



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
        axios.get(`http://localhost:5000/api/users/detail/${id}`, {withCredentials:true})
        .then(response => {
            updatesingleUser(response.data)
        })
        .catch(err => console.log(err))
    }

    const deleteProject = () => {
        axios.delete(`http://localhost:5000/api/users/detail/${id}`, {withCredentials:true})
        .then(() => {
            history.push('/users')
        })
        .catch((err)=>{
            console.log(err)
        })
      }
    
    return (
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
                <button onClick={deleteProject}  className="card-footer-item button is-danger is-outlined" >Delete</button>
            </footer>
        </div>
    )
}

export default UserDetail;