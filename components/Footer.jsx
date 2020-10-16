import React from 'react'
import {useSelector} from 'react-redux'
import Link from 'next/link'

function Footer() {
  const {setting} = useSelector(state => state.auth)
    return (
          <footer id="footer">
    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6 footer-info">
          <img style={{maxHeight:"150px"}} src={setting.logoimg} alt='naisaa hire freelancer'></img>
            <h6>Company Location</h6>
            <ul  className='footer_address'>
              <li><i className="fa fa-map-marker"></i>Rajshahi,Dhaka,Bangladesh</li>
              <li><i className="fa fa-phone-square"></i>WhatsApp : +8801744933864</li>
              <li><i className="fa fa-envelope-o"></i>Mail : support@naisaa.com</li>
              <li><i className="fa fa-skype"></i>Skype : live: amiseiahad_1</li>
             
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li> <Link href="/about-us"><a>About Us</a></Link></li>
              <li> <Link href="/support"><a>Support</a></Link></li>
              <li> <Link href="/privacy-policy"><a>Privacy & Policy</a></Link></li>
              <li> <Link href="/terms-and-conditions"><a>Terms And Conditions</a></Link></li>
              
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-contact footer-links">
            <h4>Join</h4>
            <ul >
              <li style={{ borderBottom:"0"}}><i className="ion-ios-arrow-right"></i> <Link href="/trust-and-safety"><a>Trust and Safety</a></Link></li>
              <li style={{ borderBottom:"0"}}><i className="ion-ios-arrow-right"></i> <Link href="/selling-on-naisaa"><a>Selling on Naisaa</a></Link></li>
              <li style={{ borderBottom:"0"}}><i className="ion-ios-arrow-right"></i> <Link href="/buying-on-naisaa"><a>Buying on Naisaa</a></Link></li>
              <li style={{ borderBottom:"0"}}><i className="ion-ios-arrow-right"></i> <Link href="/terms-and-conditions"><a>Terms of service</a></Link></li>
       
            </ul>

            

          </div>

          <div className="col-lg-3 col-md-6 footer-newsletter">
            <h4>Accept Payments</h4>
            <img style={{marginBottom:"10px"}} src='/payment.jpg' alt='payment method'></img>
            {/* <form action="" method="post">
              <input type="email" name="email" /><input type="submit" value="Subscribe" />
            </form> */}
            <div style={{margtinTop:"10px"}} className="social-links">
              <a style={{backgroundColor:"#3C589A"}} target='_blank' href="https://web.facebook.com/naisaa.official" className="facebook"><i className="fa fa-facebook"></i></a>
              <a style={{backgroundColor:"#55ACEE"}} target='_blank' href="https://twitter.com/naisaa_official" className="twitter"><i className="fa fa-twitter"></i></a>
              <a style={{backgroundColor:"#C13584"}} target='_blank' href="https://www.instagram.com/naisaa.official/" className="instagram"><i className="fa fa-instagram"></i></a>
              <a style={{backgroundColor:"#0077B5"}} target='_blank' href="https://www.linkedin.com/in/naisaa-freelancing-company-7545041a4/" className="linkedin"><i className="fa fa-linkedin"></i></a>
            </div>

            <a target="_blank" style={{width:"165px", height:"55px", marginTop:"10px"}} href='https://play.google.com/store/apps/details?id=com.naisaa941222.ahad78103&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
          </div>

        </div>
      </div>
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong>Naisaa</strong>. All Rights Reserved
      </div>
      <div className="credits">
       
      </div>
    </div>
  </footer> 
    )
}

export default Footer
