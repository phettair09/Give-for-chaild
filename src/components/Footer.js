import React from 'react';
import { Row, Col , Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/css/Header.css';

const Footer = () => {
    
    const onErrorLogo = (e) => {
        e.target.src = '/resources/logo.png';
    };

    return (
        <div id="footer" style={{paddingTop:50}}>
            <Container>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <Link to='/'>
                        <img src='./resources/logo-back.png' onError={onErrorLogo} style={{ width: 105 }} alt='' />
                    </Link>
                </Col>
                <Col id="address">
                    ที่ตั้ง : มหาวิทยาลัยศิลปากร เมืองทองธานี
                    <br />
                    เลขที่ 80 ถนนป๊อปปูล่า ต.บ้านใหม่ อำเภอปากเกร็ด จังหวัดนนทบุรี 11120
                    <br />
                    โทรศัพท์ : 093-165-4886
                    <br />
                    E-mail : give-for-child@gmail.com
                </Col>
                <Col style={{ marginLeft: '5%' }}>
                    <Link className='link-footer' to='/activity'>
                        กิจกรรม
                    </Link>
                    <br />
                    <Link className='link-footer' to='/booking'>
                        จองกิจกรรม
                    </Link>
                    <br />
                    <Link className='link-footer' to='/donate'>
                        การบริจาค
                    </Link>
                    <br />
                    <Link className='link-footer' to='/activity-list'>
                        รายการที่เข้าร่วม
                    </Link>
                    <br />
                    <Link className='link-footer' to='/profile'>
                        ผู้ใช้งาน
                    </Link>
                    <br />
                    <Link className='link-footer' to='/logout'>
                        ออกจากระบบ
                    </Link>
                    <br />
                </Col>
                <Col sm className='wrap-social'>
                    <Link to='/'>
                        <img className='footer-social' src='./resources/facebook.png' style={{ width: 25 }} alt='' />
                    </Link>
                    <Link to='/'>
                        <img className='footer-social' src='./resources/instagram.png' style={{ width: 25, marginLeft: '6%' }} alt='' />
                    </Link>
                    <Link to='/'>
                        <img className='footer-social' src='./resources/twitter.png' style={{ width: 25, marginLeft: '6%' }} alt='' />
                    </Link>
                    <Link to='/'>
                        <img className='footer-social' src='./resources/youtube.png' style={{ width: 25, marginLeft: '6%' }} alt='' />
                    </Link>
                </Col>
            </Row>
            <div className='copy'>Copyright © 2021 All Rights Reserved | Give-for-chlid</div>
            </Container>
        </div>
    );
};

export default Footer;
