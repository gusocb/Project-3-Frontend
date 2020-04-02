import React, {Component} from 'react'
import axios from 'axios'
import 'bulma/css/bulma.css';

class SaleSearch extends Component{
   state = {
        search:'',
        productList:[],
        saleList:[],
        notFound:false
   }

    componentDidMount(){
        this.getAllProducts()
    }

    getAllProducts = () => {
        axios.get('http://localhost:5000/products')
        .then(res => {
            this.setState({productList:res.data})
            console.log(this.productList)
        })
        .catch(err => console.log(err))
    }

    handleChange = (event) => {  
        const { name, value } = event.target;
        Object.assign({}, this.state.search, {[name]: value})
    }

     handleFormSubmit = (event) => {
        event.preventDefault();
        // const filteredProduct = saleState.productList.filter(product =>{
        //     return product.barcode.includes(saleState.search)
        // })
        // updateSaleState({
        //     search:''
        // })
        // if (!filteredProduct){
        //     updateSaleState({notFound:true})
        // }
        // else {
        //     updateSaleState({saleList:filteredProduct[0]});
        // }
        // console.log(saleState.notFound)
    }
  render(){
    return(
        <div>
        <form onSubmit={this.handleFormSubmit}>
            <input name='search' value={this.state.search} onChange={e => this.handleChange(e)} />
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
                {/* {saleState.saleList.map(product => {
                    return (
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                        </tr>
                    )
                })} */}
            </tbody>
        </table>
        </div>
    );
 }
}

export default SaleSearch;