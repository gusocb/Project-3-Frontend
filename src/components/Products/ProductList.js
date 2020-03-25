import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.css';

const ProductList = props =>{

    const [listOfProducts, updateList] = useState([]);

    const getAllProducts = () => {
        axios.get('http://localhost:5000/products')
        .then(response => {
            updateList(response.data)
        })
        .catch(err => console.log(err))
    }

    useEffect( () => {
        getAllProducts();
    },[])

    return (
        <table className='table is-striped'>
            <thead>
                <tr>
                    <th>Barcode</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th colSpan='2'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    listOfProducts.map(product => {
                        return(
                            <tr>
                                <td>{product.barcode}</td>
                                <td><Link to={'/products/detail/'+product._id}>{product.name}</Link></td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                <td><button className="button is-info is-outlined is-small"><Link to={'products/update/'+product._id}>Update</Link></button></td>
                                <td><button className="button is-danger is-outlined is-small">Delete</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ProductList;