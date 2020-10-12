import Head from 'next/head'

import Navbarcomp from '../components/Nvabarcomp'
import axios from 'axios'
import jwt from 'jwt-decode'
import store from '../store'
import Layout from '../components/Layout'
import HomePage from '../components/Home'
import { useSelector } from 'react-redux'



export default function Home() {
  const { setting } = useSelector(state => state.auth)
  return (
    <>

      <Layout 
        title={setting.general && setting.general.title} 
        description={setting.general && setting.general.meta} 
        img='https://res.cloudinary.com/shimul/image/upload/v1601878762/fbpost/cropped-naisaa-new-color-2-2.png.png'>

        <HomePage />

      </Layout>
    </>
  )
}
