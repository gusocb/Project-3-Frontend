import React, {useState} from 'react'
import axios from 'axios';
import 'bulma/css/bulma.css';
import { useForm } from 'react-hook-form'



const ProductAdd = props =>{

    // const [formState, updateFormState] = useState({
    //     barcode:'',
    //     name: '',
    //     price: '',
    //     stock: '',
    //     store:props.user.store
    // })

    // const handleChange = (event) => {  
    //     const { name, value } = event.target;
    //     updateFormState(Object.assign({}, formState, {[name]: value}))
    // }
    const { register,errors, handleSubmit } = useForm()

    const onSubmit = data => {
        // event.preventDefault();
        data.store=props.user.store
        axios.post('http://localhost:5000/api/products/add',data, {withCredentials:true})
        .then( ()=>{
            props.getData();
            // updateFormState({
            //     barcode:'',
            //     name: '',
            //     price: '',
            //     stock: '',
            //     store:props.user.store
            // })
        })
        .catch(err => console.log(err))
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className='box'>
            <div className="field">
                <label className="label">Barcode</label>
                <div class="control">
                    <input className="input" 
                    name='barcode' 
                    type="text" 
                    // value={formState.barcode} 
                    // onChange={e => handleChange(e)}
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
                    // value={formState.name} 
                    // onChange={e => handleChange(e)} 
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
                    // value={formState.price} 
                    // onChange={e => handleChange(e)}
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
                    // value={formState.stock} 
                    // onChange={e => handleChange(e)}
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