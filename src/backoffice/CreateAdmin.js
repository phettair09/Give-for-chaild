import React, { Component, useEffect, useState } from 'react';
import './css/LoginAdmin.css';
import { Row, Container, Col, Jumbotron, Button,Form } from 'react-bootstrap';

import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './css/CreateAdmin.css';

const CreateAdmin = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [foundation, setFoundation] = useState();

    const [dropdown, setdropdown] = useState([]);

    useEffect(() => {
        axios.get('foundation-list').then((res) => {
            setdropdown(res.data);
        });
    });

    const onSubmit = async () => {
        const data = {
            username: username,
            password: password,
            foundation: foundation,
        };
        try {
            await axios
                .post('/admin/', data)
                .then((res) => {
                    if (res.status == 200) {
                        Swal.fire('', 'สำเร็จ', 'success');
                        setTimeout(() => {
                            history.push('/backend/admin-foundation');
                        }, 1500);
                    }
                })
                .catch((err) => {
                    Swal.fire('', 'พลาด', 'error');
                });
        } catch (err) {
            Swal.fire('', 'พลาด', 'error');
        }
    };
    return (
        <>
            <Container className='all-font' style={{ marginTop: '5%' }}>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Jumbotron>
                            <h3>สร้างบัญชีผู้จัดการมูลนิธิ</h3>
                            <div className='form-group'>
                                <label>Username</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder=''
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    placeholder=''
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <Form.Group controlId="form.foundation">
                                <Form.Label>มูลนิธิ</Form.Label>
                                <Form.Control as="select" onChange={(e) => setFoundation(e.target.value)} >
                                    <option value=''>เลือก</option>
                                    {dropdown.map((v) => {
                                        return <option value={v.name}>{v.name}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                            {/* <div className='form-group'>
                                <label>มูลนิธิ</label>
                                <select onChange={(e) => setFoundation(e.target.value)}>
                                </select>
                            </div> */}
                            <Button className='buttonW' style={{marginLeft:0}} variant='info' onClick={onSubmit}>
                                ยืนยัน
                            </Button>
                        </Jumbotron>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateAdmin;
