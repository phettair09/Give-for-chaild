import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/DonateForm.css';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';

import axios from 'axios';


const Option = (value, name) => {
    return (
        <option key={value} value={value}>
            {name}
        </option>
    );
};
function DonateForm() {
    const history = useHistory();

    const [foundationOps, setFoundationOps] = useState([]);
    let name = '';
    let foundation = '';
    let tel = '';
    let date_time = '';
    let location = '';
    let description = '';

    useEffect(() => {
        getFoundation();
    }, []);

    const getFoundation = async () => {
        try {
            await axios
                .get(`/foundation/`)
                .then(function (res) {
                    let ops = res.data.map((v) => {
                        return Option(v.name, v.name);
                    });
                    setFoundationOps(ops);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async () => {
        if (!name || !foundation || !tel || !date_time || !location || !description) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'warning');
            return;
        }
        const data = {
            member_id: localStorage.getItem('id'),
            name: name,
            tel: tel,
            foundation: foundation,
            date_time: date_time,
            location: location,
            description: description,
        };
        var formData = new FormData();
        formData.append('body', JSON.stringify(data));

        await axios
            .post('/donation', formData)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire('', 'สำเร็จ', 'success');
                    history.push({
                        pathname: '/activity-list',
                        search: '?tab=donate',
                    });
                } else {
                    Swal.fire('', 'ผิดพลาด', 'error');
                }
            })
            .catch((err) => {
                Swal.fire('', 'ผิดพลาด', 'error');
            });
    };

    return (
        <>
            <Container className='all-font mb-5'>
                <br />
                <h3>การบริจาค</h3>
                <br />

                <Form>
                    <Row>
                        <Col sm>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label className='text-lable'>
                                    <img src='./resources/icon-show-home.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เลือกมูลนิธิ</span>
                                </Form.Label>
                                <Form.Control
                                    className='border-test'
                                    as='select'
                                    onChange={(e) => {
                                        foundation = e.target.value;
                                    }}
                                >
                                    <option>เลือก</option>
                                    {foundationOps}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId='name1'>
                                <Form.Label className='text-lable'>
                                    <img src='./resources/icon-show-user.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>ชื่อผู้บริจาค</span>
                                </Form.Label>
                                <Form.Control
                                    className='border-test'
                                    type='none'
                                    onChange={(e) => {
                                        name = e.target.value;
                                    }}
                                    placeholder='ชื่อ - นามสกุล'
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId='tel1'>
                                <Form.Label className='text-lable'>
                                    <img src='./resources/icon-show-call.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เบอร์โทรศัพท์</span>
                                </Form.Label>
                                <Form.Control
                                    className='border-test'
                                    type='none'
                                    pattern="[0-9]+"
                                    onChange={(e) => {
                                        tel = e.target.value;
                                    }}
                                    placeholder='กรอกเบอร์โทรศัพท์'
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='tel'>
                                <Form.Label className='text-lable'>
                                    <img src='./resources/icon-show-calenda.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เลือกวันส่งของ</span>
                                </Form.Label>
                                <Form.Control
                                    className='border-test'
                                    type='datetime-local'
                                    onChange={(e) => {
                                        date_time = e.target.value;
                                    }}
                                    placeholder='เวลา'
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId='state1'>
                        <Form.Label className='text-lable'>
                            <img src='./resources/icon-show.png' style={{ width: 23 }} alt='' />

                            <span className='header-text'>สถานที่</span>
                        </Form.Label>
                        <Form.Control
                            className='border-test'
                            type='none'
                            onChange={(e) => {
                                location = e.target.value;
                            }}
                            placeholder='กรอกสถานที่'
                        />
                    </Form.Group>

                    <Form.Group controlId='description1'>
                        <Form.Label className='text-lable'>
                            <img src='./resources/icon-show-info.png' style={{ width: 23 }} alt='' />
                            <span className='header-text'>รายละเอียด</span>
                        </Form.Label>
                        <Form.Control
                            className='border-test'
                            as='textarea'
                            rows={3}
                            type='none'
                            onChange={(e) => {
                                description = e.target.value;
                            }}
                            placeholder='กรอกรายละเอียด'
                        />
                    </Form.Group>
                </Form>
                <br />

                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <Button className='buttonB' variant='info'>
                            กลับ
                        </Button>
                    </Col>
                    <Col>
                        <Button className='buttonW' onClick={onSubmit} variant='info'>
                            ยืนยัน
                        </Button>
                    </Col>
                </Row>

            </Container>

            <Footer/>
        </>
    );
}

export default DonateForm;
