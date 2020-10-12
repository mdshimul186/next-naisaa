import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Checkout from '../../components/Checkout'
import Review from '../../components/Review'
import AuthorDetails from '../../components/AuthorDetails'
import { useRouter } from 'next/router'

import Rating from '@material-ui/lab/Rating';
import Layout from '../../components/Layout'

import Head from 'next/head'
import { NextSeo } from 'next-seo';



function GigDetails({gigs}) {
    const [gig, setGig] = useState(null)
    const [checkout, setCheckout] = useState(false)
    const [count, setCount] = useState(0)
    const [author, setAuthor] = useState({})


    
    const router = useRouter()
  const { slug} = router.query
    

    const dispatch = useDispatch()
    const { authenticated } = useSelector(state => state.auth)

    useEffect(() => {
        axios.get('/gig/get/single/' + slug)
            .then(res => {
                setGig(res.data.gig);
                setCount(res.data.count);
                setAuthor(res.data.author)
            })
    }, [slug])

    let handleCheckout = () => {
        if (authenticated) {
            setCheckout(!checkout)
        } else {
            dispatch({
                type: "SHOW_SIGNIN"
            })
        }
    }

     

    return (
        <Layout >
        {gig && 
         <NextSeo
      title={gig.seo.seotitle}
      description={gig.seo.seometa}
      canonical="https://www.canonical.ie/"
      openGraph={{
        url: 'https://www.url.ie/a',
        title: gig.seo.seotitle,
        description: gig.seo.seometa,
        images: [
          {
            url: gig.thumbnail,
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
          },
          {
            url: gig.thumbnail,
            width: 900,
            height: 800,
            alt: 'Og Image Alt Second',
          },
          { url: gig.thumbnail },
          { url: gig.thumbnail },
        ],
        site_name: 'SiteName',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    }


        <div className='service_wrapper'>
           
            <div className='row mt-3'>
                <div className='col-lg-8 col-sm-12 '>
                    <div style={{ margin: "auto" }} className='row my-3'>
                        <div className='col-12  col-sm-12 left_col'>
                            {
                                checkout ? <Checkout id={gig && gig._id} price={gig && gig.price} /> : <>
                                    <div>
                                        <h3 >{gig && gig.title}</h3><hr></hr>
                                        <p>Webdesign and development</p>
                                    </div>
                                    <div>
                                        <img style={{ maxWidth: "100%" }} src={gig && gig.thumbnail}></img>
                                    </div>

                                    <div className='mt-3'>
                                        <h6>Description</h6>
                                        {
                                            gig && <p dangerouslySetInnerHTML={{ __html: gig.description }}></p>
                                        }

                                    </div>
                                    <div>
                                        <button style={{ backgroundColor: "#1B8785", color: "white" }} onClick={() => handleCheckout()} className='btn btn-lg'>{`Order Now ( $${gig && gig.price} )`}</button>

                                    </div>
                                </>
                            }</div>
                        <div className='col-12 mt-4 left_col'>
                            <Review gigid={gig && gig._id} />
                        </div>


                    </div>
                </div>



                <div className='col-lg-4 col-sm-12'>
                    <div className='row my-3 ml-3 sm'>
                        <div className='col-md-12 col-sm-12 mb-4 right_col'>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className="reviewsstar">
                                    <Rating size="small" name="half-rating-read" value={gig && Math.round((gig.star / count) * 10) / 10} precision={0.1} readOnly />
                                    <span>({count})</span>
                                </div>
                                <div style={{ marginRight: "0" }} className="product-price">${gig && gig.price}.00</div>
                            </div><hr></hr>


                            <div >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>Overall rate</p><h6>{gig && Math.round((gig.star / count) * 10) / 10}</h6>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>Reviews</p><h6>{count}</h6>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>Time of delivery</p><h6>{gig && gig.delivery} Days</h6>
                                </div><hr></hr>
                            </div>
                            <div>
                                <button style={{ backgroundColor: "#1B8785", color: "white" }} onClick={() => handleCheckout()} className='btn btn-primary btn-block'>{checkout ? 'Back' : `Order Now ( $${gig && gig.price} )`}</button>
                            </div>
                        </div>
                        <div className='col-md-12 col-sm-12 right_col'><AuthorDetails author={author} /></div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default GigDetails
