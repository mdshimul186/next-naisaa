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



function GigDetails({gigs,count,author}) {
    // const [gig, setGig] = useState(null)
    const [checkout, setCheckout] = useState(false)
    // const [count, setCount] = useState(0)
    // const [author, setAuthor] = useState({})


    
    const router = useRouter()
  const { slug} = router.query
 
    

    const dispatch = useDispatch()
    const { authenticated } = useSelector(state => state.auth)

    // useEffect(() => {
    //     axios.get('/gig/get/single/' + slug)
    //         .then(res => {
    //             setGig(res.data.gig);
    //             setCount(res.data.count);
    //             setAuthor(res.data.author)
    //         })
    // }, [slug])

    //check authentication to checkout
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
        <Layout 
          title={gigs.seo && gigs.seo.seotitle} 
         description={gigs.seo && gigs.seo.seometa} 
     img={gigs && gigs.thumbnail}
     url ={router.asPath}
        >
        
       


        <div className='service_wrapper'>
           
            <div className='row mt-3'>
                <div className='col-lg-8 col-sm-12 '>
                    <div style={{ margin: "auto" }} className='row my-3'>
                        <div className='col-12  col-sm-12 left_col'>
                            {
                                checkout ? <Checkout id={gigs && gigs._id} price={gigs && gigs.price} /> : <>
                                    <div>
                                        <h3 >{gigs && gigs.title}</h3><hr></hr>
                                        <p>{gigs && gigs.category.categoryname}</p>
                                    </div>
                                    <div>
                                        <img style={{ maxWidth: "100%" }} src={gigs && gigs.thumbnail} alt={gigs && gigs.title}></img>
                                    </div>

                                    <div className='mt-3'>
                                        <h6>Description</h6>
                                        {
                                            gigs && <p dangerouslySetInnerHTML={{ __html: gigs.description }}></p>
                                        }

                                    </div>
                                    <div>
                                        <button style={{ backgroundColor: "#1B8785", color: "white" }} onClick={() => handleCheckout()} className='btn btn-lg'>{`Order Now ( $${gigs && gigs.price} )`}</button>

                                    </div>
                                </>
                            }</div>
                        <div className='col-12 mt-4 left_col'>
                            <Review gigid={gigs && gigs._id} />
                        </div>


                    </div>
                </div>



                <div className='col-lg-4 col-sm-12'>
                    <div className='row my-3 ml-3 sm'>
                        <div className='col-md-12 col-sm-12 mb-4 right_col'>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className="reviewsstar">
                                    <Rating size="small" name="half-rating-read" value={gigs && Math.round((gigs.star / count) * 10) / 10} precision={0.1} readOnly />
                                    <span>({count})</span>
                                </div>
                                <div style={{ marginRight: "0" }} className="product-price">${gigs && gigs.price}.00</div>
                            </div><hr></hr>


                            <div >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>Overall rate</p><h6>{gigs && Math.round((gigs.star / count) * 10) / 10}</h6>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>Reviews</p><h6>{count}</h6>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>Time of delivery</p><h6>{gigs && gigs.delivery} Days</h6>
                                </div><hr></hr>
                            </div>
                            <div>
                                <button style={{ backgroundColor: "#1B8785", color: "white" }} onClick={() => handleCheckout()} className='btn btn-primary btn-block'>{checkout ? 'Back' : `Order Now ( $${gigs && gigs.price} )`}</button>
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



export async function getServerSideProps(context){
 
   let res = await axios.get('/gig/get/single/' + context.params.slug)
 

    return {
        props: {gigs:res.data.gig,count:res.data.count,author:res.data.author},
      };
}

export default GigDetails
