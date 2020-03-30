import React, {useState} from 'react'
import axios from 'axios';
import 'bulma/css/bulma.css';


const ProductAdd = props =>{

    const [formState, updateFormState] = useState({
        barcode:'',
        name: '',
        price: '',
        stock: ''
    })

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateFormState(Object.assign({}, formState, {[name]: value}))
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:5000/products/add',formState)
        .then( ()=>{
            props.getData();
            updateFormState({
                barcode:'',
                name: '',
                price: '',
                stock: ''
            })
        })
        .catch(err => console.log(err))
    }

    return(
        <form onSubmit={handleFormSubmit}>
            <div className="field">
                <label className="label">Barcode</label>
                <div class="control">
                    <input className="input" name='barcode' type="text" value={formState.barcode} onChange={e => handleChange(e)} />
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
                <button type='submit' className="button is-primary">Add New</button>
            </div>

        </form>
        )
}

export default ProductAdd;