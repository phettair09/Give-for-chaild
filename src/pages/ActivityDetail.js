import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Container, Col, Row, Tab, Tabs, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import axios from 'axios';
import { BsArrowLeftShort } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Activity.css';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ThaiDate = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};



const ActivityDetail = (props) => {
    const [activity, setActivity] = useState({});
    useEffect(() => {
        try {
            axios
                .get(`/activity/${props.match.params.id}}`)
                .then(function (res) {
                    setActivity(res.data);
                })
                .catch(function (err) {});
        } catch (err) {
            console.log(err);
            if (err.response.status === 500) {
            } else {
            }
        }
    }, []);
    
    
const Confirm = (method) => {
    Swal.fire({
        title: 'ยืนยันเข้าร่วม',
        text: '',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#377780',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed) {
            method();
        }
    });
};

const joinActivity = async (activity_id) => {
    const data = {
        activity_id: activity_id,
        member_id: localStorage.getItem('id'),
    };
    try {
        axios
            .post('/join-activity', data)
            .then(function (res) {
                Swal.fire('', res.data, 'success');
                console.log(res.data);
            })
            .catch(function (err) {
                Swal.fire('', 'พลาด', 'error');
            });
    } catch (err) {
        console.log(err);
        if (err.response.status === 500) {
            Swal.fire('', 'พลาด', 'error');
        } else {
            Swal.fire('', 'พลาด', 'error');
        }
    }
};
    return (
        <div>
            <Container className='all-font'>
            <br />

            <Row>
                <Col md={4}>
                    <Link onClick={() => { window.history.back()}}>
                        <Row style={{ paddingLeft: '16px' }}>
                            <BsArrowLeftShort size={28} color={'#000000'} />

                            <div className='text-back'>ย้อนกลับ </div>
                        </Row>
                    </Link>
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                    <h2 style={{ paddingTop:'40px' }}>รายละเอียด</h2>
                </Col>
            </Row>

            <div className='nav-tabs-50 mb-5'>
                <Row>
                    <Col sm={8}>
                        <Card border='light' className='card shadow' style={{ marginTop: 20 }}>
                            <div
                                className='detail-card'
                                style={{
                                    backgroundImage: `url('../resources/uploads/${activity.image}')`,
                                }}
                            ></div>
                            <Card.Body>
                                <Card.Title style={{ fontSize: '22px' }}>{activity.name}</Card.Title>

                                <Card.Text style={{ fontSize: '14px', fontWeight: '400' }}>
                                    {ThaiDate(new Date(activity.start_time))} - {ThaiDate(new Date(activity.end_time))}
                                </Card.Text>

                                <Card.Text>{activity.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={4}>
                        <Card border='light' className='card shadow' style={{ marginTop: 20 }}>
                            <Card.Body>

                                <Row style={{ paddingLeft: '16px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>สถานที่ :
                                    <span className='data-detail'>{activity.location}</span>
                                    </div>

                                    
                                </Row>

                                <Row style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show-call.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>ติดต่อ :</div>

                                    <div className='data-detail'>{activity.tel}</div>
                                </Row>

                                <Row style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show-home.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>ผู้จัดกิจกรรม :</div>

                                    <div className='data-detail'>{activity.foundation}</div>
                                </Row>

                                <Row style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show-calenda.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>วันที่จัดกิจกรรม :</div>

                                    <div className='data-detail'>{ThaiDate(new Date(activity.start_time))}</div>
                                </Row>

                                <Row style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <img
                                        src={process.env.PUBLIC_URL + '/resources/icon-show-user.png'}
                                        style={{ width: 25 }}
                                        alt=''
                                    />

                                    <div className='text-detail'>คนเข้าร่วมกิจกรรม :</div>

                                    <div className='data-detail'>
                                        {activity.person}/{activity.person_max} คน
                                    </div>
                                </Row>
                                <br />
                                {new Date(activity.start_time) < new Date() && localStorage.getItem('id') != null ? (
                                    <Row>
                                        <Col>
                                            <Button
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: '#377780',
                                                    color: 'white',
                                                }}
                                                variant=''
                                                onClick={() => {
                                                    Confirm(() => {joinActivity(activity.id);} );
                                                }}
                                                disabled={activity.person >= activity.person_max}
                                            >
                                                {activity.person >= activity.person_max
                                                    ? 'เต็มแล้ว'
                                                    : 'เข้าร่วมกิจกรรม'}
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    ''
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
                <Footer />
        </div>
    );
};

export default ActivityDetail;
