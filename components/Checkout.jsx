import React from 'react';
import axios from 'axios'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import {setToast} from '../components/ToastMsg'
 
export default class Checkout extends React.Component {
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
                    
                    if(payment.paid){
                        let newpayment ={
                            payerid:payment.payerID,
                            paymentid: payment.paymentID,
                            token:payment.paymentToken,
                            amount:this.props.price,
                            orderedgig:this.props.id
                        }
                        axios.post('/order/add', newpayment)
                        .then(res=>{
                            if(res.data.success){
                                setToast("Order successfully created","success")
                                window.location.pathname='/user/orders'
                                
                            }
                        })
                    }
                    
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            alert('The payment was cancelled!');
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = this.props.price; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    'AaiItgRshEhyd0vmQORxqph-Lb04-3EUL0ICboZpRxKctkmQd2Ge8vE4yMLQDTT7trXdft5fXS9OcoKN',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <div  style={{margin:"30px"}}>
            <div style={{display:'flex', justifyContent:"space-around",width:"50%"}}>
                <p>Total:</p><h5>{this.props.price } $</h5>
            </div>
            <div style={{margin:"30px"}}>
            <PaypalExpressBtn style={{size:"large",color:"blue",shape:"rect",labe:"checkout"}} env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
            </div>
            </div>
        );
    }
}
