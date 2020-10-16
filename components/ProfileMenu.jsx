import React from 'react';
import {useSelector} from 'react-redux'

import Avatar from '@material-ui/core/Avatar';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useRouter } from 'next/router'

export default function ProfileMenu() {
  

  const {user,profile} = useSelector(state=>state.auth)
  const router = useRouter()


  return (
    <div style={{marginLeft:"15px"}}>
    <div onClick={()=>router.push('/user/profile')} style={{display:"flex",cursor:"pointer"}}><Avatar src={profile && profile.profileimg} /><b className='d-none d-lg-block' style={{marginLeft:"5px",marginTop:"5px"}}>{user.username} <ChevronRightIcon /></b></div>
     
     
    </div>
  );
}
