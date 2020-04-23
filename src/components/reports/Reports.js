import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bulma/css/bulma.css';
import CashClose from './CashClose'

const Reports = props => {

    const [sales, updateSales] = useState([]);

    const getAllSales = () => {
        axios.get('http://localhost:5000/api/sales', {withCredentials:true})
        .then(response => {
            updateSales(response.data)
        })
        .catch(err => console.log(err))
    }

    console.log(sales)
    useEffect(() => {
        getAllSales()
    }, [])
    
    return(
        <div className='container'>
            <div className="columns">
                <div className="column">
                    Here goes Sales Search
                    {
                        sales.map(sale => {
                            return(
                                <div className='card'>
                                    <div className='card-content'>
                                        <p className='subtitle is-3'>Sale {sale._id}</p>
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

                                                {sale.sale.map(product => {
                                                    return(
                                                        <tbody>
                                                            <td>{product.barcode}</td>
                                                            <td>{product.name}</td>
                                                            <td>${product.price}</td>
                                                            <td>{product.quantity}</td>
                                                            <td>${product.subtotal}</td>
                                                        </tbody>
                                                    )
                                                })}
                                            
                                            <p>Total ${sale.total}</p>
                                            <p>Made by {sale.salesMan.name}</p>
                                            <p> {sale.createdAt}</p>
                                        </table>
                                    </div>
                                </div>
                            )
                        })
                        
                    }
                </div>


                <div className="column">
                    <CashClose></CashClose>
                </div>
            </div>
        </div>
    )
};

export default Reports;