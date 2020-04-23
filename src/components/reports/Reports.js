import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bulma/css/bulma.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reports = props => {

    const [sales, updateSales] = useState([]);

    const [startDate, setStartDate] = useState(new Date());

    const [totalDay, updateTotal] = useState(0);

    const getAllSales = () => {
        axios.get('http://localhost:5000/api/sales', {withCredentials:true})
        .then(response => {
            updateSales(response.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllSales()
    }, [])


    const changedDates = sales.map(sale => {
        sale.convertedTime = new Date(sale.createdAt).setHours(0,0,0,0)
        return sale
    })

    const salesFiltered = changedDates.filter(sale => {
        return sale.convertedTime===startDate.setHours(0,0,0,0)
    })  

    const calculateTotal = () => {
        let sum =0;
        salesFiltered.forEach(ele => {
            sum = sum + ele.total
        })
        updateTotal(sum)
    }

    useEffect(() => {
        calculateTotal()
    });
    
    return(
        <div className='container'>
            <div className="columns">
                <div className="column">
                    <p className='title is-2'>All sales</p>
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
                    <p className='title is-2'>Sales by date</p>
                    <p className='title is-4'>Pick a date</p>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        <table className='table is-striped is-fullwidth'>
                            <thead>
                                <tr>
                                    <th>Sale ID</th>
                                    <th>Total Sale</th>
                                </tr>
                            </thead>
                            <tbody>

                                {salesFiltered.map(sale => {
                                    return(
                                        <tr key={sale._id}>
                                            <td>{sale._id}</td>
                                            <td>${sale.total}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <p className='subtitle is-1'>Day's Sales: ${totalDay}</p>

                </div>
            </div>
        </div>
    )
};

export default Reports;