import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import ProfileLayout from '../../components/ProfileLayout'
import { ChatItem  } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import Link from 'next/link'




function UserMessages() {
    const [messagelist, setMessageList] = useState([])

    const {user} = useSelector(state => state.auth)

    

    useEffect(() => {
        axios.get('/user/getmessages')
        .then(res=>{
            setMessageList(res.data.message)
            console.log(res.data.message);
        })
    }, [])

    let markMessageRead=(msg)=>{
        axios.patch('/user/markmessageread/'+msg._id)
        .then(message=>{
          
        })
      }

      let handleRead=(msg)=>{
        if(msg.isseen == user._id){
            markMessageRead(msg)
          }
      }

    return (
        <ProfileLayout title="Profile">
        {
            messagelist.length > 0 && messagelist.map((msg,index)=>{
               return <Link href={`/user/chat/${msg.room[msg.room.findIndex(m=> m.username !== user.username)].username}`}>
               <a>
                    <ChatItem
                        onClick={()=>handleRead(msg)}
                        key={index}
                        avatar={'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png'}
                        alt={'user'}
                        title={msg.room[msg.room.findIndex(m=> m.username !== user.username)].username}
                        subtitle={msg.messageslist[msg.messageslist.length - 1].msg}
                        date={new Date(msg.messageslist[msg.messageslist.length - 1].date)}
                        unread={msg.isseen == user._id ? 1:0} 
                        
                        />
                        </a>
                        </Link>
            })
        }
        </ProfileLayout>
    )
}

export default UserMessages
