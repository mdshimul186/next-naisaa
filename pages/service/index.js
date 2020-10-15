import React, { useEffect, useState } from 'react'
import ServiceLayout from '../../components/ServiceLayout'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Gigcard from '../../components/Gigcard'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {useSelector} from 'react-redux'
function Allgigs() {
    const [gigs, setGigs] = useState([])
    const [load, setload] = useState(false)
    const [loadmore, setLoadmore] = useState(false)
    const [showloadmore, setShowLoadmore] = useState(false)
    const [page, setPage] = useState(0)

    const router = useRouter()
    const { slug, search } = router.query

    const { setting } = useSelector(state => state.auth)


    

    let text = search || ''

    //getting all gig by search and page
    let fetchGig = () => {

        axios.get(`/gig/get?search=${text}&page=${page}`)
            .then(res => {
                setGigs([...gigs, ...res.data.gig])
                
                if (res.data.gig.length === 8) {
                    setShowLoadmore(true)
                    setPage(page + 1)
                } else {
                    setShowLoadmore(false)
                }

                setload(false)
                setLoadmore(false)
            })
    }



    //get gigs without search text 
    useEffect(() => {
      
        setload(true)
        axios.get(`/gig/get?search=${text}&page=0`)
            .then(res => {
                setGigs(res.data.gig)

                if (res.data.gig.length === 8) {
                    setShowLoadmore(true)
                    setPage(page + 1)
                } else {
                    setShowLoadmore(false)
                }

                setload(false)
                setLoadmore(false)
            })

    }, [text])



    let loadMore = () => {
        setLoadmore(true)
        fetchGig()
    }


    return (
        <div>
        <Layout>
            <ServiceLayout title="All">

                {
                    load ? <CircularProgress style={{ margin: "0 auto" }} /> :
                        gigs.length > 0 ? gigs.map((gig, index) => {
                            return <Gigcard gig={gig} key={index} />
                        }) : <div style={{ textAlign: "center" }}><p>No gigs found</p></div>
                }

                <div style={showloadmore ? { display: "block", textAlign: "center" } : { display: "none" }} className='col-12' >
                    <Button onClick={() => loadMore()} variant="outlined">
                        {loadmore ? <CircularProgress style={{ height: "20px", width: "20px" }} /> : "Load more..."}

                    </Button>


                </div>

            </ServiceLayout>
            </Layout>
        </div>
    )
}

export default Allgigs
