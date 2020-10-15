import React from 'react'
import Layout from '../components/Layout'

function SellingOnNaissa() {
    return (
        <Layout
        title='Selling on Naisaa | Best Place To Hire Freelancers | Hire Expert Freelancers For Any Job Online | Naisaa' 
        description='From Naisaa you can hire expert freelancers for any job online . We design and develop professional websites. Visit us today!' 
        img='/selling.jpg'
        >
            <div style={{ backgroundColor: "#F5F5F5" }}>
                <div className="page_head" style={{ width: "100%", height: "305px", backgroundColor: "#001626", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ color: "white", fontWeight: "bold" }}>Selling On Naisaa</h1>
                </div>
                <div style={{ padding: "8%" ,textAlign:"center"}} >
                <div style={{ boxShadow:"2px 2px 2px 2px #ccc",backgroundColor:"white",padding:"10px"}}>
                    <div  className='row'>
                        <div className="col-12">
                            <h3 style={{fontWeight:"bold"}}>How to Start Selling on Naisaa</h3>
                            <p>Naisaa.com is the most popular marketplace for digital services. So, if you have a talent,
                            you can share that talent with our buyer community and make money while you are at it.
                            Whether you are a graphic designer, programmer, or voice over artist, Naisaa.com has a place for you.
                            </p>
                        </div>

                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-6 col-sm-12'>
                            <h5 style={{fontWeight:"bold"}}>Creating Your Seller Profile</h5>
                            <p>First, you will need to create your seller profile. Your profile is how you present yourself to the community. You are encouraged to present yourself in a professional manner.</p>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <h5 style={{fontWeight:"bold"}}>Creating Your MJOB</h5>
                            <p>Your MJOB is the service that you sell on Naisaa.com. Creating your MJOB is an opportunity to show off your talent and provide buyers with all the information they need to help them decide to do business with you.</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div style={{backgroundImage:`url(/selling.jpg)`,backgroundSize:"cover",backgroundPosition:"center"}}>
            <div style={{backgroundColor:"rgba(0,0,0,0.8)",color:"white",textAlign:"center",padding:"8% 5%",fontSize:"15px"}}>
                <div className='row'>
                    <div style={{marginTop:"8%"}} className='col-lg-6 com-sm-12 '>
                        <h1 style={{fontWeight:"bold"}}>For any inquiries please email</h1>
                        <h5>support@naisaa.com</h5>
                        <div style={{margtinTop:"10px"}} className="social-links_selling ">
              <a style={{backgroundColor:"#3C589A"}} target='_blank' href="https://web.facebook.com/naisaa.official" className="facebook"><i className="fa fa-facebook"></i></a>
              <a style={{backgroundColor:"#55ACEE"}} target='_blank' href="https://twitter.com/naisaa_official" className="twitter"><i className="fa fa-twitter"></i></a>
              <a style={{backgroundColor:"#C13584"}} target='_blank' href="https://www.instagram.com/naisaa.official/" className="instagram"><i className="fa fa-instagram"></i></a>
              <a style={{backgroundColor:"#0077B5"}} target='_blank' href="https://www.linkedin.com/in/naisaa-freelancing-company-7545041a4/" className="linkedin"><i className="fa fa-linkedin"></i></a>
            </div>
                    </div>
                    <div className='col-lg-6 com-sm-12 mt-3 '>
                    <iframe style={{width:"100%", height:"400px"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58144.494516154875!2d88.57099626626206!3d24.38022820474405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa96a38d031%3A0x10f93a950ed6f410!2sRajshahi!5e0!3m2!1sen!2sbd!4v1602741623287!5m2!1sen!2sbd"></iframe>

                    </div>
                </div>
                
            </div>

            </div>
            </div>
        </Layout>
    )
}

export default SellingOnNaissa
