import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.css';
import ProductAdd from './ProductAdd'

const ProductList = props =>{

    const [listOfProducts, updateList] = useState([]);

    const getAllProducts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/products`, {withCredentials:true})
        .then(response => {
            updateList(response.data)
        })
        .catch(err => console.log(err))
    }

    useEffect( () => {
        getAllProducts();
    },[])

    if(props.loggedInUser.role==='admin'){
        return (
            <div className='container'>
                <div className='columns'>
                    <div className='column' id='product-table'>
                        <table className='table is-striped is-fullwidth'>
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
                    <div className='column'>
                        <ProductAdd user={props.loggedInUser} getData={getAllProducts} />
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='container'>
                <div className='columns'>
                    <div className='column'>
                        <table className='table is-striped is-fullwidth'>
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
                </div>
            </div>
        )
    }
}

export default ProductList;