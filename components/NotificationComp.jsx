import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios'

import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

export default function NotificationComp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [count, setCount] = useState(0)
  const [unseenList, setUnseenList] = useState([])

  const {notification} = useSelector(state=>state.auth)
  const router = useRouter()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //get unread notification and count
  useEffect(() => {
    if(notification.length >0){
      let length = notification.filter(not=>not.isseen == false)
      setUnseenList(length)
      setCount(length.length)
    }
  }, [notification])

  const handleClose = () => {
    setAnchorEl(null);
  };
//rote to push user wen click in notification
  let handlePath=(not)=>{
      handleClose()
      if(not.path.length > 0){
        router.push(not.path)
      }
  }
  //mark notification seen
  let handleSeen=()=>{
    
    if(unseenList.length > 0){
      let id = []
      unseenList.map(not=>{
          id.push(not._id)
      })
      axios.patch('/user/markread/',{id:[...id]})
      .then(res=>{
        if(res.data.success){
          setCount(0)
        }
      })

    }
  }
  return (
    <div>
     
      <Badge onClick={handleClick} badgeContent={count} color="secondary">
        <NotificationsNoneIcon  />
      </Badge>

      <Menu
      
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        onEntered={()=>handleSeen()}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      {
        notification.length > 0? notification.map((not,index)=>{
        return <MenuItem style={not.isseen ? {color:'gray'}: {color:'black'}} key={index} onClick={()=>handlePath(not)}>{not.text} </MenuItem>
        })  : <p>No notification found</p>
      }
        
        
      </Menu>
    </div>
  );
}
