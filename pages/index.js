import Head from 'next/head'

import Navbarcomp from '../components/Nvabarcomp'
import axios from 'axios'
import jwt from 'jwt-decode'
import store from '../store'
import Layout from '../components/Layout'
import HomePage from '../components/Home'
import {useSelector} from 'react-redux'



export default function Home() {
  const {setting} = useSelector(state => state.auth)
  return (
    <>
    
      <Layout>
      <Head>
    <title>{setting.general && setting.general.title}</title>
    <meta name="description" content={setting.general && setting.general.meta} />
    </Head>
        <HomePage />

      </Layout>
    </>
  )
}
