import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import 'bulma/css/bulma.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reports = props => {

    const [sales, updateSales] = useState([]);

    const [startDate, setStartDate] = useState(new Date());

    const [totalDay, updateTotal] = useState(0);

    const getAllSales = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/sales`, {withCredentials:true})
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
                <div className="column" >
                    <p className='title is-2'>All sales</p>
                    <div className='container' id='reports-sale-column'>
                        <table className='table is-striped is-fullwidth'>
                            <thead>
                                <tr>
                                    <th>Sale ID</th>
                                    <th>Total Sale</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {sales.map(sale => {
                                    return(
                                        <tr key={sale._id}>
                                            <td>{sale._id}</td>
                                            <td>${sale.total}</td>
                                            <td>
                                                <button className="button is-info is-outlined is-small">
                                                    <Link to={'sales/detail/'+sale._id}>Details</Link>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="column">
                    <p className='title is-2'>Sales by date</p>
                    <p className='title is-4'>Pick a date</p>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        <div id='reports-table'>
                        <table className='table is-striped is-fullwidth'>
                            <thead>
                                <tr>
                                    <th>Sale ID</th>
                                    <th>Total Sale</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {salesFiltered.map(sale => {
                                    return(
                                        <tr key={sale._id}>
                                            <td>{sale._id}</td>
                                            <td>${sale.total}</td>
                                            <td>
                                                <button className="button is-info is-outlined is-small">
                                                    <Link to={'sales/detail/'+sale._id}>Details</Link>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        </div>
                        <p className='title is-3'>Day's Sales: ${totalDay}</p>

                </div>
            </div>
        </div>
    )
};

export default Reports;