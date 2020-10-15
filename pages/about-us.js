import React from 'react'
import Layout from '../components/Layout'

function AboutUs() {
    return (
        <Layout
        title='✎ About Us | Best Place To Hire Freelancers | Hire Expert Freelancers For Any Job Online | Naisaa' 
        description='About Us Owner: A.S Ahad Naisaa.com is an Website  and Graphic Design CompanyDate launched: February 1, 2019 Rajshahi,Dhaka,Bangladesh +8801719870905 support@naisaa.com live: amiseiahad_1 COMPANY STATICS 1 + Tickets Solved 1 + Happy Clients 1 % Positive Reviews' 
        img='/gentleman.jpg'
        >
        <div style={{backgroundColor:"#F5F5F5"}}>
            <div className="page_head" style={{width:"100%", height:"305px",backgroundColor:"#001626", display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h1 style={{color:"white",fontWeight:"bold"}}>About Us</h1>
            </div>
            <div style={{padding:"8%"}} className='row'>
            <div className='col-lg-6 col-sm-12'>
                <img src='/gentleman.jpg'></img>
            </div>
            <div style={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}} className='col-lg-6 col-sm-12 '>
             <div style={{textAlign:"left"}}>
                <h3 style={{color:"#ED5555",fontWeight:"bold"}}>Owner: A.S Ahad</h3>
                <p>Naisaa.com is an Website  and Graphic Design Company<br></br>
                    Date launched: February 1, 2019</p>
                    <ul  className='footer_address'>
              <li><i className="fa fa-map-marker"></i>Rajshahi,Dhaka,Bangladesh</li>
              <li><i className="fa fa-phone-square"></i>WhatsApp : +8801744933864</li>
              <li><i className="fa fa-envelope-o"></i>Mail : support@naisaa.com</li>
              <li><i className="fa fa-skype"></i>Skype : live: amiseiahad_1</li>
             
            </ul>
            </div>
            </div>

            </div>
            
        <section id="facts">
          <div className="container" data-aos="fade-up">

            <header className="section-header">
              <h3>COMPANY STATICS</h3>

            </header>

            <div className="row counters">

              <div className="col-lg-4  text-center">
                <span data-toggle="counter-up">2000+</span>
                <p>Tickets Solved</p>
              </div>

              <div className="col-lg-4 text-center">
                <span data-toggle="counter-up">4000+</span>
                <p>Happy Clients</p>
              </div>

              <div className="col-lg-4  text-center">
                <span data-toggle="counter-up">97%</span>
                <p>Positive Reviews</p>
              </div>


            </div>

            <div className="facts-img">
              <img src="assets/img/facts-img.png" alt="" className="img-fluid" />
            </div>

          </div>
        </section>
        </div>
        </Layout>
    )
}

export default AboutUs