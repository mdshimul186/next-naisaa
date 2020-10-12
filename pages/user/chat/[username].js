import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {useSelector} from 'react-redux'

import 'react-chat-elements/dist/main.css';

import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CircularProgress from '@material-ui/core/CircularProgress';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { SystemMessage } from 'react-chat-elements'
import SendIcon from '@material-ui/icons/Send';
import { MessageList } from 'react-chat-elements'

import Layout from '../../../components/Layout'
import {socket} from '../../../components/Layout'


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



function Chat() {
    const [chat, setChat] = useState({})
    const [textList, setTextList] = useState([])
    const [msg, setMsg] = useState('')
    const [sendmsgprogress, setsendmsgprogress] = useState(false)
    const [sendfileprogress, setsendfileprogress] = useState(false)
    const [chatload, setchatload] = useState(false)

    const classes = useStyles();
    const router = useRouter()
    const { username} = router.query
    const {user} = useSelector(state => state.auth)

    // const setref = useCallback(node=>{
    //     if(node){
    //         node.scrollIntoView({smooth:true})
    //     }
    // })

    let lastmsgref = useRef()

    useEffect(() => {
      if(lastmsgref.current){
        lastmsgref.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
          })
    }
    })
    


      useEffect(() => {
      
 socket &&
        socket.on('new',data=>{
            if(data){
                // console.log(data);
                // console.log(data.messageslist);
                if(data.room[data.room.findIndex(m=> m._id !== user._id)].username == username){
                    textList && setTextList(data.messageslist)

                }
            }
          
        })

     
     },[socket,username])


useEffect(() => {
    setchatload(true)
   axios.get('/user/singlechat/'+username)
   .then(res=>{
    setChat(res.data.message)
    setTextList(res.data.message && res.data.message.messageslist)
    setchatload(false)
   })
}, [username])

let sendMsg=()=>{
    setsendmsgprogress(true)
    
    let newMsg ={
        receiver:username,
        msg
    }
    

    axios.post('/user/sendmessage',newMsg)
    .then(res=>{
        if(textList){
            setTextList([...textList,res.data.message.messageslist[res.data.message.messageslist.length-1]])
        }else{

            setTextList([res.data.message.messageslist[res.data.message.messageslist.length-1]])
        }
        setMsg('')
        setsendmsgprogress(false)
    })
}

let handleDownload=(msg)=>{
    if(msg.msgtype === 'file'){
       window.open(msg.url)
    }
    
}

let handlefile=(file)=>{
    if(file){
        setsendfileprogress(true)
        let formdata = new FormData()
        formdata.append('msg',file.name)
        formdata.append('msgfile',file)
        formdata.append('receiver',username)

        axios.put('/order/messagefile/',formdata)
        .then(res=>{
            setTextList(res.data.message.messageslist)
            setsendfileprogress(false)
        })
    }
}

let handleKey=(e)=>{
 
     if(e.keyCode === 13){
         e.preventDefault()
         sendMsg()
     }
}



    return (
        <Layout>
        <div style={{height:"100vh",marginTop:"10px"}}>
           
            {/* <div className='chat_comp' style={{width:'70%',height:"100vh",margin:"0 auto",border:"1px solid gray",padding:"5px",overflow:"scroll",position:"relative"}}> */}
       
{/* 
       {
        textList && textList.map((msg,index)=>{
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
             */}




                        



    {/* </div> */}





    <div>




<section class="msger">
  <header class="msger-header">
    <div class="msger-header-title">
      <i class="fas fa-comment-alt"></i> Chat with {username}
    </div>
    <div class="msger-header-options">
      <span>{chatload && <CircularProgress style={{width:"20px",header:"20px"}} />}</span>
    </div>
  </header>
 

  <main  class="msger-chat">
    
  {
        textList && textList.map((msg,index)=>{
            const lastmessage = textList.length -1 === index
          return <div key={index} ref = {lastmessage ? lastmsgref : null}><MessageList
          
    className='message-list'
    lockable={true}
    
    onClick={()=>handleDownload(msg)}
    dataSource={[
        {
            position: user.username == msg.username ? 'right':'left',
            type: msg.msgtype,
            text: msg.msg,
            title:msg.username,
            
            date: new Date(msg.date),
            
        }
    ]} /></div>
        }) 
       }


  </main>

 
  <div>
                        <Paper component="form" className={classes.root}>
                    <label htmlFor="icon-button-file">
                            <input onChange={(e)=>handlefile(e.target.files[0])} style={{display:"none"}}  id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                {
                                    sendfileprogress ? <CircularProgress style={{width:"30px",height:"30px"}} />:<AttachFileIcon />
                                }
                                
                                </IconButton>
                            </label>
                            <Divider className={classes.divider} orientation="vertical" />
                            <form className={classes.input} onSubmit={(e)=>e.preventDefault()}>
                            <TextField
                            fullWidth
                                className={classes.input}
                                placeholder="Type here ..."
                      
                                value={msg}
                                onChange={(e)=>{setMsg(e.target.value)}}
                             onKeyDown={(e)=>{ handleKey(e)}}
                            /></form>
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton  onClick={()=>sendMsg()} className={classes.iconButton} >
                            {
                                sendmsgprogress ? <CircularProgress style={{width:"30px",height:"30px"}} />:<SendIcon style={{color:"green"}}/>
                            }
                                
                            </IconButton>
                            </Paper>
                            
                        </div>
  
</section>




    </div>
           
        </div>
        </Layout>
    )
}

export default Chat
