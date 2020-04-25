import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import 'bulma/css/bulma.css';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


const ProductUpdate = () =>{

    const {id} = useParams();
    const history = useHistory();
    const { register,errors, handleSubmit } = useForm()

    const [formState, updateFormState] = useState({
        barcode: "",
        name:"",
        price: "",
        stock:""
    });

    useEffect(() => {
        getSingleProduct()
    },[]);

    const getSingleProduct = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/detail/${id}`, {withCredentials:true})
        .then( response => {
            updateFormState(response.data)
        })
        .catch(err => console.log(err))
    }


    const onSubmit = data => {
        axios.put(`${process.env.REACT_APP_API_URL}/products/detail/${id}`,data, {withCredentials:true})
        .then(() => {
            Swal.fire({
                title:'Product updated',
                icon:'success'
            })
            .then((result) => {
                if (result.value) {
                    history.push(`/products/detail/${id}`)
                }
              })
        })
        .catch(err => console.log(err))
    }

    return(

        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)} className='box'>
                <div className="field">
                    <label className="label">Barcode</label>
                    <div class="control">
                        <input className="input" 
                        name='barcode' 
                        type="text" 
                        defaultValue={formState.barcode} 
                        ref={register({required:true})}
                        />
                        {errors.barcode && <p className='error-form'>A product barcode is required</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" 
                        name='name' 
                        type="text" 
                        defaultValue={formState.name} 
                        ref={register({required:true})}
                        />
                        {errors.name && <p className='error-form'>A product name is required</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Price</label>
                    <div className="control">
                        <input className="input" 
                        name='price' 
                        type="text" 
                        defaultValue={formState.price} 
                        ref={register({required:true, pattern:/[0-9]/})}
                        />
                        {errors.price?.type === "required" && <p className='error-form'>A price quantity is required</p>}
                        {errors.price?.type === "pattern" && <p className='error-form'>Must be a number</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Stock</label>
                    <div className="control">
                        <input className="input" 
                        name='stock' 
                        type="text" 
                        defaultValue={formState.stock} 
                        ref={register({required:true,pattern:/[0-9]/})}
                        />
                        {errors.stock?.type === "required" && <p className='error-form'>A stock quantity is required</p>}
                        {errors.stock?.type === "pattern" && <p className='error-form'>Must be a number</p>}
                    </div>
                </div>

                <div class="control">
                    <button type='submit' className="button is-primary">Update product</button>
                </div>

            </form>
    
        </div>
    )
}

export default ProductUpdate;