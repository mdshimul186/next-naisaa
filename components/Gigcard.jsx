import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'

import Rating from '@material-ui/lab/Rating';
function Gigcard({gig}) {
  const [count, setcount] = useState(0)
  //get review count
  useEffect(() => {
    axios.get('/gig/reviewcount/'+gig._id)
    .then(res=>{
      setcount(res.data.count)
    })
  }, [gig])

    //trim title
    let string = gig.title
   let length = 50
   let trimmed = string.length > length ?
                    string.substring(0, length-3) + " ...":
                    string
    return (
        <div className='col-lg-3 col-md-6 col-sm-12 my-3'>
            <div className="product-card">
		<div className="badge">{gig.status}</div>
		<div className="product-tumb">
    <Link href={`/service/${gig.slug}`}>
    <a><img src={gig.thumbnail} alt="" /></a>
			
      </Link>
		</div>
		<div className="product-details">
			<span className="product-catagory">Naissa</span>
			<Link href={`/service/${gig.slug}`}><a><p>{trimmed}</p></a></Link>
			<div className="product-bottom-details">
				
				
                <div className="reviewsstar">
            
            <Rating size="small" name="half-rating-read" value={Math.round((gig.star/count)*10)/10} precision={0.1} readOnly />
            
            <p style={{display:"inline-block",color:"gray",fontWeight:"normal"}}>({count})</p>
          </div>

          <div className="product-price">${gig.price}.00</div>
					
				
			</div>
		</div>
	</div>
        </div>
    )
}

export default Gigcard
