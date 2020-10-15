import React from 'react'
import Layout from '../components/Layout'

function TrustSafety() {
    return (
        <Layout
         title='Trust and Safety | Best Place To Hire Freelancers | Hire Expert Freelancers For Any Job Online | Naisaa' 
        description='From Naisaa you can hire expert freelancers for any job online . We design and develop professional websites. Visit us today!' 
        img='/trust.jpg'
        >
            <div  style={{backgroundColor:"#F5F5F5", fontSize:"15px"}}>
            <div className="page_head" style={{width:"100%", height:"305px",backgroundColor:"#001626", display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h4 style={{color:"white",fontWeight:"bold"}}>Trust And Safety</h4>
            </div>
            <div className='trust_safety' style={{padding:"8%"}} className='row'>
            <div className='col-lg-4 col-sm-12 trust_safety'>
               <h4>Personal Details</h4>
               <p>Naisaa values your privacy. Your data is secure at all times and we’ll never share your personal information with third parties.​</p>
            </div>
            <div className='col-lg-4 col-sm-12 trust_safety'>
               <h4>Safe Payments</h4>
               <p>All transactions are conducted on the Naisaa platform. Whether a buyer uses a credit card, PayPal or other form of payment, we handle everything, and ensure the security of your personal details.</p>
            </div>
            <div className='col-lg-4 col-sm-12 trust_safety'>
               <h4>Secure Communications</h4>
               <p>You can safely communicate and exchange files with any Seller on Naisaa.com through our secure messaging system.</p>
            </div>
            </div>

        
            <div style={{backgroundImage:`url(/trust.jpg)`,backgroundSize:"cover",backgroundPosition:"center"}}>
            <div style={{backgroundColor:"rgba(0,0,0,0.8)",color:"white",textAlign:"center",padding:"8% 5%",fontSize:"15px"}}>
                <h1>Getting to know your sellers is easy</h1>
                <p>Feedback and reputation are essential to the Naisaa.com marketplace.</p>
                <p>With seller ratings,  and buyer feedback,</p>
                <p>we’ve made it simple to review, compare and purchase the services you need.</p>
                
            </div>

            </div>
     
        </div>
        </Layout>
    )
}

export default TrustSafety
