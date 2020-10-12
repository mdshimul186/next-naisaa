
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import axios from 'axios'
import { Table, Image, Button, Modal, Form } from 'react-bootstrap'
import moment from 'moment'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function AdminReviews() {
    const [reviewList, setReviewList] = useState([])
    const [show, setShow] = useState(false);
    const [selectedReview, setSelectedReview] = useState({})
    const [reviewtext, setReviewtext] = useState('')
    const [showReviewBox, setShowReviewBox] = useState(false)
    const [showPendingReview, setShowPendingReview] = useState(false)
    const [date, setDate] = useState('');
    const [page, setPage] = useState(0)
    const [LoadButton, setLoadButton] = useState(true)


    const [count, setCount] = useState(0)

    const { setting } = useSelector(state => state.auth)

    const handleClose = () => {
        setShow(false)
        setSelectedReview({})
        setReviewtext('')
        setDate('')
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        setShowReviewBox(setting.showreviewbox);
    }, [setting])

    let handleReview = () => {

        let newReview = {
            reviewtext,
            date: moment(date).toISOString()
        }
        axios.patch('gig/editreview/' + selectedReview._id, newReview)
            .then(res => {
                let temparray = [...reviewList]
                let index = temparray.findIndex(rev => rev._id == res.data.review._id)
                temparray[index] = res.data.review

                setReviewList(temparray)
                handleClose()

            })
    }

    let handleSetting = (e) => {

        let newSetting = {
            showreviewbox: e.target.checked
        }
        axios.patch('/user/setsetting', newSetting)
            .then(res => {
                setShowReviewBox(res.data.setting.showreviewbox);
            })
    }

    let handleSettingPending = (e) => {
        if (e.target.checked) {
            axios.get(`/gig/allreview?page=0&&filter=pending`)
                .then(res => {
                    setReviewList(res.data.review)
                    setShowPendingReview(true)
                    if (res.data.review.length < 50) {
                        setLoadButton(false)
                        setCount(res.data.review.length)

                    } else {
                        setLoadButton(true)
                    
                    }

                })
        } else {
            axios.get(`/gig/allreview?page=0&&filter=active`)
                .then(res => {
                    setReviewList(res.data.review)
                    setShowPendingReview(false)
                    setCount(res.data.count)

                })
        }
    }

    let selectReview = (review) => {
        setSelectedReview(review);
        setReviewtext(review.reviewtext)

        setDate(moment(review.date).format("YYYY-MM-DD"))
        handleShow()
    }

 

    useEffect(() => {
        axios.get(`/gig/allreview?page=${page}&&filter=active`)
        .then(res => {
            setReviewList([...reviewList, ...res.data.review])
            setCount(res.data.count)
            if (res.data.review.length < 50) {
                setLoadButton(false)
            }
            
        })
    }, [])

    let loadMore = (i) => {
        
        axios.get(`/gig/allreview?page=${i}&&filter=active`)
        .then(res => {
            setReviewList(res.data.review)
            if (res.data.review.length < 50) {
                setLoadButton(false)
            }
            setPage(i)

            
        })
        console.log(page,i);

    }


    let List = []
   
       for(let i = 0;i <= (count/50);i++){
     List.push(<li class={`page-item ${i == page && "active"}`}><button onClick={()=>{
         loadMore(i)
         setPage(i)
         }} class="page-link" href="#">{i+1}</button></li>)                       
        
        }
    

    return (
        <div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Enter review text:</Form.Label>
                            <Form.Control value={reviewtext} onChange={(e) => setReviewtext(e.target.value)} type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enter date:</Form.Label>
                            <Form.Control onChange={(e) => setDate(e.target.value)} value={date} type="date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-sm' variant="secondary" onClick={handleClose}>
                        Close
                                </Button>
                    <Button className='btn-sm' onClick={() => handleReview()} variant="primary">
                        save
                                </Button>
                </Modal.Footer>
            </Modal>



            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FormControlLabel
                    value="end"
                    control={<Switch checked={showReviewBox} onChange={(e) => handleSetting(e)} color="primary" />}
                    label="Show review box for all user ?"
                    labelPlacement="start"
                />

                <FormControlLabel
                    value="end"
                    control={<Switch checked={showPendingReview} onChange={(e) => handleSettingPending(e)} color="primary" />}
                    label="Show pending review ?"
                    labelPlacement="start"
                />
            </div>
            <Table style={{ marginTop: "15px", width: "100%" }} striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Review</th>
                        <th>User Name</th>
                        <th>Gig title</th>
                        <th>Review Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reviewList && reviewList.map((review, index) => {
                            return <tr key={index}>
                                <td>{(index + 1)+page*50}</td>
                                <td>{review.reviewtext}</td>
                                <td>{review.reviewby.username}</td>
                                <td>{review.reviewgig.title}</td>
                                <td>{moment(review.date).format('D MMMM YYYY')} {moment(review.date).format() > moment(Date.now()).endOf('day').format() && "(pending)"}</td>
                                <td><Button className='btn-sm' onClick={() => selectReview(review)} >Edit</Button></td>
                            </tr>
                        })
                    }


                </tbody>
            </Table>
            <div style={count>50 ? {display:"block"}:{display:"none"}}>
               

                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class={`page-item ${page == 0 && 'disabled'}`} >
                            <button onClick={()=>{
                                loadMore(page-1)
                                setPage(page-1)
                                }} class="page-link" >Previous</button>
                        </li>

                        {
                            List
                        }
                        
                        <li class={`page-item ${page == Math.ceil(count/50) && 'disabled'}`}>
                            <button onClick={()=>{
                                loadMore(page+1)
                                setPage(page+1)
                                }}
                            class="page-link">Next</button>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default AdminReviews
