import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Col, Row, Tab, Tabs, Card, Button, CardDeck, Image } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link,useHistory } from 'react-router-dom';

import axios from 'axios';
import { BsFillPersonFill } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Activity.css';
import Footer from '../components/Footer';

let key = 'all';

const Activity = () => {
    const history = useHistory();
    const [activityNow, setActivityNow] = useState([]);
    const [activityComing, setActivityComing] = useState([]);

    useEffect(() => {
        InitialData();
    }, []);

    const InitialData = async () => {
        await axios.get(`/activities/now`).then((res) => {
            if (res.data) {
                setActivityNow(res.data.map((v) => CardActivity(v)));
            }
        });
        await axios.get(`/activities/coming-soon`).then((res) => {
            if (res.data) {
                setActivityComing(res.data.map((v) => CardActivity(v, false)));
            }
        });
    };

    
    const Confirm = (id) => {
        Swal.fire({
            title: 'ยืนยันเข้าร่วม',
            text: '',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                joinActivity(id);
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
                    history.push({
                        pathname: '/activity-list',
                        search: '?tab=activity',
                    });
                })
                .catch(function (err) {
                    Swal.fire('', 'ไม่สามารถเข้าร่วมได้', 'error');
                });
        } catch (err) {
            Swal.fire('', 'ไม่สามารถเข้าร่วมได้', 'error');
        }
    };

    const CardActivity = (data, coming = true) => {
        let start = new Date(data.start_time);
        let end = new Date(data.end_time);

        const JoinBtn = () => {
            return (
                <Button
                    className='font-button'
                    style={{
                        width: '114%',
                        backgroundColor: '#377780',
                        color: 'white',
                    }}
                    variant=''
                    onClick={() => {
                        Confirm(data.id);
                    }}
                    disabled={data.person >= data.person_max}
                >
                    {data.person >= data.person_max ? 'เต็มแล้ว' : 'เข้าร่วมกิจกรรม'}
                </Button>
            );
        };
        return (
            <Card border='light' className='card shadow card-radin ' style={{ marginTop: 20 }}>
                <div
                    className='head-card'
                    style={{
                        backgroundImage: `url('./resources/uploads/${data.image}')`,
                    }}
                ></div>
                {/* <Card.Img variant='top' src= /> */}
                <Card.Body>
                    <Card.Title style={{ fontSize: '22px' }}>
                        {data.name.substring(0, 40) + (data.name.length > 40 ? '...' : '')}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '13px', fontWeight: '400', marginTop: '' }}>
                        <div style={{ color: 'Gray' }}>
                            <p style={{ float: 'left' }}>วันที่เปิด/ปิดรับสมัคร : </p>
                            <p style={{ color: '#377780' }}>
                                {moment(start).format('D/MM/YY')} - {moment(end).format('D/MM/YY')}
                            </p>
                        </div>
                    </Card.Text>

                    <Card.Text style={{ fontSize: '16px', fontWeight: '400' }}>
                        <div>
                            <p
                                style={{
                                    float: 'left',
                                    fontSize: '25px',
                                    marginTop: -15,
                                }}
                            >
                                <BsFillPersonFill />
                            </p>
                            <p style={{ color: '#377780', paddingRight: 10 }}>
                                {' '}
                                คนเข้าร่วมกิจกรรม {data.person}/{data.person_max} คน
                            </p>
                        </div>
                    </Card.Text>

                    <Card.Text>
                        {data.description.substring(0, 150) + (data.description.length > 150 ? '...' : '')}
                    </Card.Text>

                    <Row>
                        <Col md={5} xs={5}>
                            {coming ? <JoinBtn /> : null}
                        </Col>

                        <Col md={{ span: 5, offset: 2 }} xs={{ span: 5, offset: 2 }}>
                            <Link to={`/activity-detail/${data.id}`} style={{ color: 'white' }}>
                                <Button
                                className='font-button'
                                style={{
                                    width: '100%',
                                    backgroundColor: '#377780',
                                    color: 'white',
                                }}
                                variant=''
                            >
                                    ดูรายละเอียด
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    };

    return (
        <div>
            {/* <Image src='./resources/eventsBanner.jpg' fluid /> */}
            <Container className='all-font'>
                <br />

                <h3 style={{ textAlign: 'Left' }}>กิจกรรมอาสา</h3>
                <br />

                <div className='nav-tabs-50'>
                    <Tabs className='font-teb ' defaultActiveKey='home' transition={false} id='noanim-tab-example'>
                        <Tab eventKey='home' title='กิจกรรมขณะนี้'>
                            <Container className='all-font'>
                                <CardDeck>{activityNow}</CardDeck>
                            </Container>
                        </Tab>
                        <Tab eventKey='profile' title='ที่จะมาถึง'>
                            <CardDeck>{activityComing}</CardDeck>
                        </Tab>
                    </Tabs>
                </div>
                <br />
            </Container>
            <Footer />
        </div>
    );
};

export default Activity;
