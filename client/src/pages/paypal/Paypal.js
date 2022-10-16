import React, {useState} from 'react'
import ReactDOM  from 'react-dom'
import './paypal.css'

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM }) 

 function Paypal() {
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
    <div className="paypal">
        <div className="wrapper">
            <input type ="text" onChange = {e=>setPrice(e.target.value)} value={price}/>
        <PayPalButton 
        createOrder = {(data, actions) => createOrder(data, actions)}
        onApprove = {(data, actions) => onApprove(data, actions)}
        />
        </div>
    </div>
  )
}
export default Paypal;
