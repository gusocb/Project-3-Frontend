import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.css';
import ProductAdd from './ProductAdd'

const ProductList = () =>{

    const [listOfProducts, updateList] = useState([]);

    const getAllProducts = () => {
        axios.get('http://localhost:5000/api/products')
        .then(response => {
            updateList(response.data)
        })
        .catch(err => console.log(err))
    }

    useEffect( () => {
        getAllProducts();
    },[])

    return (
        <div className='level'>
            <div className='level-left'>
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
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>
                                        <td><button className="button is-info is-outlined is-small"><Link to={'products/detail/'+product._id}>Details</Link></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='level-right'>
                <ProductAdd getData={getAllProducts} />
            </div>
        </div>
    )
}

export default ProductList;