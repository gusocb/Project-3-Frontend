import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css';


const SaleSearch = props => {

    const [searchState, updateSearchState] = useState({
        search:'',
    });

    const [productList, setProductList] =useState([]);

    const [saleList, updateSalesList] = useState([]);

    const [total, updateTotal] = useState(0);

    // const [notFound, toggleNotFound] = useState(false)

    
    const getAllProducts = () => {
        axios.get('http://localhost:5000/api/products', {withCredentials:true})
        .then(res => {
            setProductList(res.data)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllProducts();
    },[])

    const handleChange = (event) => {  
        const { name, value } = event.target;
        updateSearchState(Object.assign({}, searchState, {[name]: value}))
    }

    const handleFormSubmit = (event) => {
        
        event.preventDefault();

        const filteredProduct = productList.filter(product =>{
            return product.barcode === searchState.search
        })

        updateSearchState({
            search:''
        })

        if(!filteredProduct[0]){
        }
        else {

            const productArray = saleList.filter(ele=>{
                return ele._id === filteredProduct[0]._id;
            })

            if(productArray.length >0){
                const newList = saleList.map(ele=>{
                    if (ele._id === filteredProduct[0]._id) {
                        ele.quantity++;
                        ele.subtotal = ele.quantity * ele.price;
                        return ele;
                    } else {
                        return ele;
                    }
                })
                updateSalesList(newList)
            } else {
                filteredProduct[0].quantity=1;  
                filteredProduct[0].subtotal=filteredProduct[0].price;  
                updateSalesList([filteredProduct[0],...saleList])
            }
            
        }
    }

    

    const calculateTotal = () => {
        let sum =0;
        saleList.forEach(ele => {
            sum = sum + ele.subtotal
        })
        updateTotal(sum)
    }

    useEffect(() => {
        calculateTotal()
    });

    const checkout = () => {
        let saleObj = new Object()
        saleObj.sale=saleList
        saleObj.total=total
        saleObj.owner=props.loggedInUser._id

        axios.post('http://localhost:5000/api/checkout', saleObj, {withCredentials:true})
        .then( ()=> {
            updateSalesList([])
        })
        .catch(err => console.log(err)) 
    }

    return(
        <div>
        <form onSubmit={handleFormSubmit}>
            <div className="field has-addons">
                <div className="control">
                <input className='input' name='search' value={searchState.search} onChange={e => handleChange(e)} placeholder='Barcode here' />
                </div>
                <div className="control">
                    <button type='submit'class="button is-info">Search</button>
                </div>
            </div>
        </form>


        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {saleList.map(product => {
                    return (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.quantity}</td>
                            <td>${product.subtotal}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
                
        <button className='button is-primary' onClick={checkout}>Checkout</button>
        <p className='title is-1'>Total: ${total}</p>

        </div>
    )
}

export default SaleSearch;