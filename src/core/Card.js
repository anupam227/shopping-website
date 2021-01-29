import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/Imagehelper";

const Card = ({ product,addtoCart=true,removefromCart=false,
   setReload = f => f, reload = undefined }) => {


  const [redirect, setRedirect] = useState(false)

  const cartTitle = product ? product.name: "A phtot from pexels"
  const cartDescription = product ? product.description: "Default description"
  const cartPrice = product ? product.price: "Default Price"
        
  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true))
  }
  const getARedirect = (redirect) => {
    if(redirect) {
      return <Redirect to="/Cart" />
    }
  }

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    )
  }
  const showRemovefromCart = removefromCart => {
    return(
      removefromCart && (
        <button
            onClick={() => {
              removeItemFromCart(product._id)
              setReload(!reload)
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
      )
    )
  }
  return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
              {getARedirect(redirect)}
              <div className="rounded border border-success p-2">
              <ImageHelper  product={product}/>  
              </div>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cartDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
              <div className="row">
                <div className="col-12">{showAddToCart(addtoCart)}</div>
                <div className="col-12">{showRemovefromCart(removefromCart)}</div>
              </div>
            </div>
          </div>
        );
}

export default Card;