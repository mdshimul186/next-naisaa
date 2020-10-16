import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {useSelector,useDispatch} from 'react-redux'
import moment from 'moment'

import Link from 'next/link'
import { useRouter } from 'next/router'


import {Avatar}  from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Layout from '../components/Layout'

function ProfileLayout({title,children}) {

  const [picuploader, setpicuploader] = useState(false)
  const [route, setroute] = useState('')


    const {user,profile,authenticated} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const history = useRouter()
    
  //set dropdown according to route
  useEffect(() => {
    setroute(history.asPath.split('/')[2])
  }, [])

    //save prifile image
    let handlefile=(file)=>{
        if(file){
          setpicuploader(true)
            let formdata = new FormData()
            formdata.append('profileimg',file)
    
            axios.put('/user/updateprofilepic',formdata)
            .then(res=>{
                dispatch({
                    type: "SET_PROFILE",
                    payload:res.data.user
                  })
                  setpicuploader(false)
            })
        }
    }

      //logging out user
    let logOut=()=>{
        localStorage.removeItem('auth_token_f')
        dispatch({
          type:"LOGOUT"
        })
        window.location.pathname='/'
    
      }

    return (
        <Layout>
        {authenticated ? <div className='service_wrapper sm_profile'>

        <div className='row m-auto ' >
            <div className='col-lg-2 col-sm-12 mr-0 d-flex justify-content-center align-items-center '>
            <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={picuploader ? <CircularProgress style={{height:"25px",width:"25px"}} color="secondary" /> :<><input onChange={(e)=>handlefile(e.target.files[0])} accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label></>}
      >
        <Avatar src={profile.profileimg} style={{height:"130px",width:"130px"}}/>
      </Badge>
                
            </div>
            <div style={{lineHeight:"10px"}} className='col-lg-6 col-sm-12 sm_profile_detail'>
            <h5 style={{textTransform:"capitalize"}}><b>{profile.username}</b></h5>
            <p>From : {profile.country}</p>
            <p>Member since : {moment(profile.date).format("DD MMMM, YY")}</p>
            <p>Level : {profile.sellerstatus}</p>
            <button style={{margin:"0 auto"}} onClick={()=>logOut()} className='btn btn-danger btn-sm sm_logout'>Logout</button>
            </div>
        </div>
        <div className='profile_nav mt-3'>
        <ul>
        <li><Link href="/user/profile"><a>Dashboard</a></Link></li>
        <li><Link href="/user/orders"><a>My Orders</a></Link></li>
        <li><Link href="/user/my-task"><a>My Task</a></Link></li>
        <li><Link href="/user/my-services"><a>My Services</a></Link></li>
        <li><Link href="/user/payment"><a>Payment</a></Link></li>
        <li><Link href="/user/messages"><a>Messages</a></Link></li>
        <li><Link href="/user/setting"><a>Setting</a></Link></li>
        <li><button onClick={()=>logOut()} className='btn btn-danger'>Logout</button></li>
     
      </ul>
        </div>

        <div className="profile_nav_sm">
        <FormControl >
        <InputLabel htmlFor="age-native-simple">Select page</InputLabel>
        <Select
          native
        fullWidth
        value={route}
        onChange={(e)=>history.push(`/user/${e.target.value}`)}
          
        >
          <option aria-label="None" value="" />
          <option value="profile">Dashboard</option>
                <option value="orders">My Orders</option>
                <option value="my-task">My Task</option>
                <option value="my-services">My Services</option>
                <option value="payment">Payment</option>
                <option value="messages">Messages</option>
                <option value="setting">Setting</option>
                
        
        </Select>
      </FormControl>

        </div>

        <div className='mt-4' style={{minHeight:"60vh"}}>
            {children}
        </div>
        </div>:
        <p>Not authorized</p>
        }
        </Layout>
    )
}

export default ProfileLayout