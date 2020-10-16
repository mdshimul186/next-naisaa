import React,{useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button} from '@material-ui/core'
import ServiceLayout from '../../components/ServiceLayout'
import Gigcard from '../../components/Gigcard'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'


function CatService({seo}) {

    const router = useRouter()
  const { slug, search } = router.query

   
 let history = useHistory()
 const [gigs, setGigs] = useState([])
 const [load, setload] = useState(false)
 const [loadmore, setLoadmore] = useState(false)
 const [showloadmore, setShowLoadmore] = useState(false)
    const [page, setPage] = useState(0)
    



 //filter gig according to category and page
 let text =  search || ''
 let fetchGig=()=>{
     
     axios.get(`/gig/get/${slug}?search=${text}&page=${page}`)
     .then(res=>{
         setGigs([...gigs,...res.data.gig])
         if(res.data.gig.length === 8){
             setShowLoadmore(true)
             setPage(page + 1)
         }else{
              setShowLoadmore(false)
         }
         
         setload(false)
         setLoadmore(false)
     })
 }


 
 useEffect(() => {
    setload(true)
    axios.get(`/gig/get/${slug}?search=${text}&page=0`)
    .then(res=>{
        
        //res.data.gig.length > 0 && setseo(res.data.gig[0].category.seo);
        setGigs(res.data.gig)
        if(res.data.gig.length === 8){
            setShowLoadmore(true)
            setPage(page + 1)
        }else{
             setShowLoadmore(false)
        }
       
        setload(false)
        setLoadmore(false)
    })
 }, [text,slug])
    

 let loadMore=()=>{
    setLoadmore(true)  
    fetchGig()  
}

    return (
        <>
        <Layout 
        title={seo && seo.seotitle} 
        description={seo && seo.seometa} 
        img='/siteimg.png'>
        <ServiceLayout title=''>
        {
            load ? <CircularProgress style={{margin:"10px auto"}} /> :
            gigs.length>0 ? gigs.map((gig,index)=>{
                return <Gigcard gig={gig} key={index} />
            }):<div  style={{textAlign:"center",width:"100%"}}><p >No gigs found</p></div>
        }
            
            <div style={showloadmore ? {display:"block",textAlign:"center"}:{display:"none"}}  className='col-12' >
               <Button  onClick={()=>loadMore()} variant="outlined">
               {loadmore ? <CircularProgress style={{height:"20px",width:"20px"}} />: "Load more..."}
               
               </Button>
               
               
            </div> 
        </ServiceLayout>
        </Layout>
        </>
    )
}

export async function getServerSideProps(context){
 
    let text =   ''
    let slug = context.params.slug
   let res = await axios.get(`/gig/get/${slug}?search=${text}&page=0`)
 

   return {
       props: {seo:res.data.gig.length > 0 && res.data.gig[0].category.seo},
     };
   }

export default CatService
