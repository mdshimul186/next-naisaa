import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements'
import { Input } from 'react-chat-elements'
import { Button } from 'react-chat-elements'
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';

function ChatComp({id}) {
    const [msg, setMsg] = useState('')
    const [msgList, setMsgList] = useState([])
    const [order, setOrder] = useState('')
    const [gig, setGig] = useState(null)

    const {user} = useSelector(state=>state.auth)


    useEffect(() => {
        console.log(id);
        axios.get('/order/single/'+id)
        .then(res=>{
            setMsgList(res.data.msg)
            setGig(res.data.gig)
            setOrder(res.data.order)
        })
    }, [id])

    let handleDownload=(msg)=>{
        if(msg.msgtype === 'file'){
           window.open(msg.url)
        }
        
    }

    let handlefile=(file)=>{
        if(file){
            let formdata = new FormData()
            formdata.append('msg',file.name)
            formdata.append('msgfile',file)
            formdata.append('username',user.username)

            axios.put('/order/file/'+id,formdata)
            .then(res=>{
                setMsgList(res.data.msg)
            })
        }
    }

    let sendMsg=()=>{
        let newMsg = {
            msg,
            username:user.username
        }
        axios.put(`/order/message/${id}`,newMsg)
        .then(res=>{
            setMsgList([...res.data.msg])
            setMsg('')
            
        })
    }
    return (
        <>
        <div style={{width:'100%',margin:"0 auto",border:"1px solid gray",padding:"5px",maxHeight:"500px",overflow:"auto"}}>
       

       {
        msgList.length>0 && msgList.map((msg,index)=>{
          return <MessageBox
          key={index}
                position={user.username == msg.username ? 'right':'left'}
                type={msg.msgtype}
                title={msg.username}
                date={new Date(msg.date)}
                text={msg.msg}
                onClick={()=>handleDownload(msg)}
                    data={{
                        uri: msg.url,
                        status: {
                        click: true,
                        loading: 0,
                        }
                }}/>
        }) 
       }
            


     
                        <div  class="input-field">
                            <input value={msg} onChange={(e)=>setMsg(e.target.value)} type="text" placeholder="Type here ..." />
                            <span><button onClick={()=>sendMsg()}><i class="fa fa-send"></i></button></span>
                            <label htmlFor="icon-button-file">
                            <input onChange={(e)=>handlefile(e.target.files[0])} style={{display:"none"}}  id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AttachFileIcon />
        </IconButton>
      </label>
                        </div>



    </div>
        </>
    )
}

export default ChatComp
