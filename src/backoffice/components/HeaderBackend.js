import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillBriefcaseFill, BsPeopleCircle,BsFillCaretLeftFill,BsCodeSlash,BsAward,BsPeopleFill,BsFillCalendarFill,BsFillGiftFill,BsBoxArrowRight } from 'react-icons/bs';
import axios from 'axios';

import '../css/HeaderBackend.css';

const HeaderBackend = () => {
    const [navActive, setNavActive] = useState('');

    return (
        <div
            className='all-font'
            style={{
                width: '300px',
                height: '100vh',
                backgroundColor: '#2C2C2C',
                float: 'left',
            }}
        >
            <div style={{ width: '40%', paddingTop: '5%', margin: '0 auto' }} className='text-center'>
                <img src='/resources/logo-back.png'></img>
            </div>
            <div>
                <p
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'mitr',
                        paddingTop: '10px',
                    }}
                >
                    Give for child
                </p>
            </div>
            <div
                style={{
                    marginLeft: '8%',
                    marginTop: '15%',
                    color: 'white',
                    fontFamily: 'mitr',
                    fontSize: '15px',
                }}
            >
                {/* <h4>{localStorage.getItem('username')}</h4> */}
            </div>
            
            <div className="wrap_nav">
                    <div className="wrap_nav_text">
                        <Link onClick={(e)=>{ setNavActive('foundation') }} to='/backend/foundation'>
                            <BsFillBriefcaseFill className={'title'} />
                            มูลนิธิ
                            {navActive == 'foundation'? <BsFillCaretLeftFill className={'title'} /> :''}
                        </Link>
                    </div>
                </div>

            {localStorage.getItem('username') == 'admin' ? (
                <div className="wrap_nav">
                    <div className="wrap_nav_text">
                        <Link onClick={(e)=>{ setNavActive('generate-json') }} to='/backend/generate-json'>
                            <BsCodeSlash className={'title'} />
                            สร้าง JSON Dialogflow
                            {navActive == 'generate-json'? <BsFillCaretLeftFill className={'title'} /> :''}
                        </Link>
                    </div>
                </div>
            ) : null}

            <div className="wrap_nav">
                <div className="wrap_nav_text">
                    <Link onClick={(e)=>{ setNavActive('admin-foundation') }} to='/backend/admin-foundation'>
                        <BsPeopleCircle className={'title'} />
                        ผู้จัดการมูลนิธิ
                            {navActive == 'admin-foundation'? <BsFillCaretLeftFill className={'title'} /> :''}
                    </Link>
                </div>
            </div>
            {localStorage.getItem('username') == 'admin' ? (
                <div className="wrap_nav">
                    <div className="wrap_nav_text">
                        <Link onClick={(e)=>{ setNavActive('member') }} to='/backend/member'>
                            <BsPeopleCircle className={'title'} />
                            ผู้เข้าร่วม Line official
                            {navActive == 'member'? <BsFillCaretLeftFill className={'title'} /> :''}
                        </Link>
                    </div>
                </div>
            ) : null}

            <div className="wrap_nav">
                <div className="wrap_nav_text">
                    <Link onClick={(e)=>{ setNavActive('activity-back') }} to='/backend/activity-back'>
                        <BsAward className={'title'} />
                        กิจกรรม
                            {navActive == 'activity-back'? <BsFillCaretLeftFill className={'title'} /> :''}
                    </Link>
                </div>
            </div>

            <div className='button-link' className="wrap_nav">
                <div className="wrap_nav_text">
                    <Link onClick={(e)=>{ setNavActive('join-activity') }} to='/backend/join-activity'>
                        <BsPeopleFill className={'title'} />
                        เข้าร่วมกิจกรรม
                            {navActive == 'join-activity'? <BsFillCaretLeftFill className={'title'} /> :''}
                    </Link>
                </div>
            </div>

            <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div className="wrap_nav_text">
                    <Link onClick={(e)=>{ setNavActive('booking-back') }} to='/backend/booking-back'>
                        <BsFillCalendarFill className={'title'} />
                        การจอง
                            {navActive == 'booking-back'? <BsFillCaretLeftFill className={'title'} /> :''}
                    </Link>
                </div>
            </div>

            <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div className="wrap_nav_text">
                    <Link onClick={(e)=>{ setNavActive('donate-back') }} to='/backend/donate-back'>
                        <BsFillGiftFill className={'title'} />
                        การบริจาค
                            {navActive == 'donate-back'? <BsFillCaretLeftFill className={'title'} /> :''}
                    </Link>
                </div>
            </div>

            {/* <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div className="wrap_nav_text">
                    <Link onClick={(e)=>{ setNavActive('foundation') }} to='/backend/create-foundation'>
                        <BsPeopleCircle className={'title'} />
                        สร้างมูลนิธิ
                    </Link>
                </div>
            </div> */}
            {/* <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div className="wrap_nav_text">
                    <Link onClick={(e)=>{ setNavActive('foundation') }} to='/backend/create-admin'>
                        <BsPeopleCircle className={'title'} />
                        สร้างผู้ใช้งานมูลนิธิ
                    </Link>
                </div>
            </div> */}
            <div style={{ width: '100%', height: '40px', backgroundColor: '#2C2C2C' }}>
                <div className="wrap_nav_text">
                    <Link onClick={(e)=>{ setNavActive('foundation') }} to='/backend/logout'>
                        <BsBoxArrowRight className={'title'} />
                        ออกจากระบบ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeaderBackend;
