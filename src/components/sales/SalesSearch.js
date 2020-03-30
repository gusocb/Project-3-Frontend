import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css';


const SaleSearch = () => {

    const [searchState, updateSearchState] = useState({
        search:'',
    });

    const [productState, setProductState] =useState([])

    const [saleState, setSale] = useState([])

    useEffect( () => {
        getAllProducts();
    },[])

    const getAllProducts = () => {
        axios.get('http://localhost:5000/products')
        .then(res => {
            setProductState(res.data)
            
        })
        .catch(err => console.log(err))
    }

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateSearchState(Object.assign({}, searchState, {[name]: value}))
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const filteredProduct = productState.filter(product =>{
            return product.barcode.includes(searchState.search)
        })
        updateSearchState({
            search:''
        })
        saleState.push(filteredProduct[0])
    }

    return(
        <div>
        <form onSubmit={handleFormSubmit}>
            <input name='search' value={searchState.search} onChange={e => handleChange(e)} />
            <button type='submit'>Search</button>
        </form>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {saleState.map(product => {
                    return (
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}

export default SaleSearch;