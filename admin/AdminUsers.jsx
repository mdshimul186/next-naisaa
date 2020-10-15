import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Image, Button, Modal, Form } from 'react-bootstrap'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function AdminUsers() {
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [sellerstatus, setsellerstatus] = useState('');
    const [online, setOnline] = useState(false);
    const [SearchText, setSearchText] = useState('')


    const handleClose = () => {
        setSelectedUser({})
        setsellerstatus('')
        setShow(false)
        setOnline(false)

    };

    let optionval = ['new', 'intermediate', 'expert']

    const handleShow = () => setShow(true);
    //select user to edit
    let handleSelect = (user) => {
        setSelectedUser(user)
        setsellerstatus(user.sellerstatus)
        setOnline(user.status == 'online' ? true : false)
        handleShow()
    }
    //get all user
    useEffect(() => {
        axios.get('/user/alluser')
            .then(res => {
                setUsers(res.data.user)
            })
    }, [])
    //search user
    let searchedUser = () => {
        axios.get(`/user/alluser?search=${SearchText}`)
            .then(res => {
                setUsers(res.data.user)
            })
    }
    //save edited user
    let handleEdit = () => {
        let newUser = {
            sellerstatus,
            status: online ? "online" : "offline"
        }
        console.log(newUser);

        axios.patch('/user/edituser/' + selectedUser._id, newUser)
            .then(res => {
                let temparray = [...users]
                let index = temparray.findIndex(u => u._id == res.data.user._id)
                temparray[index] = res.data.user
                setUsers(temparray)
                handleClose()
            })

    }

    return (
        <div>
        {/* dialogue to edit user */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                    <label>select a rank</label><br></br>
                    <FormControl >

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sellerstatus}
                            onChange={(e) => setsellerstatus(e.target.value)}
                        >
                            <MenuItem value={'new'}>New</MenuItem>
                            <MenuItem value={'intermediate'}>Intermediate</MenuItem>
                            <MenuItem value={'expert'}>Expert</MenuItem>
                        </Select>
                    </FormControl><br></br>


                    <FormControlLabel
                        value="end"
                        control={<Switch checked={online} onChange={(e) => setOnline(e.target.checked)} color="primary" />}
                        label="Show user online ?"
                        labelPlacement="start"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-sm' variant="secondary" onClick={handleClose}>
                        Close
                                </Button>
                    <Button onClick={() => handleEdit()} className='btn-sm' variant="primary">
                        save
                                </Button>
                </Modal.Footer>

            </Modal>

            <div class="example" style={{ marginLeft: 'auto', maxWidth: "300px" }}>
                <input value={SearchText} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search user.." name="search2" />
                <button onClick={() => searchedUser()} type="submit"><i class="fa fa-search"></i></button>
            </div>

            {/* display all user */}
            <Table style={{ marginTop: "15px", width: "100%" }} striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Seller rank</th>
                        <th>Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 && users.map((user, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>
                                <td>{user.sellerstatus}</td>
                                <td>
                                    {
                                        user.username === 'admin' ? "" : <Button onClick={() => window.open('/user/chat/' + user.username)} className='btn-success btn-sm'>Send message</Button>
                                    }

                                </td>

                                <td><Button onClick={() => handleSelect(user)} className='btn-sm'>Action</Button></td>
                            </tr>
                        })
                    }


                </tbody>
            </Table>
        </div>
    )
}

export default AdminUsers
