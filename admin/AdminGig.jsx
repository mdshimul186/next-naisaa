import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios'
import { Table, Image, Button, Modal, Form } from 'react-bootstrap'
import { setToast } from '../components/ToastMsg'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import dynamic from 'next/dynamic'


import 'react-quill/dist/quill.snow.css'

const QuillNoSSRWrapper = dynamic(
    import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p> }
)


function AdminGig() {
    const [gigs, setGigs] = useState(null)
    const [title, setTitle] = useState('')
    const [delivery, setDelivery] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState(0)
    const [category, setCategory] = useState([])

    const [catId, setCatId] = useState('')
    const [status, setStatus] = useState('')
    const [images, setImages] = useState(null)
    const [add, setadd] = useState(true)
    const [editId, setEditId] = useState(null)

    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSeo, setOpenSeo] = useState(false);
    const [deleteGigid, setDeleteGig] = useState(null);
    const [load, setLoad] = useState(false)


    const [seoTitle, setseoTitle] = useState('')
    const [seoMeta, setseoMeta] = useState('')



    const [loadmore, setLoadmore] = useState(false)
    const [showloadmore, setShowLoadmore] = useState(false)
    const [page, setPage] = useState(0)

    const handleClose = () => {
        setShow(false)
        setTitle('')
        setDescription('')
        setPrice('')
        setStatus('')
        setDelivery('')
        setCatId('')
        setadd(true)
        setEditId(null)
        setImages(null)

    };
    const handleShow = () => setShow(true);
    const handleClickOpen = (gig) => {
        setDeleteGig(gig._id)
        setOpen(true);

    };
    const handleCloseModal = () => {
        setOpen(false);
        setDeleteGig(null)
        setOpenSeo(false)
    };


    //----get category-----------

    useEffect(() => {
        axios.get('/category/get')
            .then(cat => {
                setCategory(cat.data.category)

            })
            .catch(err => console.log(err))
    }, [])

    //-----get gig list--------

    useEffect(() => {
        axios.get('/gig/get')
            .then(res => {
                setGigs(res.data.gig)
                if (res.data.gig.length === 8) {
                    setShowLoadmore(true)
                    setPage(page + 1)
                } else {
                    setShowLoadmore(false)
                }
            })
            .catch(err => console.log(err))
    }, [])

    //-------filter gig list--------
    let fetchGig = () => {
        let text = ''
        axios.get(`/gig/get?search=${text}&page=${page}`)
            .then(res => {
                setGigs([...gigs, ...res.data.gig])
                if (res.data.gig.length === 8) {
                    setShowLoadmore(true)
                    setPage(page + 1)
                } else {
                    setShowLoadmore(false)
                }

                setLoadmore(false)
            })
    }

    //-------fetch gig acording to pagination-------

    let loadMore = () => {

        setLoadmore(true)
        fetchGig()
    }


    //-----save gig into database--------
    const submitProduct = () => {

        if (!title && !description && !category && !price && !images && !status) {
            return alert('fill all fields')
        } else {
            setLoad(true)
            var formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)
            formData.append('category', catId)
            formData.append('status', status)
            formData.append('delivery', delivery)
            formData.append('thumbnail', images)
            formData.append('price', price)

            axios.post('/gig/add', formData)
                .then(res => {
                    console.log(res.data);
                    if (res.status == 200) {

                        setGigs([res.data.gig, ...gigs])
                        setTitle('')
                        setDescription('')
                        setCatId('')
                        setPrice('')
                        setImages(null)
                        setShow(false)
                        setLoad(false)
                        setToast("Gig successfully created", "success")
                    } else {
                        alert(res.data)
                    }
                })

        }
    }




    //--------delete gig------
    const deleteGig = () => {
        axios.delete('/gig/delete/' + deleteGigid)
            .then(res => {

                let newGig = gigs.filter(item => item._id != deleteGigid)
                setGigs(newGig)
                handleCloseModal()
                setToast("Gig successfully deleted", "error")
            })
    }

    //------set gig to edit-----------

    const editGig = (gig) => {
        setadd(false)
        setTitle(gig.title)
        setDescription(gig.description)
        setPrice(gig.price)
        setStatus(gig.status)
        setDelivery(gig.delivery)
        setEditId(gig._id)
        setCatId(gig.category)
        setShow(true)

    }
    //------set gig to seo----------
    const seoGig = (gig) => {
        setEditId(gig._id)
        setseoTitle(gig.seo.seotitle)
        setseoMeta(gig.seo.seometa)
        setOpenSeo(true)

    }
    //------save edited gig-----------
    const submiteditGig = () => {
        if (title == '' && price == '' && description == '') {
            alert('fill all fields')
        } else {
            setLoad(true)
            var formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)
            formData.append('category', catId)
            formData.append('delivery', delivery)
            formData.append('status', status)
            if (images) {
                formData.append('thumbnail', images)
            }
            formData.append('price', price)



            axios.patch('gig/edit/' + editId, formData)
                .then(res => {

                    let newarray = gigs && [...gigs]
                    let index = newarray.findIndex(g => g._id === res.data.gig._id)
                    newarray[index] = res.data.gig

                    setGigs(newarray)
                    setLoad(false)
                    handleClose()
                })

        }
    }

    //-------save edited seo ----------
    let submitSeo = () => {
        let seotext = {
            seotitle: seoTitle,
            seometa: seoMeta
        }

        axios.put('/gig/seo/' + editId, seotext)
            .then(res => {
                console.log(res.data.gig);
                let newarray = gigs && [...gigs]
                let index = newarray.findIndex(g => g._id === res.data.gig._id)
                newarray[index] = res.data.gig
                setGigs(newarray)
                setseoTitle('')
                setseoMeta('')
                setOpenSeo(false)
                setEditId('')
            })
    }




    return (
        <>
            <div>
            {/* confirmation dialogue to delete gig */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you want to delete this gig ?
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={deleteGig} color="primary" autoFocus>
                            Ok
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
            {/* dialogue to handle seo */}
                <Dialog
                    open={openSeo}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >

                    <DialogContent>
                        <Form.Group>
                            <Form.Label>SEO Title:</Form.Label>

                            <Form.Control value={seoTitle} onChange={(e) => setseoTitle(e.target.value)} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>SEO Meta:</Form.Label>

                            <Form.Control value={seoMeta} onChange={(e) => setseoMeta(e.target.value)} type="text" />
                        </Form.Group>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={submitSeo} color="primary" autoFocus>
                            Save
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
            {/* dialogue to add and edit gig */}
                <Button style={{ margin: "10px 0" }} variant="primary" onClick={handleShow}>
                    Add New Gig
                    </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Gig</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>



                        <Form.Group>
                            <Form.Label>Gig Title:</Form.Label>

                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                        </Form.Group>



                        <FormControl style={{ width: "100%" }}>
                            <InputLabel htmlFor="age-native-simple">{add ? "Select a Category:" : "Update category:"}</InputLabel>
                            <Select
                                native
                                fullWidth
                                value={catId}
                                onChange={(e) => setCatId(e.target.value)}

                            >
                                <option aria-label="None" value="" />
                                {category.map((cat, index) => {
                                    return <option key={index} value={cat._id}>{cat.categoryname}</option>
                                })}



                            </Select>
                        </FormControl>

                        <Form.Group>
                            <Form.Label>Enter gig price:</Form.Label>
                            <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Gig price" />
                        </Form.Group>



                        <FormControl style={{ width: "100%" }}>
                            <InputLabel htmlFor="age-native-simple">{add ? "Select status:" : "Update status:"}</InputLabel>
                            <Select
                                native
                                fullWidth
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}

                            >
                                <option aria-label="None" value="" />
                                <option value='active'>Active</option>
                                <option value='pause'>Pause</option>


                            </Select>
                        </FormControl>



                        <Form.Group>
                            <Form.Label>Enter gig delivery time (e.g 7):</Form.Label>
                            <Form.Control value={delivery} onChange={(e) => setDelivery(e.target.value)} type="text" placeholder="Gig Delivery time" />
                        </Form.Group>
                        <label>Description:</label>
                        {
                            process.browser && <QuillNoSSRWrapper value={description} onChange={(value) => setDescription(value)} />
                        }

                        <div className='product_preview'>
                            {
                                images && <div><img style={{ width: "100px" }} src={URL.createObjectURL(images)}></img></div>
                            }
                        </div>
                        <br></br>

                        <div className="button-wrapper">
                            <label>{add ? 'Select gig thumbnail:' : "Select gig thumbnail (if you don't want to change leave it empty)"}</label>
                            <input onChange={(e) => setImages(e.target.files[0])} type="file" name="upload" id="upload" className="upload-box" placeholder="Upload File"></input>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                            </Button>
                        <Button onClick={add ? submitProduct : submiteditGig} variant="primary">{add ? "Add Gig" : "Update Gig"}</Button>{load && <CircularProgress />}
                    </Modal.Footer>
                </Modal>
            </div>

            {/* table to display all gig */}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thumbnail</th>
                        <th>Gig Title</th>
                        <th>Gig Status</th>
                        <th>price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gigs &&
                        gigs.map((gig, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img style={{ height: "100px" }} src={gig.thumbnail}></img></td>
                                <td>{gig.title}</td>
                                <td>{gig.status}</td>
                                <td>{gig.price}</td>
                                <td style={{ display: "flex", justifyContent: "space-around" }}>
                                    <Button size="sm" style={{ marginRight: "5px" }} variant='danger' onClick={() => handleClickOpen(gig)}>Delete</Button>
                                    <Button variant='primary' size="sm" onClick={() => seoGig(gig)}>SEO</Button>
                                    <Button size="sm" onClick={() => editGig(gig)}>Edit</Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
            <div style={showloadmore ? { display: "block", textAlign: "center" } : { display: "none" }} className='col-12' >
                <Button onClick={() => loadMore()} variant="outlined">
                    {loadmore ? <CircularProgress style={{ height: "20px", width: "20px" }} /> : "Load more..."}

                </Button>


            </div>
        </>
    )
}

export default AdminGig