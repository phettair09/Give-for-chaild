import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Booking.css';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const BANQUET = 'เลี้ยงอาหารเด็ก';
const REQUEST = 'จัดหาให้';
const BYMYSELF = 'นำมาเอง';

const Option = (value, name) => {
    return (
        <option key={value} value={value}>
            {name}
        </option>
    );
};

function Booking() {
    const history = useHistory();
    const [cat, setCat] = useState([]);
    const [option, setOption] = useState([]);
    const [foundationOps, setFoundationOps] = useState([]);
    const [catagoryOps, setCatagoryOps] = useState([]);
    const [optionOps, setOptionOps] = useState([]);

    const [foundationSelect, setFoundationSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [optionSelect, setOptionSelect] = useState('');

    // const [name, setName] = useState('');
    // const [tel, setTel] = useState('');
    // const [date, setDate] = useState('');
    // const [location, setLocation] = useState('');
    // const [description, setDescription] = useState('');

    let name = '';
    let tel = '';
    let date = '';
    let description = '';

    // เลี้ยงอาหาร
    // const [duration, setDuration] = useState('');
    // const [budget, setBudget] = useState(0);
    // const [file, setFile] = useState(null);
    let duration;
    let budget;
    let file;

    useEffect(() => {
        Initial();
    }, []);

    const Initial = async () => {
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

        try {
            await axios
                .get(`/foundation-catagory/`)
                .then(function (res) {
                    setCat(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }

        try {
            await axios
                .get(`/foundation-option/`)
                .then(function (res) {
                    setOption(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (foundationSelect != 0) {
            let ops = cat.map((v) => {
                if (v.foundation == foundationSelect) {
                    return Option(v.name, v.name);
                }
            });
            setCatagoryOps(ops);
            setOptionOps([]);
            setOptionSelect(null);
        }
    }, [foundationSelect]);

    useEffect(() => {
        let ops = option.map((v) => {
            if (v.fou_cat_name == categorySelect) {
                return Option(v.name, v.name);
            }
        });
        setOptionOps(ops);
    }, [categorySelect]);

    const FormDuration = () => {
        return (
            <Col sm>
                <Form.Group controlId='FormDuration'>
                    <Form.Label className=' text-lable '>
                        <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                        <span className='header-text'>ช่วงเวลา</span>
                    </Form.Label>
                    <Form.Control
                        required
                        as='select'
                        onChange={(e) => {
                            duration = e.target.value;
                        }}

                        className='border-test'
                    >
                        <option>เลือก</option>
                        <option value='7:00 - 9:00'>7:00 - 9:00</option>
                        <option value='11:00 - 13:00'>11:00 - 13:00</option>
                        <option value='17:00 - 19:00'>17:00 - 19:00</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        );
    };
    const FormBudget = () => {
        return (
            <Col sm>
                <Form.Group controlId='FormBudget'>
                    <Form.Label className=' text-lable '>
                        <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                        <span className='header-text'>งบประมาณ</span>
                    </Form.Label>
                    <Form.Control
                        required
                        type='number'
                        onChange={(e) => {
                            budget = e.target.value;
                        }}
                        placeholder='งบ'
                        className='border-test'
                    />
                </Form.Group>
            </Col>
        );
    };
    const FormSlip = () => {
        return (
            <Col sm>
                <Form.Group controlId='FormSlip'>
                    <Form.Label className=' text-lable '>
                        <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                        <span className='header-text'>สลิป</span>
                    </Form.Label>
                    <Form.File id='exampleFormControlFile1' onChange={onImgChange} />
                </Form.Group>
            </Col>
        );
    };

    const onImgChange = (e) => {
        file = e.target.files[0];
    };

    const Confirm = () => {
        Swal.fire({
            title: 'ยืนยันการจอง',
            text: '',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                ReserveActivity();
            }
        });
    };

    const ReserveActivity = async () => {
        if (
            !foundationSelect ||
            !categorySelect ||
            !optionSelect ||
            !name ||
            !tel ||
            !date ||
            !description
        ) {
            Swal.fire('', 'กรอกข้อมูลให้ครบ', 'warning');
            console.log(1);
            return;
        }

        let data = {
            member_id: localStorage.getItem('id'),
            foundation: foundationSelect,
            category: categorySelect,
            option: optionSelect,
            name: name,
            tel: tel,
            date: date,
            description: description,
        };
        if (BANQUET === categorySelect) {
            if (!duration) {
                Swal.fire('', 'กรอกข้อมูลให้ครบ', 'warning');
                console.log('categorySelect');
                return;
            }
            data = { ...data, ...{ duration: duration } };
            if (REQUEST === optionSelect) {
                if (!file || budget === 0) {
                    Swal.fire('', 'กรอกข้อมูลให้ครบ', 'warning');
                    console.log('optionSelect');
                    return;
                }
                data = { ...data, ...{ budget: budget } };
            }
        }
        let form = new FormData();
        if (REQUEST === optionSelect) {
            form.append('file', file);
        }
        form.append('data', JSON.stringify(data));
        try {
            await axios
                .post('/booking/', form)
                .then((res) => {
                    if (res.status == 200) {
                        Swal.fire('', 'สำเร็จ', 'success');
                        history.push({
                            pathname: '/activity-list',
                            search: '?tab=booking',
                        });
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
            <Container className='all-font mb-5'>
                <br />

                <h3>จองกิจกรรม</h3>
                <br />

                <Form>
                    <Row>
                        <Col sm>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-home.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เลือกมูลนิธิ</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    as='select'
                                    onChange={(e) => {
                                        setFoundationSelect(e.target.value);
                                        setCategorySelect(0);
                                        setOptionSelect(0);
                                    }}
                                    className='border-test'
                                >
                                    <option value={0}>เลือก</option>
                                    {foundationOps}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col sm>
                            <Form.Group controlId='formBasicasdasd'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>ประเภท</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => {
                                        setCategorySelect(e.target.value);
                                        setOptionSelect(0);
                                    }}
                                    as='select'
                                    className='border-test'
                                >
                                    <option>เลือก</option>
                                    {catagoryOps}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col sm>
                            <Form.Group controlId='formBasicasdasdaa'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-option.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>ตัวเลือก</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    as='select'
                                    onChange={(e) => {
                                        setOptionSelect(e.target.value);
                                    }}
                                    className='border-test'
                                >
                                    <option>เลือก</option>
                                    {optionOps}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col sm>
                            <Form.Group controlId='name'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-user.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>ชื่อผู้บริจาค</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    // value={name}
                                    onChange={(e) => {
                                        name = e.target.value;
                                        // setName(e.target.value);
                                    }}
                                    placeholder='กรอกชื่อนามสกุล'
                                    className='border-test'
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId='tel'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-call.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>เบอร์โทรศัพท์</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    pattern="[0-9]+"
                                    // value={tel}
                                    onChange={(e) => {
                                        tel = e.target.value;
                                        // setTel(e.target.value);
                                    }}
                                    placeholder='กรอกเบอร์โทรศัพท์'
                                    className='border-test'
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId='date'>
                                <Form.Label className=' text-lable '>
                                    <img src='./resources/icon-show-calenda.png' style={{ width: 23 }} alt='' />
                                    <span className='header-text'>วันที่จอง</span>
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='date'
                                    // value={date}
                                    onChange={(e) => {
                                        date = e.target.value;
                                        // setDate(e.target.value);
                                    }}
                                    className='border-test'
                                />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Form.Group controlId='description'>
                        <Form.Label className=' text-lable '>
                            <img src='./resources/icon-show-info.png' style={{ width: 23 }} alt='' />
                            <span className='header-text'>รายละเอียด</span>
                        </Form.Label>
                        <Form.Control
                            required
                            type='text'
                            as='textarea'
                            rows={3}
                            placeholder='กรอกรายละเอียด'
                            className='border-test '
                            // value={description}
                            onChange={(e) => {
                                description = e.target.value;
                                // setDescription(e.target.value);
                            }}
                        />
                    </Form.Group>
                </Form>
                    <Row>
                        {optionSelect == REQUEST || optionSelect == BYMYSELF ? <FormDuration /> : null}
                        {optionSelect == REQUEST ? <FormBudget /> : null}
                        {optionSelect == REQUEST ? <FormSlip /> : null}
                    </Row>
                <br />
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <Button className='buttonB' variant='info'>
                            กลับ
                        </Button>
                    </Col>
                    <Col>
                        <Button className='buttonW' onClick={Confirm} variant='info'>
                            ยืนยัน
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default Booking;
