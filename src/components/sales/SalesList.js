import React from 'react'
import 'bulma/css/bulma.css';


const SaleList = () => {
    return(
        <table className='table is-striped'>
            <thead>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Single Price</th>
                <th>Amount</th>
            </thead>
        </table>
    )
}

export default SaleList;