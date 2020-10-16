import React from 'react'
import Layout from '../components/Layout'

function BuyingOnNaissa() {
    return (
        <Layout
        title='Buying on Naisaa | Best Place To Hire Freelancers | Hire Expert Freelancers For Any Job Online | Naisaa' 
        description='From Naisaa you can hire expert freelancers for any job online . We design and develop professional websites. Visit us today!' 
        img='/buying.jpg'
        >
        <div style={{ backgroundColor: "#F5F5F5" }}>
            <div className="page_head" style={{ width: "100%", height: "305px", backgroundColor: "#001626", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ color: "white", fontWeight: "bold" }}>Buying On Naisaa</h1>
            </div>
            <div style={{ padding: "8%" }} className='row'>
            
              <div className='contact_form' style={{width:"60%",margin:"0 auto",textAlign:"center",boxShadow:"3px 3px 3px #ccc", padding:"10px",backgroundColor:"white"}}>
                  <h5>Request A Custom Offers</h5>
                  <p>Too busy to browse for services? Just ask for what you need done, set your delivery time, budget, and send custom offers straight to the seller  inbox.</p>
                  <img src='/Custom-offers.png' alt='custom offer'></img>
              </div>
            </div>
            <div style={{backgroundImage:`url(/buying.jpg)`,backgroundSize:"cover",backgroundPosition:"center"}}>
            <div style={{backgroundColor:"rgba(0,0,0,0.8)",color:"white",textAlign:"center",padding:"8% 5%",fontSize:"15px"}}>
                <h1>3 Easy Steps To Find A Freelancer:</h1>
                <p>Use Naisaa’s search and side filters, to find the right freelancer for your project.</p>
                <p>Once you’ve found a service you’d like to order, click the Service. Choosing the right freelancer is easy:</p>
                <p>1. Check out the freelancer’s work samples.</p>
                <p>2. Check out the feedback from buyers like you.</p>
                <p>3. Choose the package that best fits your needs.</p>
                <p>Contact the freelancer with any questions to make sure they are aligned with your expectations.</p>
            </div>

            </div>


       </div>
    </Layout>
    )
}

export default BuyingOnNaissa
