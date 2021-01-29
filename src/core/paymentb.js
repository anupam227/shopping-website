import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { cartEmpty, loadCart } from "./helper/cartHelper"
import { getmeToken, processPayment } from "./helper/paymentbhelper"
import { createOrder } from "./helper/orderHelper"
import { isAutheticated } from "../auth/helper"
import DropIn from "braintree-web-drop-in-react"


const Paymentb = ({products, setReload = f => f,reload = undefined}) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAutheticated() && isAutheticated().user._id
    const token = isAutheticated() && isAutheticated().token

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info => {
            //console.log("INFORMATION", info)
            if(info.error){
                setInfo({...info, error: info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    const showbtndropIn = () => {
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn 
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>    
                    </div>
                ):(<h3>Please login or add something to cart</h3>)}
            </div>
        )
    }

    useEffect(() => {
        getToken(userId, token)
    },[])

    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info?.instance?.requestPaymentMethod()?.then(data => {
               nonce = data.nonce
               const paymentData = {
                   paymentMethodNonce: nonce,
                   amount: getAmount()
               }
               processPayment(userId, token, paymentData)
               .then(response => {
                    setInfo({...info, success: response.success, loading: false})
                    
                    const orderData = {
                        products: products,
                        transaction_id: response.transaction_id,
                        amount: response.transaction.amount,
                        status: "Received"
                    }
                    createOrder(userId, token, orderData)
                    cartEmpty(() => {
                        console.log("did we got a crash")
                    })
                    setReload(!reload)
               })
               .catch(error => {
                   setInfo({loading: false, success: false})
               })
           }) 
    }

    const getAmount = () => {
        let amount = Number(0)
        products.map(p => {
            amount = Number(amount) + Number(p.price)
        })
        return amount
    }
    
    return(
        <div>
            <h2>Your bill is {getAmount()}$</h2>
            {showbtndropIn()}
        </div>
    )
}

export default Paymentb