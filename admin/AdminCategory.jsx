import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Image, Button, Modal, Form } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

function AdminCategory() {
    const [categories, setCategories] = useState([])
    const [categoryname, setCategoryname] = useState('')
    const [image, setImage] = useState({})
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false)

    const [openSeo, setOpenSeo] = useState(false);
    const [seoTitle, setseoTitle] = useState('')
    const [seoMeta, setseoMeta] = useState('')
    const [editcatid, seteditcatid] = useState('')

    const [SelectedEditCat, setSelectedEditCat] = useState({})
    const [edit, setedit] = useState(false)

    const handleClose = () => {
        setShow(false)
        setSelectedEditCat({})
        setedit(false)
        setImage({})
        setCategoryname('')

    };
    const handleCloseSeo = () => {
        seteditcatid('')
        setseoTitle('')
        setseoMeta('')
        setOpenSeo(false)
    };
    const handleShow = () => setShow(true);

    //--------getting category list---------
    useEffect(() => {
        axios.get('/category/get')
            .then(res => {
                setCategories(res.data.category)
            })
            .catch(err => console.log(err))
    }, [])

    //--------adding new category ---------
    const handleCat = () => {
        setLoad(true)
        let formdata = new FormData()
        formdata.append('categoryname', categoryname)
        formdata.append('categoryimg', image)
        axios.post('/category/add', formdata)
            .then(res => {
                if (res.status == 200) {
                    setCategories([...categories, res.data.category])
                    setLoad(false)
                    setShow(false)
                } else {
                    alert("Something Went Wrong")
                }
            })
            .catch(err => console.log(err))
    }
    //---- delete category----
    const deleteCat = (id) => {

        axios.delete('/category/delete/' + id)
            .then(res => {

                let filter = categories.filter(cat => cat._id != res.data.category._id)
                setCategories(filter)
            })
            .catch(err => console.log(err))
    }

    //----setcategory to seo----

    let handlesetCat = (cat) => {
        seteditcatid(cat._id)
        setseoTitle(cat.seo.seotitle)
        setseoMeta(cat.seo.seometa)
        setOpenSeo(true)
    }

    //------save seo data-----------

    let submitSeo = () => {
        let seotext = {
            seotitle: seoTitle,
            seometa: seoMeta
        }

        axios.put('/category/seo/' + editcatid, seotext)
            .then(res => {
                console.log(res.data.category);
                let newarray = [...categories]
                let index = newarray.findIndex(g => g._id === res.data.category._id)
                newarray[index] = res.data.category
                setCategories(newarray)
                setseoTitle('')
                setseoMeta('')
                seteditcatid('')
                setOpenSeo(false)
            })
    }

    //----setcategory to edit----

    let handleEdit = (cat) => {
        setSelectedEditCat(cat)
        setedit(true)
        setShow(true)
        setCategoryname(cat.categoryname)
    }

    //-----------save edited category-------

    let saveEdit = () => {
        setLoad(true)
        let formdata = new FormData()
        formdata.append('categoryname', categoryname)
        if (image) {
            formdata.append('categoryimg', image)
        }

        axios.put('/category/edit/' + SelectedEditCat._id, formdata)
            .then(res => {
                let temparray = [...categories]
                let index = temparray.findIndex(cat => cat._id === res.data.category._id)
                temparray[index] = res.data.category
                setCategories(temparray)
                handleClose()
                setLoad(false)
            })
    }


    return (
        <>

            <Button variant="primary" onClick={handleShow}>
                Add Category
                        </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{edit ? "Edit" : "Add"} Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control value={categoryname} onChange={(e) => setCategoryname(e.target.value)} type="text" placeholder="Enter category name" /><br></br>
                        <p className='mb-2'><em>{edit && "If you dont want to change thumbnail, leave it empty"}</em></p>
                        <Form.File onChange={(e) => setImage(e.target.files[0])} id="exampleFormControlFile1" />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-sm' variant="secondary" onClick={handleClose}>
                        Close
                                </Button>
                    <Button className='btn-sm' onClick={() => edit ? saveEdit() : handleCat()} variant="primary">
                        {load ? <CircularProgress style={{ color: "white" }} /> : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>


            <div>
                <Dialog
                    open={openSeo}
                    onClose={handleCloseSeo}
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
                        <Button onClick={handleCloseSeo} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={submitSeo} color="primary" autoFocus>
                            Save
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Table style={{ marginTop: "15px", width: "100%" }} striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Images</th>
                        <th>Brand Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories && categories.map((cat, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Image style={{ objectFit: "contain", height: "50px" }} rounded src={cat.categoryimg}></Image></td>
                                <td>{cat.categoryname}</td>
                                <td><Button className='btn-sm' style={{ marginRight: "5px" }} onClick={(e) => handlesetCat(cat)} variant='primary'>SEO</Button>
                                    <Button className='btn-sm' style={{ marginRight: "5px" }} onClick={() => handleEdit(cat)} variant='secondary'>Edit</Button>
                                    <Button className='btn-sm' onClick={() => deleteCat(cat._id)} variant='danger'>Delete</Button>
                                </td>
                            </tr>
                        })
                    }


                </tbody>
            </Table>
        </>
    )
}

export default AdminCategory
