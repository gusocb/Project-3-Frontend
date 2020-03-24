import React, {useState} from 'react'
import axios from 'axios';

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
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Barcode:</label>
                <input type="text" name="barcode" value={formState.barcode} onChange={ e => handleChange(e)}/>
                <label>Name:</label>
                <input type="text" name="name" value={formState.name} onChange={ e => handleChange(e)}/>
                <label>Price:</label>
                <input type="text" name="price" value={formState.price} onChange={ e => handleChange(e)}/>
                <label>Stock:</label>
                <input type="text" name="stock" value={formState.stock} onChange={ e => handleChange(e)}/>
                
                <input type="submit" value="Submit" />
            </form>
        </div>
        )
}

export default ProductAdd;