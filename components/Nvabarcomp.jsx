import React,{useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import Sidebar from "react-sidebar";
import {useDispatch,useSelector} from 'react-redux'



import {setToast} from './ToastMsg'
import TextField from '@material-ui/core/TextField';
 import ProfileMenu from './ProfileMenu'
import NotificationComp from './NotificationComp'


import Grid from '@material-ui/core/Grid';


import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MessageComp from './MessageComp';






const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Nvabarcomp() {

    const [sidebarOpen, setsidebarOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [username, setUsername] = useState('')
    const [usernameoremail, setUsernameoremail] = useState('')
    const [error, setError] = useState(null)
    const [load, setload] = useState(false)

    const classes = useStyles();
    const dispatch = useDispatch()
    const {authenticated,signin,signup,setting} = useSelector(state=>state.auth)

      //save new user to database
    let handleSignup =()=>{
      let newUser = {
        email,
        password,
        username,
        confirm
      }
      axios.post('/user/signup', newUser)
    .then(res=>{
     if(res.status === 200){
        setToast("Registration successful! Signin now", "success")
        setPassword('')
        setEmail('')
        setConfirm('')
        setUsername('')
        setError(null)
        dispatch({
          type:'HIDE_SIGNUP'
        })
        dispatch({
          type:'SHOW_SIGNIN'
        })
      }
    })
    .catch(err=>{
      setError(err.response.data)
    })
      
    }

    //authenticate user
    let signinHandler=(e)=>{
      setload(true)
      
      let user = {
        emailorusername:usernameoremail,
        password
      }
      axios.post('/user/signin', user)
      .then(res=>{
       if(res.status === 200){
        localStorage.setItem('auth_token_f', res.data.token)
        dispatch({type:"SET_USER", payload: res.data.user})
        setToast("Signin success","success")
        setload(false)
        setError(null)
        dispatch({
          type:'HIDE_SIGNIN'
        })
        setUsernameoremail('')
        setPassword('')
        window.location.reload(false)
        }
      })
      .catch(err=>{
        err.response && setError(err.response.data)
        setload(false)
        
      })
    }

    //logic to show or close signup and signin model
    const handleClose = () => {
      dispatch({
        type:'HIDE_SIGNIN'
      })
    };
    const handleShow = () => {
      dispatch({
        type:'SHOW_SIGNIN'
      })
    };

    const handleClose2 = () => {
      dispatch({
        type:'HIDE_SIGNUP'
      })
    };
    const handleShow2 = () => {
      dispatch({
        type:'SHOW_SIGNUP'
      })
    };

    let showSignup=()=>{
      dispatch({
        type:'HIDE_SIGNIN'
      })
      dispatch({
        type:'SHOW_SIGNUP'
      })
    }


    let onSetSidebarOpen=(open)=> {
        setsidebarOpen(open);
      }
    return (
        <>

        <Sidebar
        sidebar={
        <div className='sidebar_container'>
        <h4 onClick={() => onSetSidebarOpen(!sidebarOpen)}>X</h4>
        <ul >
              <li ><Link href="/"><a>Home</a></Link></li>
              <li><Link href="/5f6a3fa93e214c001779744e/gigs"><a>Website design and development</a></Link></li>
              <li><Link href="/5f6a405d3e214c001779744f/gigs"><a>Website customization</a></Link></li>
              <li><Link href="/5f6a40723e214c0017797450/gigs"><a>Graphic design</a></Link></li> 
              {
                authenticated && <li><Link href='/user/orders'><a>My orders</a></Link></li>
              }            
              <li><Link href="/support"><a>Support</a></Link></li>      
 
            </ul></div>}
        open={sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        styles={{ sidebar: {zIndex: 990,
            position: "fixed",
            top: 0,
            bottom: 0,
            transition: "transform .3s ease-out",
            WebkitTransition: "-webkit-transform .3s ease-out",
            willChange: "transform",
            overflowY: "auto",
            background: "white" },
            
        }}
      >
        
      </Sidebar>
        {/* dialogue to signin */}
        <Modal show={signin} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {error && error.error ? <p style={{color:"red"}}>{error.error}</p>:null}
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
              <TextField
              error={error && error.emailorusername ? true: false}
              helperText={error && error.emailorusername ? error.emailorusername: false}
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username or Email"
                autoFocus
                value={usernameoremail}
                onChange={(e)=>setUsernameoremail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              error={error && error.password ? true: false}
              helperText={error && error.password ? error.password: false}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Grid>
            </Grid>
            <Typography style={{cursor:"pointer"}} onClick={()=>showSignup()} variant='button'>Dont have an account ? Signup now</Typography>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={signinHandler}>
              Sign in
            </Button>
          </Modal.Footer>
        </Modal>
        {/* dialogue to register */}
        <Modal show={signup} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Join us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {error && error.error ? <p style={{color:"red"}}>{error.error}</p>:null}


          <Grid container spacing={2}>
            
            
            <Grid item xs={12}>
              <TextField
              error={error && error.email ? true: false}
                variant="outlined"
                required
                fullWidth
                id="email"
                helperText={error && error.email ? error.email: false}
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
              error={error && error.username ? true: false}
              helperText={error && error.username ? error.username: false}
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                autoFocus
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
              error={error && error.password ? true: false}
              helperText={error && error.password ? error.password: false}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              error={error && error.confirm ? true: false}
              helperText={error && error.confirm ? error.confirm: false}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="cpassword"
                value={confirm}
                autoComplete="current-password"
                onChange={(e)=>setConfirm(e.target.value)}
              />
            </Grid>
            
          </Grid>
          
          

 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSignup}>
              Register
            </Button>
          </Modal.Footer>
        </Modal>
      
           


          {/* navbar starts here */}
  <div className="wrapper">
 
    <div className="top_nav">
        <div className="left">
        <i onClick={() => onSetSidebarOpen(!sidebarOpen)} className="fa fa-bars"></i>
          <div className="logo"><Link href='/'><a><img style={{maxHeight:"150px"}} src={setting.logoimg}></img></a></Link></div>
          {/* <div className="search_bar">
              <input type="text" placeholder="Search" />
          </div> */}
      </div> 
      <div className="right">
        <ul>
          <li className='d-none d-lg-block'><Link href="/service">Services</Link></li>
          <li className='d-none d-lg-block'><Link href="/support">Support</Link></li>
          {
            authenticated ? <>
            <li className='d-none d-lg-block'><Link href='/user/orders'>My orders</Link></li>
                <li style={{marginTop:"5px"}}><NotificationComp /></li>
                <li style={{marginTop:"5px"}}><MessageComp /></li>
                <ProfileMenu /> 
            </> :<><li onClick={handleShow}><a href="javascript:void(0)">LogIn</a></li>
          <li className='last_child' onClick={handleShow2}><a href="javascript:void(0)">SignUp</a></li></>
          }
          
         
        </ul>
      </div>
    </div>
    <div  className="bottom_nav">
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/categories/Website-Design-and-Development">Website design and development</Link></li>
        <li><Link href="/categories/Website-Customization">Website customization</Link></li>
        <li><Link href="/categories/Graphic-Design">Graphic design</Link></li>
     
      </ul>
  </div>
  

</div>

        </>
    )
}

export default Nvabarcomp
