import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useHistory} from 'react-router-dom'
import 'bulma/css/bulma.css';
import Swal from 'sweetalert2'

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
        axios.get(`${process.env.REACT_APP_API_URL}/products/detail/${id}`, {withCredentials:true})
        .then(response => {
            updateSingleProductState(response.data)
        })
        .catch(err => console.log(err))
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
                deleteProduct()
                Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              )
            }
        })
    }

    const deleteProduct = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/products/detail/${id}`, {withCredentials:true})
        .then(() => {
            history.push('/products')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    return (
        <div className='container'>
            <div className='columns is-centered'>
                <div className='column is-7'>

                    <div className='card'>
                        <div className='card-content'>
                            <p className='title is-2'>Product name: {singleProductState.name}</p>
                            <p className='subtitle is-2'>Barcode: {singleProductState.barcode}</p>
                            <p className='title is-3'>Price: ${singleProductState.price}</p>
                            <p className='subtitle is-3'>Stock: {singleProductState.stock} units</p>
                        </div>
                        <footer class="card-footer">
                            <button  className="card-footer-item button is-link is-outlined"><Link to={'/products/update/'+id}>Edit</Link></button>
                            <button onClick={deleteConfirm}  className="card-footer-item button is-danger is-outlined" >Delete</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;