import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
        <table className='table'>
            <thead>
                <tr>
                    <th>Barcode</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
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
                                
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ProductList;