import React,{useEffect} from 'react'
import Navbarcomp from './Nvabarcomp'
import Footer from './Footer'


import Head from 'next/head'
import jwt from 'jwt-decode'
import axios from 'axios'
import store from '../store'
import {useSelector,useDispatch} from 'react-redux'
import io from 'socket.io-client'
import ToastMsg from './ToastMsg'

const ISSERVER = typeof window === "undefined";
let token = null
if (!ISSERVER) {
  
  token = window.localStorage.getItem('auth_token_f')
}
//axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.baseURL = 'https://naissa-api.herokuapp.com'




axios.get('/user/setting')
  .then(res => {
    store.dispatch({
      type: "SET_SETTING",
      payload: res.data.setting
    })
  })

  export let  socket

function Layout({children,title,description,img,setting ,url}) {
  
  useEffect(() => {
    if (token) {

      let decoded = jwt(token)
    
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch({
        type: "SET_USER",
        payload: decoded
      })
    
      axios.get('/user/notification')
        .then(res => {
          store.dispatch({
            type: "SET_NOTIFICATION",
            payload: res.data.notification
          })
        })
    
    
      axios.get('/user/getprofile')
        .then(res => {
          store.dispatch({
            type: 'SET_PROFILE',
            payload: res.data.user
    
          })
        })
    
    
      axios.get('/user/getmessages')
        .then(res => {
          store.dispatch({
            type: "SET_MESSAGES",
            payload: res.data.message
          })
    
        })
    
    
    }
    
  }, [])




  const { user, authenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (authenticated) {
      let loggedInSocket = user.username
      var options = {
        rememberUpgrade: true,
        transports: ['websocket'],
        secure: true,
        rejectUnauthorized: false
      }
      socket = io('https://naissa-api.herokuapp.com', options)


      socket.emit('come_online', loggedInSocket)



      return () => {
        socket.disconnect()
      }
    }

  }, [authenticated])

  useEffect(() => {

    if (authenticated) {
      socket.on('new', data => {

        if (data) {
          dispatch({
            type: "NEW_MESSAGES",
            payload: data
          })

        }
      })
    }

  }, [authenticated])


    return (
        <>
        <Head>
        <title>{title ? title :setting && setting.general.title }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description ? description :setting && setting.general.meta }></meta>
 
+       <meta property="og:title" content={title ? title :setting && setting.general.title} key="ogtitle" />
+       <meta property="og:description" content={description ? description :setting && setting.general.meta} key="ogdesc" />
        <meta property="og:url" content={url ? "https://next-naisaa.vercel.app"+url : "https://next-naisaa.vercel.app"} key="ogurl" />
        <meta property="og:image" content={img ? img : "/siteimg.png"} key="ogimage" />
        <meta property="og:site_name" content='Naisaa' key="ogsitename" />


         
        </Head>
            <ToastMsg />
           <Navbarcomp /> 
           <>
               {children}
           </>
           <Footer />
        </>
    )
}


export async function getServerSideProps(){
 
  let res = await axios.get('/user/setting')
  
 
    return {
        props: {setting:res.data.setting},
      };
 }

export default Layout
