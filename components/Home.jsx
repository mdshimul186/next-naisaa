import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import axios from 'axios'



function HomePage() {
  const [categories, setCategories] = useState(null)
  const { setting } = useSelector(state => state.auth)

  useEffect(() => {
    axios.get('/category/get')
      .then(res => {
        setCategories(res.data.category)
      })
  }, [])
  return (
    <>
     


      <section style={{ backgroundImage: `url(${setting.homeimg})` }} id="intro">
        <div className="intro-container">
          <div id="introCarousel" className="carousel  slide carousel-fade" data-ride="carousel">

            <ol className="carousel-indicators"></ol>

            <div className="carousel-inner" role="listbox">

              <div className="carousel-item active" >
                <div className="carousel-container">
                  <div className="container">
                    <h1  className="animate__animated animate__fadeInDown">Best Place To Hire Freelancers</h1>
                    <p className="animate__animated animate__fadeInUp">Want to take a shortcut !</p>
                    <Link  href="/service" ><a className="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a></Link>
                  </div>
                </div>
              </div>



            </div>



          </div>
        </div>
      </section>

      <main id="main">


        {/* <section id="featured-services">
          <div className="container ">
            <div className="row">

              <div className="col-lg-4 box  d-flex align-items-center justify-content-center">
                <a style={{ backgroundColor: '#1B8785', color: "white" }} className='btn btn-lg py-3 px-5' href="">I want to buy</a>

              </div>

              <div className="col-lg-4 box d-flex align-items-center justify-content-center">
                <a style={{ backgroundColor: '#1B8785', color: "white" }} className='btn btn-lg py-3 px-5' href="">Become an affliate</a>
              </div>

              <div className="col-lg-4 box d-flex align-items-center justify-content-center">
                <a style={{ backgroundColor: '#1B8785', color: "white" }} className='btn btn-lg py-3 px-5' href="">I want to sell</a>
              </div>

            </div>
          </div>
        </section> */}


        <section id="about">
          <div className="container" data-aos="fade-up">

            <header className="section-header text-center">
              <h3>Hire Expert Freelancers For Any Job Online</h3>
              <p>From Naisaa you can hire expert freelancers for any job online.  where you can meet professionals to get your job done in a highly efficient manner. Our website is well-curated to serve you the convenience of hiring professionals. When you are looking for the best place to hire freelancers, opt for us to get options that are smart and professionally-savvy.Build your online business with our freelancers. Place your order and get it before the delivey time. </p>
              <h2>Our categories</h2>
            </header>

            <div className="row about-cols">
              {
                categories && categories.map((category, index) => {
                  return <div key={index} className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="about-col">
                      <div className="img">
                        <Link href={`/categories/${category.categoryslug}/`}>
                          <a><img src={category.categoryimg} alt={category.categoryname} className="img-fluid" /></a>
                        </Link>
                      </div>
                      <h2 className="my-3"><Link href={`/categories/${category.categoryslug}`}><a>{category.categoryname}</a></Link></h2>

                    </div>
                  </div>
                })
              }




            </div>

          </div>
        </section>


        <section id="services">
          <div className="container" data-aos="fade-up">

            <header className="section-header wow fadeInUp">
              <h3>EASY 4 STEP GUIDE</h3>

            </header>

            <div className="row">

              <div className="col-lg-6 col-md-6 box">
                <div className='row'>
                  <div className='col-2'>
                    <img style={{ maxWidth: "120px", height: '120px', objectFit: "contain" }} src='/4steps1.jpg' alt='Review sellers profile'></img>
                  </div>
                  <div className='col-10'>

                    <h4 className="title">Review sellers profile</h4>
                    <p className="description">Check out a seller rating before place your order, reviews from previous buyers and read about the areas they specialise in, so you can be confident they’re a good match.</p>
                  </div>
                </div>
              </div>


              <div className="col-lg-6 col-md-6 box">
                <div className='row'>
                  <div className='col-2'>
                    <img style={{ maxWidth: "120px", height: '120px', objectFit: "contain" }} src='/4steps2.png' alt='Place your order'></img>
                  </div>
                  <div className='col-10'>

                    <h4 className="title">Place your order</h4>
                    <p className="description">Select a service you need, you can add extra service for more option, and place the order. If the seller is unable to fulfil your order, you’ll get an automatic refund.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 box">
                <div className='row'>
                  <div className='col-2'>
                    <img style={{ maxWidth: "120px", height: '120px', objectFit: "contain" }} src='/4steps3.png' alt='See the results'></img>
                  </div>
                  <div className='col-10'>

                    <h4 className="title">See the results</h4>
                    <p className="description">The naisaa guarantee is for all sellers to start delivering order within the delivery time of your order. You’ll get high quality and professional work flowing to your offer.</p>
                  </div>
                </div>
              </div>



              <div className="col-lg-6 col-md-6 box">
                <div className='row'>
                  <div className='col-2'>
                    <img style={{ maxWidth: "120px", height: '120px', objectFit: "contain" }} src='/4steps4.png' alt='Rate your seller'></img>
                  </div>
                  <div className='col-10'>

                    <h4 className="title">Rate your seller</h4>
                    <p className="description">When you’re done, then leave a feedback to your seller profile. Reviews are really important on Naisaa to help buyers like you find the right seller for their needs.</p>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </section>


        {/* <section id="call-to-action">
          <div className='row'>
            <div className='col-lg-6 py-3'>
              <div className="container text-center" data-aos="zoom-in">
                <h3>Earn money while you sleep -Affiliate Marketing</h3>
                <p>Affiliate marketing is the most popular and easy way to make money from a website or landing page . You don’t need to spend any time, you can make passive income without touching your website or landing page .

You don’t need to deliver any products , We will build your website and also upload  the top selling affiliate products  on your site. When your customers will visit your website and purchase any products via  your affiliate link then you can earn. </p>
                <a className="cta-btn" href="#">Get started now</a>
              </div>
            </div>
            <div className='col-lg-6 d-flex justify-content-center'>
              <img style={{ height: '350px', width: "90%" }} src='https://www.naisaa.com/wp-content/uploads/2020/09/7582-copy-1536x1536.jpg'></img>
            </div>
          </div>
        </section> */}




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

            

          </div>
        </section>


        <section id="call-to-action">
          <div className='row'>
            <div className='col-lg-8'>
              <div className="container text-center" data-aos="zoom-in">
                <h3>Our expert team always working for you 24/7</h3>


              </div>
            </div>
            <div className='col-lg-4 text-center'>
              <Link  href="/service"><a className="cta-btn">Hire a freelancer</a></Link>
            </div>
          </div>
        </section>


      </main>



    </>
  )
}

export default HomePage
