import React from 'react'
import ProfileLayout from '../../components/ProfileLayout'

import { useSelector } from 'react-redux'

function UserProfile() {
    const { profile } = useSelector(state => state.auth)
    return (
        <div>
           
            <ProfileLayout title="Profile">
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
                    <img style={{ maxWidth: "120px", height: '120px', objectFit: "contain" }} src='/4steps2.png'></img>
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
                    <img style={{ maxWidth: "120px", height: '120px', objectFit: "contain" }} src='/4steps3.png'></img>
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
                    <img style={{ maxWidth: "120px", height: '120px', objectFit: "contain" }} src='/4steps4.png'></img>
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
            </ProfileLayout>
        </div>
    )
}

export default UserProfile
