import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Form, Tabs, Tab, Col, CardDeck, Card, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Profile.css';
import axios from 'axios';
import Footer from '../components/Footer';
import moment from 'moment';
import { BsFillPersonFill } from 'react-icons/bs';

function Profile() {
    const [key, setKey] = useState('activity');
    const [activity, setActivity] = useState([]);
    const [donate, setDonate] = useState([]);
    const [booking, setBooking] = useState([]);
    let userId = localStorage.getItem('id');

    useEffect(() => {
        InitialData();
        setTimeout(() => {
            const query = window.location.search;
            const urlParams = new URLSearchParams(query);
            if (urlParams.get('tab')) {
                setKey(urlParams.get('tab'));
            }
        }, 100);
    }, []);

    const InitialData = async () => {
        await axios.get(`/activity/member/success/${userId || 0}`).then((res) => {
            setActivity(res.data);
        });
        await axios.get(`/donation/member/success/${userId || 0}`).then((res) => {
            setDonate(res.data);
        });
        await axios.get(`/booking/member/success/${userId || 0}`).then((res) => {
            setBooking(res.data);
        });
    };
    return (
        <>
        
        <Container className='all-font mb-5'>
            <br />
            <Form>
                <h3>โปรไฟล์ของฉัน</h3>
                <Row>
                    <Col xs={12} md={6}>
                        <br />
                        <div className='profile' style={{ textAlign: 'center' }}>
                            <img src={localStorage.getItem('imgProfile')} />
                        </div>
                        <br />
                    </Col>
                    <Col xs={12} md={6}>
                        <br />
                        <div className="profile_info">
                            <span className='name-profile'>{localStorage.getItem('name')}</span>
                            <br />

                            <p className='history'>ประวัติ</p>
                        </div>
                        <ListGroup horizontal>
                            <ListGroup.Item>
                                <h4>{activity.length}</h4>
                                <p>กิจกรรม</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>{donate.length}</h4>
                                <p>บริจาค</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>{booking.length}</h4>
                                <p>จอง</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <br />
                <div>
                    <Tabs
                        id='controlled-tab-example'
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className='nav-tabs-33'
                    >
                        <Tab eventKey='activity' title='กิจกรรม'>
                            <CardDeck>
                                {activity.map((data) => {
                                    return (
                                        <Card
                                            border='light'
                                            className='card shadow card-radin '
                                            style={{ marginTop: 20 }}
                                        >
                                            <div
                                                className='head-card'
                                                style={{
                                                    backgroundImage: `url('./resources/uploads/${data.image}')`,
                                                }}
                                            ></div>
                                            {/* <Card.Img variant='top' src= /> */}
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '22px' }}>{data.name}</Card.Title>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>วันที่เปิด/ปิดรับสมัคร : </p>
                                                        <p style={{ color: '#377780' }}>
                                                            {moment(data.start).format('D/MM/YY')} -{' '}
                                                            {moment(data.end).format('D/MM/YY')}
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
                                                    {data.description.substring(0, 80) +
                                                        (data.description.length > 40 ? '...' : '')}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardDeck>
                        </Tab>
                        <Tab eventKey='donate' title='การบริจาค'>
                            <CardDeck>
                                {donate.map((data) => {
                                    return (
                                        <Card
                                            border='light'
                                            className='card shadow card-radin '
                                            style={{ marginTop: 20 }}
                                        >
                                            {/* <Card.Img variant='top' src= /> */}
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '22px' }}>{data.foundation}</Card.Title>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>ผู้บริจาค : </p>
                                                        <p style={{ color: '#377780' }}>{data.name}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>เบอร์โทร : </p>
                                                        <p style={{ color: '#377780' }}>{data.tel}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>วัน - เวลา : </p>
                                                        <p style={{ color: '#377780' }}>
                                                            {moment(data.date_time).format('D/MM/YY')}
                                                        </p>
                                                    </div>
                                                </Card.Text>

                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>สถานที่ : </p>
                                                        <p style={{ color: '#377780' }}>{data.location}</p>
                                                    </div>
                                                </Card.Text>

                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>      รายละเอียด : </p>
                                                        <p style={{ color: '#377780' }}>
                                                    {data.description.substring(0, 80) +
                                                        (data.description.length > 40 ? '...' : '')}</p>
                                                    </div>
                                                </Card.Text>

                                               
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardDeck>
                        </Tab>
                        <Tab eventKey='booking' title='การจอง'>
                            <CardDeck>
                                {booking.map((data) => {
                                    return (
                                        <Card
                                            border='light'
                                            className='card shadow card-radin '
                                            style={{ marginTop: 20 }}
                                        >
                                            {/* <Card.Img variant='top' src= /> */}
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '22px' }}>{data.foundation}</Card.Title>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>ประเภท : </p>
                                                        <p style={{ color: '#377780' }}>{data.category}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>ตัวเลือก : </p>
                                                        <p style={{ color: '#377780' }}>{data.option}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>ชื่อผู้จอง : </p>
                                                        <p style={{ color: '#377780' }}>{data.name}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>เบอร์โทร : </p>
                                                        <p style={{ color: '#377780' }}>{data.tel}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>สถานที่ : </p>
                                                        <p style={{ color: '#377780' }}>{data.location}</p>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        marginTop: '',
                                                    }}
                                                >
                                                    <div style={{ color: 'Gray' }}>
                                                        <p style={{ float: 'left' }}>วันที่ : </p>
                                                        <p style={{ color: '#377780' }}>
                                                            {moment(data.date).format('D/MM/YY')}
                                                        </p>
                                                    </div>
                                                </Card.Text>

                                                <Card.Text>
                                                    รายละเอียด :
                                                    {data.description.substring(0, 80) +
                                                        (data.description.length > 40 ? '...' : '')}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardDeck>
                        </Tab>
                    </Tabs>
                </div>
            </Form>
        </Container>
        <Footer/>
        </>
    );
}

export default Profile;
