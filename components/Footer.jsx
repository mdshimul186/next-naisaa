import React from 'react'
import {useSelector} from 'react-redux'

function Footer() {
  const {setting} = useSelector(state => state.auth)
    return (
          <footer id="footer">
    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6 footer-info">
          <img style={{maxHeight:"150px"}} src={setting.logoimg}></img>
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
              <li><i className="ion-ios-arrow-right"></i> <a href="#">Home</a></li>
              <li><i className="ion-ios-arrow-right"></i> <a href="#">About us</a></li>
              <li><i className="ion-ios-arrow-right"></i> <a href="#">Services</a></li>
              <li><i className="ion-ios-arrow-right"></i> <a href="#">Terms of service</a></li>
              <li><i className="ion-ios-arrow-right"></i> <a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-contact">
            <h4>Contact Us</h4>
            <p>
              A108 Adam Street <br />
              New York, NY 535022<br />
              United States <br />
              <strong>Phone:</strong> +1 5589 55488 55<br />
              <strong>Email:</strong> info@example.com<br />
            </p>

            <div className="social-links">
              <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
              <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
              <a href="#" className="instagram"><i className="fa fa-instagram"></i></a>
              <a href="#" className="google-plus"><i className="fa fa-google-plus"></i></a>
              <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
            </div>

          </div>

          <div className="col-lg-3 col-md-6 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna veniam enim veniam illum dolore legam minim quorum culpa amet magna export quem marada parida nodela caramase seza.</p>
            <form action="" method="post">
              <input type="email" name="email" /><input type="submit" value="Subscribe" />
            </form>
          </div>

        </div>
      </div>
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong>Naissa</strong>. All Rights Reserved
      </div>
      <div className="credits">
       
      </div>
    </div>
  </footer> 
    )
}

export default Footer
