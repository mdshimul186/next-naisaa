
import App from 'next/app'
import {createWrapper} from 'next-redux-wrapper'
import {Provider} from 'react-redux'

import axios from 'axios'
import jwt from 'jwt-decode'
import store from '../store'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'





  
class MyApp extends App{




  render(){
    const {Component, pageProps} = this.props
    return(
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    )
  } 
}

const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)
