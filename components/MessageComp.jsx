import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios'
import Link from 'next/link'
import {useRouter} from 'next/router'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import ChatIcon from '@material-ui/icons/Chat';
import { ChatItem  } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';

export default function MessageComp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [count, setCount] = useState(0)
  const [msgs, setmsgs] = useState([])
 

  const {notification,messages,user} = useSelector(state=>state.auth)
  let history = useRouter()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if(messages){
      setmsgs(messages)
      let length = messages.filter(msg=>msg.isseen == user._id)
      setCount(length.length)
      
    }
    
  })

  const handleClose = () => {
    setAnchorEl(null);
  };

  let markMessageRead=(msg)=>{
    axios.patch('/user/markmessageread/'+msg._id)
    .then(message=>{
      setCount(count - 1)
    })
  }

  let handlePath=(msg)=>{
      handleClose()
      if(msg.isseen == user._id){
        markMessageRead(msg)
      }
      
        history.push(`/user/chat/${msg.room[msg.room.findIndex(m=> m.username !== user.username)].username}`)
      
  }



  return (
    <div>
     
      <Badge onClick={handleClick} badgeContent={count} color="secondary">
        <ChatIcon />
      </Badge>

      <Menu
      
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
     
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      {
        msgs ? msgs.map((msg,index)=>{
        return <MenuItem  key={index} onClick={()=>handlePath(msg)}>
        <Link href={`/user/chat/${msg.room[msg.room.findIndex(m=> m.username !== user.username)].username}`}>
                    <ChatItem
                        
                        avatar={'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png'}
                        alt={'user'}
                        title={msg.room[msg.room.findIndex(m=> m._id !== user._id)].username}
                        subtitle={msg.messageslist[msg.messageslist.length - 1].msg}
                        date={new Date(msg.messageslist[msg.messageslist.length - 1].date)}
                        unread={msg.isseen == user._id ? 1:0} 
                        
                        /></Link>
         </MenuItem>
        })  : <p>No messages found</p>
      }
        
        
      </Menu>
    </div>
  );
}
