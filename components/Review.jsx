import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Avatar, Typography, Button } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import moment from 'moment'

import CircularProgress from '@material-ui/core/CircularProgress';
function Review({ gigid }) {


    const [reviewList, setReviewList] = useState([]);
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)
    const [LoadButton, setLoadButton] = useState(true)
    const [review, setReview] = useState('');
    const [value, setValue] = useState(5);
    const [reviewBox, setReviewBox] = useState(false)
    const [loading, setLoading] = useState(false)

    const { authenticated, setting } = useSelector(state => state.auth)

    //check wheather a user can post review or not
    useEffect(() => {
        if (authenticated) {
            if (setting) {
                setReviewBox(setting.showreviewbox)
            }
        }
    }, [setting, authenticated])

    //fetching all review
    let fetchreview = () => {
        setLoading(true)
        axios.get(`/gig/getreview/${gigid}?page=${page}`)
            .then(res => {
                setReviewList([...reviewList, ...res.data.review]);
                if (res.data.review.length < 5) {
                    setLoadButton(false)
                }
                setCount(res.data.count)
                setPage(page + 1)
                setLoading(false)
            })
    }
    //posting new review
    let sendReview = () => {
        let newReview = {
            reviewtext: review,
            reviewstar: value,
            reviewgig: gigid,

        }

        axios.post('/gig/generalreview', newReview)
            .then(res => {
                if (res.status == 200) {

                    setReviewList([res.data.review, ...reviewList])

                    setReview('')
                    setValue(5)
                }

            })

    }

    //fetch acording to page
    useEffect(() => {
        fetchreview()
    }, [gigid])

    let loadMore = () => {

        fetchreview()

    }

    return (
        <div className='p-3 '>
            <h5>LAST PURCHASED PEOPLES ({count}) </h5>
            {
                reviewBox && <div className="comment-creator-box">
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder='write your review..' name="comment-box" id="comment-box"></textarea>
                    <div>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Select score</Typography>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <button onClick={() => sendReview()} className="submit-button">Submit</button>
                        </Box>

                    </div>
                </div>
            }



            {
                reviewList.length > 0 ? reviewList.map((review, index) => {
                    return <div key={index} style={{ borderBottom: "1px solid #BDBDBD" }} className='row my-3'>
                        <div className='col-2 d-flex align-items-center justify-content-center'><Avatar src={review.reviewby.profileimg} /></div>
                        <div className='col-10'>

                            <div className='row d-flex justify-content-between my-2'>
                                <div style={{ flex: "5" }}><Typography style={{ color: 'back' }} variant='h6'>{review.reviewby.username}</Typography></div>
                                <div style={{ flex: "1" }}><Rating name="read-only" value={parseInt(review.reviewstar)} readOnly /></div>
                            </div>
                            <div className='row my-2'><Typography style={{ color: 'gray' }} variant='caption'>{moment(review.date).fromNow()}</Typography></div>
                            <div className='row my-2'><Typography variant='body2'>{review.reviewtext}</Typography></div>

                        </div>

                    </div>
                }) : <p>No review found</p>
            }


            <div style={{ textAlign: "center" }}>
                {
                    LoadButton && <Button onClick={() => loadMore()} variant="outlined">
                        {loading ? <CircularProgress style={{ height: "30px", width: "30px" }} /> : 'Load more ...'}
                    </Button>
                }

            </div>

        </div>
    )
}

export default Review
