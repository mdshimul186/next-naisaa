
import React from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Typography, Button } from '@material-ui/core'
import { setToast } from './ToastMsg'
import moment from 'moment'
function AuthorDetails({ author }) {
    const dispatch = useDispatch()
    const { authenticated, user } = useSelector(state => state.auth)

    const router = useRouter()
    let handleMessage = () => {
        if (authenticated) {
            if (author.username == user.username) {
                return setToast("You can't message yourself", 'error')
            } else {
                router.push(`/user/chat/${author.username}`)
            }

        } else {
            dispatch({
                type: "SHOW_SIGNIN"
            })
        }

    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div ><Avatar src={author.profileimg} style={{ height: "100px", width: "100px" }} /></div>

                <h5 style={{ fontWeight: "bold", margin: "10px 0" }}>{author && author.username}</h5>
                <div style={{ fontSize: "13px", textAlign: 'center' }}>
                    <p style={{ lineHeight: "8px", margin: "13px", textTransform: "capitalize", fontSize: "17px" }}>Level: <b>{author.sellerstatus}</b></p>

                    {
                        author.status === 'online' && <img src='/online.png'></img>
                    }


                </div>
                <button style={{ backgroundColor: "#1B8785", color: "white" }} onClick={() => handleMessage()} className='btn btn-sm btn-block'>Send Message</button>
                <hr></hr>
                <div style={{ width: "100%", fontSize: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", lineHeight: "10px" }}> <p> From</p> <h6 style={{ fontWeight: "bold", fontSize: "13px" }}>{author.country}</h6></div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", lineHeight: "10px" }}> <p> Member since</p> <h6 style={{ fontWeight: "bold", fontSize: "13px" }}>{moment(author.date).format("MMMM YYYY")}</h6></div>

                </div>
            </div>
        </div>
    )
}

export default AuthorDetails
