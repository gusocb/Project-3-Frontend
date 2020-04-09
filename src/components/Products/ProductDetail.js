import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useHistory} from 'react-router-dom'
import 'bulma/css/bulma.css';



const ProductDetail = () =>{

    const {id} = useParams();
    const history = useHistory();

    const [singleProductState, updateSingleProductState] = useState({
        barcode:'',
        name: '',
        price:'',
        stock:''
    });

    useEffect(() => {
        getSingleProduct()
    },[]);

    const getSingleProduct = () => {
        axios.get(`http://localhost:5000/api/products/detail/${id}`)
        .then(response => {
            updateSingleProductState(response.data)
        })
        .catch(err => console.log(err))
    }

    const deleteProject = () => {
        axios.delete(`http://localhost:5000/api/products/detail/${id}`)
        .then(() => {
            history.push('/products')
        })
        .catch((err)=>{
            console.log(err)
        })
      }
    
    return (
        <div className='card'>
            <div className='card-content'>
                <p className='title is-2'>{singleProductState.name}</p>
                <p className='subtitle is-2'>{singleProductState.barcode}</p>
                <p className='title is-3'>${singleProductState.price}</p>
                <p className='subtitle is-3'>Stock: {singleProductState.stock} units</p>
            </div>
            <footer class="card-footer">
                <button  className="card-footer-item button is-link is-outlined"><Link to={'/products/update/'+id}>Edit</Link></button>
                <button onClick={deleteProject}  className="card-footer-item button is-danger is-outlined" >Delete</button>
            </footer>
        </div>
    )
}

export default ProductDetail;