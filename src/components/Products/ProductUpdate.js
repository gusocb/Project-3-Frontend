import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import 'bulma/css/bulma.css';
import axios from 'axios';

const ProductUpdate = () =>{

    const {id} = useParams();
    const history = useHistory();

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
        axios.get(`http://localhost:5000/api/products/detail/${id}`, {withCredentials:true})
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
        axios.put(`http://localhost:5000/api/products/detail/${id}`,formState, {withCredentials:true})
        .then(() => {
            history.push(`/products/detail/${id}`)
        })
        .catch(err => console.log(err))
    }

    return(
        <form onSubmit={handleSubmitForm}>
            <div className="field">
                <label className="label">Barcode</label>
                <div className="control">
                    <input class="input" name='barcode' type="text" value={formState.barcode} onChange={e => handleChange(e)} />
                </div>
            </div>

            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" name='name' type="text" value={formState.name} onChange={e => handleChange(e)} />
                </div>
            </div>

            <div className="field">
                <label className="label">Price</label>
                <div className="control">
                    <input className="input" name='price' type="text" value={formState.price} onChange={e => handleChange(e)}/>
                </div>
            </div>

            <div className="field">
                <label className="label">Stock</label>
                <div className="control">
                    <input className="input" name='stock' type="text" value={formState.stock} onChange={e => handleChange(e)}/>
                </div>
            </div>

            <div class="control">
                <button type='submit' className="button is-primary">Update</button>
            </div>
        </form>
    )
}

export default ProductUpdate;