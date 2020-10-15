import React,{useState} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {setToast} from '../components/ToastMsg'
import { TrendingUpTwoTone } from '@material-ui/icons'



function Support() {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [subject, setsubject] = useState('')
    const [message, setmessage] = useState('')
    const [load, setload] = useState(false)

    let handleSubmit =(e)=>{
        e.preventDefault()
        let newMessage={
            name:username,
            email,
            subject,
            message
        }
        setload(true)
        axios.post('/contact',newMessage)
        .then(res=>{
            if(res.data.success){
                setToast('Message sent','success')
                setusername('')
                setemail('')
                setsubject('')
                setmessage('')
                setload(false)

            }
        })

    }
    return (
        <Layout
        title='☏ Support | Best Place To Hire Freelancers | Hire Expert Freelancers For Any Job Online | Naisaa' 
        description='From Naisaa you can hire expert freelancers for any job online . We design and develop professional websites. Visit us today!' 
        img='/buying.jpg'
        >
            <div style={{ backgroundColor: "#F5F5F5" }}>
                <div className="page_head" style={{ width: "100%", height: "305px", backgroundColor: "#001626", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ color: "white", fontWeight: "bold" }}>Support</h1>
                </div>
                <div style={{ padding: "8%" }} className='row'>
                
                    <form onSubmit={(e)=>handleSubmit(e)} className="contact_form" style={{ width: "50%", margin: "0 auto", backgroundColor: "white", padding: "15px", boxShadow: "3px 3px 3px  #ccc", borderRadius: "5px" ,zIndex:"99"}}>
                    <div style={{textAlign:"center"}}>
                    <h5 style={{fontWeight:"bold"}}>Contact Form</h5>
                    </div>
                    
                        <div className="form-group">
                            <label for="exampleInputUsername">User Name (required)</label>
                            <input value={username} onChange={(e)=>setusername(e.target.value)} required type="text" className="form-control" id="exampleInputUsername" aria-describedby="username" />

                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address (required)</label>
                            <input value={email} onChange={(e)=>setemail(e.target.value)} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                        </div>
                        <div className="form-group">
                            <label for="exampleInputSubject">Subject</label>
                            <input value={subject} onChange={(e)=>setsubject(e.target.value)} type="text" className="form-control" id="exampleInputSubject" />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Your Message</label>
                            <textarea value={message} onChange={(e)=>setmessage(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        {
                            load && <p>Message sending...</p>
                        }
                        
                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                </div>


            <div style={{width:"90%",margin:"auto",clear:"both", height:"400px"}}>
           
            <iframe style={{width:"100%", height:"400px"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58144.494516154875!2d88.57099626626206!3d24.38022820474405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa96a38d031%3A0x10f93a950ed6f410!2sRajshahi!5e0!3m2!1sen!2sbd!4v1602741623287!5m2!1sen!2sbd"></iframe>
            </div>

            </div>
        </Layout>
    )
}

export default Support
