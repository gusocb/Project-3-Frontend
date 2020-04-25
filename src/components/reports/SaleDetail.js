import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import 'bulma/css/bulma.css';

const UserDetail = () =>{

    const {id} = useParams();

    const [singleSale, updateSingleSale] = useState({
        salesMan:{},
        sale:[]
    });

    useEffect(() => {
        getSingleSale()
    },[]);

    const getSingleSale = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/sales/detail/${id}`, {withCredentials:true})
        .then(response => {
            updateSingleSale(response.data)
        })
        .catch(err => console.log(err))
    }

    console.log(singleSale)
    return (
        <div className='container'>
            <div className='columns is-centered'>
                <div className='column is-7'>
                    <div className='card'>
                        <div className='card-content'>
                            <p className='subtitle is-3'>Sale {singleSale._id}</p>
                            <table className='table is-striped'>
                                <thead>
                                    <tr>
                                        <th>Barcode</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {singleSale.sale.map(product => {
                                        return(
                                            <tr>
                                                <td>{product.barcode}</td>
                                                <td>{product.name}</td>
                                                <td>${product.price}</td>
                                                <td>{product.quantity}</td>
                                                <td>${product.subtotal}</td>
                                            </tr>
                                                )
                                            })}
                                
                                </tbody>
                                <p className='title is-6'>Total ${singleSale.total}</p>
                                <p>Made by: {singleSale.salesMan.name} {singleSale.salesMan.lastname}</p>
                                <p>On date: {new Date(singleSale.createdAt).getDate()}-{new Date(singleSale.createdAt).getMonth()}-{new Date(singleSale.createdAt).getFullYear()}</p>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail;