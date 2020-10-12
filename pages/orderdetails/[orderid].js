import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { socket } from '../../components/Layout'



import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements'

import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress';

import { Modal } from 'react-bootstrap'

import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Typography, Button } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';


import SendIcon from '@material-ui/icons/Send';

import Layout from '../../components/Layout'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function OrderDetails() {
    const [order, setOrder] = useState({})
    const [gig, setGig] = useState(null)
    const [msg, setMsg] = useState('')
    const [msgList, setMsgList] = useState([])
    const [show, setShow] = useState(false);
    const [review, setReview] = useState('');
    const [value, setValue] = useState(5);
    const [count, setCount] = useState(0)
    const [chatload, setchatload] = useState(false)

    const [sendmsgprogress, setsendmsgprogress] = useState(false)
    const [sendfileprogress, setsendfileprogress] = useState(false)


    const { user } = useSelector(state => state.auth)
    const router = useRouter()
    const { orderid} = router.query


    const classes = useStyles();
    let lastmsgref = useRef()

    useEffect(() => {
        if (lastmsgref.current) {
            lastmsgref.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            })
        }
    })

    const handleClose = () => {
        setShow(false)


    };

    const handleShow = () => setShow(true);

    let sendReview = () => {
        let newReview = {
            reviewtext: review,
            reviewstar: value,
            reviewgig: gig._id,
            orderid: order._id
        }

        axios.post('/gig/reviewpost', newReview)
            .then(res => {
                if (res.status == 200) {

                    setOrder(res.data.order)
                    console.log(res.data.order);
                    handleClose()
                    setReview('')
                }

            })

    }

    let handlefile = (file) => {
        if (file) {
            setsendfileprogress(true)
            let formdata = new FormData()
            formdata.append('msg', file.name)
            formdata.append('msgfile', file)
            formdata.append('username', user.username)

            axios.put('/order/file/' + orderid, formdata)
                .then(res => {
                    setMsgList(res.data.msg)
                    setsendfileprogress(false)
                })
        }
    }

    useEffect(() => {
        axios.get('/order/single/' + orderid)
            .then(res => {
                setMsgList(res.data.msg)
                console.log(res.data.msg);
                setGig(res.data.gig)
                setOrder(res.data.order)
                setCount(res.data.count);
            })
    }, [orderid])

    let sendMsg = () => {
        setsendmsgprogress(true)
        let newMsg = {
            msg,
            username: user.username
        }
        axios.put(`/order/message/${orderid}`, newMsg)
            .then(res => {
                let last = res.data.msg[res.data.msg.length - 1]
                console.log(last);

                setMsgList(res.data.msg)
                setMsg('')
                setsendmsgprogress(false)

            })
    }

    let handleKey = (e) => {

        if (e.keyCode === 13) {
            e.preventDefault()
            sendMsg()
        }
    }


    let handleDownload = (msg) => {
        if (msg.msgtype === 'file') {
            window.open(msg.url)
        }

    }

     useEffect(() => {

         socket &&
             socket.on('newordersms', data => {
                 if (data) {
                     console.log(data);
                     console.log(msgList);
                     setMsgList([...msgList, data])
                     console.log(msgList);

                 }

             })


     }, [socket, msgList])
    return (
        <Layout>
        <div className='service_wrapper'>

          

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="comment-creator-box">
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
                                <button onClick={() => sendReview()} class="submit-button">Submit</button>
                            </Box>

                        </div>
                    </div>
                </Modal.Body>

            </Modal>









            <div className='row'>
                <div className='col-lg-8 sm-12 orderdeatils'>
                    <div>
                        <h3 >Order for {gig && gig.title} ({order.status == 'accept' ? "active" : order.status})</h3><hr></hr>

                        <p>Webdesign and development</p>
                    </div>


                    {
                        order.status == "delivered" && <div style={{ border: "1px solid gray", padding: "25px 15px", margin: "20px 0" }}>
                            <Typography variant='body'>
                                Admin marked your order delivered
                    </Typography>
                            <Button onClick={() => handleShow()} style={{ position: "absolute", right: "25px" }} variant='outlined'>Accept</Button>
                        </div>
                    }

                    <div>

                        <section class="msger">
                            <header class="msger-header">
                                <div class="msger-header-title">
                                    Chat
                        </div>
                                <div class="msger-header-options">
                                    <span>{chatload && <CircularProgress style={{ width: "20px", header: "20px" }} />}</span>
                                </div>
                            </header>


                            <main class="msger-chat">


                                {
                                    msgList.length > 0 && msgList.map((msg, index) => {
                                        const lastmessage = msgList.length - 1 === index
                                        return <div key={index} ref={lastmessage ? lastmsgref : null}><MessageList
                                            className='message-list'
                                            lockable={true}
                                            toBottomHeight={'100%'}
                                            onClick={() => handleDownload(msg)}
                                            dataSource={[
                                                {
                                                    position: user.username == msg.username ? 'right' : 'left',
                                                    type: msg.msgtype,
                                                    text: msg.msg,
                                                    title: msg.username,

                                                    date: new Date(msg.date),

                                                }
                                            ]} /></div>
                                    })
                                }


                            </main>
                            {
                                order.status !== 'finished' && <div>
                                    <Paper component="form" className={classes.root}>
                                        <label htmlFor="icon-button-file">
                                            <input onChange={(e) => handlefile(e.target.files[0])} style={{ display: "none" }} id="icon-button-file" type="file" />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                {
                                                    sendfileprogress ? <CircularProgress style={{ width: "30px", height: "30px" }} /> : <AttachFileIcon />
                                                }

                                            </IconButton>
                                        </label>
                                        <Divider className={classes.divider} orientation="vertical" />
                                        <form className={classes.input} onSubmit={(e) => e.preventDefault()}>
                                            <InputBase
                                                className={classes.input}
                                                fullWidth
                                                placeholder="Type here ..."
                                                inputProps={{ 'aria-label': 'search google maps' }}
                                                value={msg}
                                                onChange={(e) => setMsg(e.target.value)}
                                                onKeyDown={(e) => { handleKey(e) }}
                                            />
                                        </form>
                                        <Divider className={classes.divider} orientation="vertical" />
                                        <IconButton onClick={() => sendMsg()} className={classes.iconButton} >
                                            {
                                                sendmsgprogress ? <CircularProgress style={{ width: "30px", height: "30px" }} /> : <SendIcon style={{ color: "green" }} />
                                            }

                                        </IconButton>
                                    </Paper>

                                </div>
                            }

                        </section>








                    </div>
                </div>
                <div style={{ backgroundColor: "white", height: "100%", padding: "9px", borderRadius: "5px" }} className='col-lg-3 sm-12 orderdetails_sidebar'>
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
                            <p>Time of delivery</p><h6>7 Days</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default OrderDetails
