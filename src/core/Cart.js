import React, { useEffect, useState } from 'react';
import { API } from '../backend';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import Paymentb from './paymentb';

const Cart = () => {

    const [products, setproducts] = useState([])

    const [reload, setReload] = useState(false)
    
    useEffect(() => {
        setproducts(loadCart())
    },[reload])

    const loadAllProducts = (products) => {
        return(
            <div>
                {products.map((product, index) => (
                    <Card 
                    key={index}
                    product={product}
                    addtoCart={false}
                    removefromCart={true}
                    setReload={setReload}
                    reload={reload}
                    />
                ))}
            </div>
        )
    }

    // const loadCheckout = () => {
    //     return(
    //         <div>
    //             <h2>This section is to load products</h2>
    //         </div>
    //     )
    // }

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{products.length > 0 ? loadAllProducts(products):(<h3>No products in the cart</h3>)}</div>       
                <div className="col-6"><Paymentb products={products} setReload={setReload}/></div>       
            </div>
        </Base>
    );
};

export default Cart