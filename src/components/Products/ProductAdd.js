import React, {useState} from 'react'
import axios from 'axios';
import 'bulma/css/bulma.css';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const ProductAdd = props =>{

    const { register,errors, handleSubmit } = useForm()

    const onSubmit = data => {
        data.store=props.user.store
        axios.post(`${process.env.REACT_APP_API_URL}/products/add`, data, {withCredentials:true})
        .then( ()=>{
            props.getData();
            Swal.fire({
                title: "Product Created!",
                icon: 'success',
            })
            
            document.getElementById("product-add-form").reset();
        })
        .catch(err => {
            console.log(err)
            if(err.response.status===401){
                Swal.fire({
                    title:'Ups!',
                    text:'Barcode already use',
                    icon:'warning',
                    confirmButtonText: 'Try another one'
                })
            }
            else{
                Swal.fire({
                    title:'Error!',
                    text:'Something went bad',
                    icon:'error',
                    confirmButtonText: 'Try again'
                })  
            }
        })
    }

    return(
        <form id='product-add-form' onSubmit={handleSubmit(onSubmit)} className='box'>
            <div className="field">
                <label className="label">Barcode</label>
                <div class="control">
                    <input className="input" 
                    name='barcode' 
                    type="text" 
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
                    ref={register({required:true,pattern:/[0-9]/})}
                    />
                    {errors.stock?.type === "required" && <p className='error-form'>A stock quantity is required</p>}
                    {errors.stock?.type === "pattern" && <p className='error-form'>Must be a number</p>}
                </div>
            </div>

            <div class="control">
                <button type='submit' className="button is-primary">Add New</button>
            </div>

        </form>
    )
}

export default ProductAdd;