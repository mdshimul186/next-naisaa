import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { useRouter } from 'next/router'

function ServiceLayout({title,children}) {
    const [categories, setCategories] = useState(null)
    const [route, setroute] = useState('')
    const [query, setQuery] = useState('')

    const router = useRouter()
    
    //set route as category
     useEffect(() => {
         if(router.asPath.split('/')[2]){
             setroute(router.asPath.split('/')[2])
         }else{
             setroute('service')
         }
       
     }, [router.asPath])

     //get all category
  useEffect(() => {
   axios.get('/category/get')
   .then(res=>{
    setCategories(res.data.category)
   })
  }, [])

  //push user when a category is selected
  let handlePush=(e)=>{
      if(e.target.value === 'all'){
          
        router.push(`/service`)
      }else{
        router.push(`/categories/${e.target.value}`)
      }
  }
  //searcg gig acording to category
  let handleSearch=()=>{
      if(route === 'service'){
        if(query.length >0){
           router.push(`/service?search=${query}`)
        }else{
            router.push(`/service`)
        }
      }else{
        if(query.length >0){
            router.push(`/categories/${route}?search=${query}`)
         }else{
             router.push(`/categories/${route}`)
         }
      }
                                
                                
  }

    return (
        
        <div className='service_wrapper'>

                <div className="jumbotron ">
                <div className="container-fluid ">
                <form style={{margin:"auto"}}>
                        <div className="inner-form">
                        <div className="input-field first-wrap">
                            <input onChange={e=>setQuery(e.target.value)} id="search" type="text" placeholder="What are you looking for?" />
                        </div>
                        <div className="input-field second-wrap">
                            <div className="input-select">
                            <select value={route}  onChange={(e)=>handlePush(e)} data-trigger="" name="choices-single-defaul">
                                <option value='all'>All</option>
                    {
                        categories && categories.map((cat,index)=>{
                            return <option value={cat.categoryslug} key={index}>{cat.categoryname}</option>
                        })
                    }
                            </select>
                            </div>
                        </div>
                        <div className="input-field third-wrap">
                            <button onClick={()=>{handleSearch()}} className="btn-search" type="button">SEARCH</button>
                        </div>
                        </div>
                    </form>
                </div>
                </div>



              
        
            <div className='row' style={{minHeight:"50vh"}}>
              
                
               
                {children}
               
               
            </div>
        </div>
    )
}

export default ServiceLayout
