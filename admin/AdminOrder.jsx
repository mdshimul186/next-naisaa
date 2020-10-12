import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import {Table, Modal, Button,Form} from 'react-bootstrap'
import ChatComp from '../components/ChatComp'

function AdminOrder() {
    const [orderlist, setOrderlist] = useState([])
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [load, setLoad] = useState(false)
    const [selctedId, setSelectedId] = useState('')
    const [status, setStatus] = useState('')
    const [updateOrder, setUpdateOrder] = useState('')

    const handleClose = () => {
        setShow(false)
        setSelectedId('')
    };

    const handleClose2 = () => {
        setUpdateOrder('')
        setShow2(false)
       
    };
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);

    let handleId=(id)=>{
        handleShow()
        setSelectedId(id)
    }

    let orderAction=()=>{
        console.log(status,updateOrder.orderby);
        let newStatus={
            status,
            orderby:updateOrder.orderby
        }

        if(status != ''){
            axios.patch('/order/set/'+updateOrder._id,newStatus)
            .then(res=>{
                console.log(res.data.order);
                let tempArray = [...orderlist]
                let index = tempArray.findIndex(or=>or._id == res.data.order._id)
                tempArray[index] = res.data.order

                setOrderlist(tempArray)
                handleClose2()
            })
        }
    }

    let handlesetUpdate=(order)=>{
        setUpdateOrder(order)
        setShow2(true)
    }

    useEffect(() => {
     axios.get('/order/allorder')
     .then(res=>{
         setOrderlist(res.data.order)
     })
    }, [])
    return (
        <div>


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
                                <ChatComp id={selctedId}/>
                                </Modal.Body>
                              
                        </Modal>

                        <Modal
                                show={show2}
                                onHide={handleClose2}
                                backdrop="static"
                                keyboard={false}
                        >
                                <Modal.Header closeButton>
                                <Modal.Title>Contact</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Select Status</Form.Label>
                                            <Form.Control as="select" onChange={(e)=>setStatus(e.target.value)}>
                                            <option value='default'>select a status</option>
                                            <option value='pending'>Pending</option>
                                            <option value='accept'>Accept</option>
                                            <option value='reject'>Reject</option>
                                            <option value='delivered'>Delivered</option>

                                            </Form.Control>
                                        </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button className='btn-sm' variant="secondary" onClick={handleClose2}>
                                Close
                                </Button>
                                <Button onClick={()=>orderAction()} className='btn-sm'  variant="primary">
                                        save
                                </Button>
                                </Modal.Footer>
                        </Modal>


            <Table style={{marginTop:"15px"}} striped bordered hover size="sm">
                        <thead>
                        <tr>
                        <th>#</th>
                        <th>Order for</th>
                 
                        <th>amount</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Contact</th>
                        <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            orderlist.length>0 && orderlist.map((order, index)=>{
                               return <tr key={index}>
                                <td>{index+1}</td>
                                <td><Link href={`/${order.orderedgig.slug}`}>{order.orderedgig.title}</Link></td>
                                <td>{order.amount} $</td>
                                <td>{order.orderby.username}</td>
                                <td>{order.status}</td>
                                <td><Button onClick={()=>handleId(order._id)}>Contact</Button></td>
                                <td><Button onClick={()=>handlesetUpdate(order)}>Action</Button></td>
                                </tr>
                           })
                        }
                        
                        
                        </tbody>
                        </Table>
        </div>
    )
}

export default AdminOrder
