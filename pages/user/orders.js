import React,{useState,useEffect} from 'react'
import Link from 'next/link'

import ProfileLayout from '../../components/ProfileLayout'
import axios from 'axios'
import {useSelector} from 'react-redux'


import CircularProgress from '@material-ui/core/CircularProgress';

function OrderProfile() {
    const [orderlist, setOrderlist] = useState([])
    const [load, setLoad] = useState(false)
    const {user} = useSelector(state=>state.auth)
    useEffect(() => {
        setLoad(true)
       axios.get('/order/get')
       .then(res=>{
           setOrderlist(res.data.order)
           setLoad(false)
       })
    }, [])
    return (
        <div>
          
        <ProfileLayout title="Orders">

        {
            load ?<div  style={{textAlign:"center"}}> <CircularProgress /></div> :
            orderlist.length>0 ? orderlist.map((order,index)=>{
                return  <Link  key={index} href={`/orderdetails/${order._id}`}><a>
                        <div className='list_wrapper' style={{display:"flex",justifyContent:"space-around"}}>
                            <div style={{height:"150px",objectFit:"contain",flex:"1"}}  className="product-card orderlist">
                                <div className="badge">{order.status == 'accept' ? "active" :order.status}</div>
                                <div >
                                    <img style={{height:"150px",width:"250px"}} src={order.orderedgig.thumbnail} alt="" />
                                </div>	
                            </div>
                            <div className='orderlist_author' style={{flex:"4",display:"flex",flexDirection:"column",marginLeft:"10px",padding:"10px",backgroundColor:"white"}}>
                                <h4>Order for {order.orderedgig.title}</h4>
                                <div  style={{display:"flex"}}><p style={{marginRight:"10px"}}>Price: </p><h5>{order.orderedgig.price} $</h5></div>
                                <p>Author: Naissa</p>
                            </div>
                        </div><hr></hr></a></Link>
            }):<div  style={{textAlign:"center"}}><p>No orders found</p></div>
        }




        </ProfileLayout>
            
        </div>
    )
}

export default OrderProfile
