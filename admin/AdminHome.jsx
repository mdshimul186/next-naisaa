import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {setToast} from '../components/ToastMsg'


import {Table, Image, Button,Modal,Form} from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress';


function AdminHome() {
    const [HomeImg, setHomeImg] = useState('')
    const [HomeImgLoad, setHomeImgLoad] = useState(false)
    const [LogoImg, setLogoImg] = useState('')
    const [LogoImgLoad, setLogoImgLoad] = useState(false)
    const [title, setTitle] = useState('')
    const [meta, setMeta] = useState('')

    const {setting} = useSelector(state=>state.auth)

    useEffect(() => {
        setting && setHomeImg(setting.homeimg)
        setting && setLogoImg(setting.logoimg)
         setting.general && setTitle(setting.general.title)
         setting.general && setMeta(setting.general.meta)
         
    }, [setting])
  
    let  changeHeroImg=(img)=>{
        if(img){
            setHomeImgLoad(true)
            let formData = new FormData()
            formData.append('homeimg',img)
            axios.patch('/user/setsetting',formData)
            .then(res=>{
                setHomeImg(res.data.setting.homeimg)
                setHomeImgLoad(false)
            })
        }
    }

 
  
    let  changeLogo=(img)=>{
        if(img){
            setLogoImgLoad(true)
            let formData = new FormData()
            formData.append('logoimg',img)
            axios.patch('/user/setlogo',formData)
            .then(res=>{
                setLogoImg(res.data.setting.logoimg)
                setLogoImgLoad(false)
            })
        }
    }

    let saveTitle=()=>{
        let newGeneral = {
            title,meta
        }

        axios.patch('/user/setsetting',newGeneral)
        .then(res=>{
            setTitle(res.data.setting.general.title)
            setTitle(res.data.setting.general.meta)
            setToast("Site updated successfully", 'success')
        })
    }
    return (
        <>
           <div>
           <label>Home Hero Image:</label>
           <Table style={{marginTop:"15px",width:"100%"}} striped bordered hover size="sm">
           <thead>
                        <tr>
                        <th>#</th>
                        <th>Image</th>
                        
                        <th>Change</th>
                        </tr>
                        </thead>
                        <tbody>
                      <tr >
                                <td>1</td>
                                <td><img style={{objectFit:"contain",height:"150px"}} src={HomeImg}></img></td>
                                <td>
                                {
                                    HomeImgLoad ? <CircularProgress /> :
                                    <Form.File onChange={(e)=>changeHeroImg(e.target.files[0])} id="exampleFormControlFile1" />
                                }
                                </td>
                        </tr>
                                 
                </tbody>
           </Table>
           </div>
           <hr></hr>

           <div>
           <label>Site Logo:</label>
           <Table style={{marginTop:"15px",width:"100%"}} striped bordered hover size="sm">
           <thead>
                        <tr>
                        <th>#</th>
                        <th>Image</th>
                        
                        <th>Change</th>
                        </tr>
                        </thead>
                        <tbody>
                      <tr >
                                <td>1</td>
                                <td><img style={{objectFit:"contain",maxWidth:"150px"}} src={LogoImg}></img></td>
                                <td>
                                {
                                    LogoImgLoad ? <CircularProgress /> :
                                    <Form.File onChange={(e)=>changeLogo(e.target.files[0])} id="exampleFormControlFile3" />
                                }
                                </td>
                        </tr>
                                 
                </tbody>
           </Table>
           </div>
           <hr></hr>

           <div style={{backgroundColor:"#f0f1f2",padding:"10px",marginTop:"10px"}}>
                        <Form.Group>
                            <Form.Label>Enter site title:</Form.Label>
                            <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter site title..." />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Enter site meta:</Form.Label>
                            <Form.Control value={meta} onChange={(e)=>setMeta(e.target.value)} type="text" placeholder="Enter site meta..." />
                        </Form.Group>
                        <Button onClick={()=>saveTitle()}>Save</Button>
           </div>
        </>
    )
}

export default AdminHome
