import Head from 'next/head'

import Navbarcomp from '../components/Nvabarcomp'
import axios from 'axios'
import jwt from 'jwt-decode'
import store from '../store'
import Layout from '../components/Layout'
import HomePage from '../components/Home'
import { useSelector } from 'react-redux'



export default function Home({setting}) {
  
  return (
    <>

      <Layout 
        title={setting.general && setting.general.title} 
        description={setting.general && setting.general.meta} 
        img='/siteimg.png'>

        <HomePage />

      </Layout>
    </>
  )
}


export async function getServerSideProps(){
 
 let res = await axios.get('/user/setting')
 

   return {
       props: {setting:res.data.setting},
     };
}
