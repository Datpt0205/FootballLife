import React, {useState} from 'react'
import ReactDOM  from 'react-dom'
import './paypal.css'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM }) 

 const Paypal = () => {
    const[price, setPrice] = useState(0)
    const createOrder = (data, actions) =>{
        return actions.order.create({
            purchase_units: [
                {
                amount:{
                    value: price,
                }
            }
        ]
        })
    }
    const onApprove = (data, actions) => {
        return actions.order.capture();
    }
  return (
    // <div className="paypal">
    //     <div className="wrapper">
    //         {/* <input type ="text" onChange = {e=>setPrice(e.target.value)} value={price}/> */}
    //     <PayPalButton 
    //     createOrder = {(data, actions) => createOrder(data, actions)}
    //     onApprove = {(data, actions) => onApprove(data, actions)}
    //     />
    //     </div>
    // </div>
    <div className="paypal">
        <div className="wrapper">
    <PayPalScriptProvider options={{ "client-id": "ATqn0QFk_u7gdIMUht3uke2qnNBH2VfILC-BvhaCq1oTf8eDOVWLWxAHVEc7fQfyub6oMoVYMsWK3Mji" }}>
        <PayPalButtons createOrder = {(data, actions) =>{
        return actions.order.create({
            purchase_units: [
                {
                amount:{
                    value: 200.99,
                }
            }
        ]
        })
    }} 
    onApprove = {(data, actions) => {
        return actions.order.capture().then(function (details){
            alert("Transaction completed by " + details.payer.name.given_name);
        })
    }}
    />
    </PayPalScriptProvider>
        </div>
    </div>
  )
}
export default Paypal;
