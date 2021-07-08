import React, {  useState, useEffect } from 'react';
import { Container, Carousel,Card, Col, Row, Button, CardDeck } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './css/Home.css';
import moment from 'moment';
import Footer from '../components/Footer';
import { BsFillPersonFill } from 'react-icons/bs';

function Home() {
    
    const [activityNow, setActivityNow] = useState([]);
    
    useEffect(() => {
        InitialData();
    }, []);

    const InitialData = async () => {
        await axios.get(`/activity-home`).then((res) => {
            if (res.data) {
                setActivityNow(res.data.map((v) => CardActivity(v)));
            }
        });
    };

    
    const CardActivity = (data, coming = true) => {
        let start = new Date(data.start_time);
        let end = new Date(data.end_time);

        return (
            <Card key={data.id} border='light' className='card shadow card-radin ' style={{ marginTop: 20 }}>
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
                    <Card.Text style={{ fontSize: '14px', fontWeight: '400', marginTop: '' }}>
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
                        {/* <Col md={5} xs={5}>
                            {coming ? <JoinBtn /> : null}
                        </Col> */}

                        <Col >
                            <Link to={`/activity-detail/${data.id}`} style={{ color: 'white' }}>
                                <Button
                                    className='font-button'
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#377780',
                                        color: 'white',
                                    }}
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
        <div className='all-font'>
            <div className='banner-test'>
                <Carousel>
                    <Carousel.Item style={{backgroundImage:`url(./resources/banner-home1.jpg)`}}>
                        <Carousel.Caption>
                            <h1>“มอบน้ำใจจากคุณ ช่วยชีวิตพวกเขาตอนนี้”</h1>
                            <p>สิ่งของและเงินทุกบาทของท่านจะถูกบริจาคไปให้กับบ้านเด็กกำพร้า</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{backgroundImage:`url(./resources/banner-hero.jpg)`}}>

                        <Carousel.Caption>
                            <h1>"ปัจจุบันมีเด็กกำพร้า ที่เติบโตในสังคมไทยมากกว่า 800,000 คน"</h1>
                            <p>สิ่งของและเงินทุกบาทของท่านจะถูกบริจาคไปให้กับบ้านเด็กกำพร้า</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{backgroundImage:`url(./resources/banner-hero2.jpg)`}}>

                        <Carousel.Caption>
                            <h1>มอบรัก มอบ ”ชีวิตใหม่” ให้พวกเขา</h1>
                            <p>สิ่งของและเงินทุกบาทของท่านจะถูกบริจาคไปให้กับบ้านเด็กกำพร้า</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <Container>
                <div className="wrap-content-home" style={{ textAlign: 'center', marginTop: '6%' }}>
                    <h3>แนะนำเว็บแอปพลิเคชัน</h3>
                    <p>
                        วันนี้เด็กๆ หลายคนคงเตรียมตัวออกไปร่วมกิจกรรมงานวันเด็กแห่งชาติประจำปีกันอย่างคึกคัก
                        <br />
                        แต่ก็มีเด็กอีกกลุ่มหนึ่ง ที่อาจจะไม่ได้ไปร่วมงานเหล่านี้ นั่นคือ เด็กที่ถูกผู้ปกครองทอดทิ้ง
                        ซึ่งจากสถิติปัจจุบันพบว่า เด็กที่ถูกทอดทิ้งพุ่งสูงขึ้นทุกปี...
                    </p>
                </div>
                <Row className="wrap-content-home">
                    <Col sm style={{ textAlign: 'center' }}>
                        <div className='icon'>
                            <img src='./resources/charity1.png' alt='' />
                        </div>
                        <div>
                            <h3>Give for child</h3>
                            <p>
                                Web application ที่เป็นการเชื่อมต่อ <br />
                                การทำความดี
                            </p>
                        </div>
                    </Col>
                    <Col sm style={{ textAlign: 'center' }}>
                        <div className='icon'>
                            <img src='./resources/charity3.png' alt='' />
                        </div>
                        <div>
                            <h3>งานอาสา</h3>
                            <p>
                                เลือกใช้เวลากับงานอาสาที่ตรงใจหรือ
                                <br />
                                จองเลี้ยงอาหารเด็กที่สอดคล้องกับเวลาของคุณ
                            </p>
                        </div>
                    </Col>
                    <Col sm style={{ textAlign: 'center' }}>
                        <div className='icon'>
                            <img src='./resources/charity2.png' alt='' />
                        </div>
                        <div>
                            <h3>ร่วมสนับสนุนกับเรา</h3>
                            <p>
                                ช่องทางในการเชื่อมต่อการทำความดีคุณสามารถเข้าร่วมกิจกรรมต่างๆเพื่อพัฒนาสังคมกับเราได้โดยการบริจาคหรือเข้าร่วมกิจกรรมต่างๆ
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Container className='all-font'>
                        <CardDeck>{activityNow}</CardDeck>
                    </Container>
                </Row>
                <Row style={{ textAlign: 'center',paddingTop:30 }}>
                    <Col>
                        <Link to='/activity' style={{textDecoration:'none',color:'#fff'}}>
                            <Button className='buttonW' variant='info'>เพิ่มเติม</Button>
                        </Link>
                    </Col>
                </Row>

                <div className='group-menu wrap-content-home'>
                    <Row>
                        <Col md={12}>
                            <Link to='/'>
                                <img className='main-menu' src='./resources/found4.png' alt='' />
                            </Link>
                            <Link to='/'>
                                <img className='main-menu' src='./resources/found5.png' alt='' />
                            </Link>
                            <Link to='/'>
                                <img className='main-menu' src='./resources/found6.png' alt='' />
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
            
            <Footer />
        </div>
    );
}

export default Home;
