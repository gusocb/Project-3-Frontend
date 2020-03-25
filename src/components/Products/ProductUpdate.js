import React, {useState} from 'react';
import {useParams} from 'react-router-dom'
import 'bulma/css/bulma.css';

const ProductUpdate = () =>{

    const {id} = useParams();
    const [formState, updateFormState] = useState({
        barcode: "",
        name:"",
        price: "",
        stock:""
    });

    

    return(
        <form>
            <div className="field">
                <label class="label">Barcode</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Here goes the code" />
                </div>
            </div>

            <div className="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Here goes the name" />
                </div>
            </div>

            <div className="field">
                <label class="label">Price</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Here goes the price" />
                </div>
            </div>

            <div className="field">
                <label class="label">Stock</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Here goes the stock" />
                </div>
            </div>
        </form>
    )
}

export default ProductUpdate;