import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card, Row, Col } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import './css/ActivityBack.css';
import axios from 'axios';
import moment from 'moment';

import Swal from 'sweetalert2';



const DateThai = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

var setTimeOut;
const DonateBack = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        updateRows();
    }, []);

    const [search, setSearch] = useState('');
    useEffect(() => {
        window.clearTimeout(setTimeOut);

        setTimeOut = setTimeout(() => {
            updateRows(search ? search : '');
        }, 500);
    }, [search]);

    const updateRows = async (search = null) => {
        let data = {
            foundation: localStorage.getItem('foundation'),
            search: search
        }
        axios
            .post(`/donation/foundation/`,data)
            .then((res) => {
                if (res.data) {
                    setRowData(res.data.map((v) => setRow(v)));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const DonateSuccess = async (id) => {
        axios
            .put(`/donation/success/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    updateRows();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    const sendMail = () => {
        axios.get(`/donation/sendmail`).then((res) => {
            Swal.fire({
                title: 'ส่ง Email เรียบร้อย',
                icon: 'success',
                confirmButtonColor: 'Green',
                confirmButtonText: 'ตกลง',
            }).then((result) => {
                
            });
        });
    }

    const setRow = (data) => {
        // ใส่ชื่อ column ทั้งหมดตาม table
        return (
            <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.tel}</td>
                <td>{data.location}</td>
                {/* {moment(data.start_time).format('MMMM Do YYYY')} -{' '} */}

                <td>{DateThai(new Date(data.date_time))}</td>
                <td>
                    {data.is_success ? (
                        <Button variant='warning' disabled>
                            เรียบร้อย
                        </Button>
                    ) : (
                        <Button
                            variant='success'
                            onClick={() => {
                                confirm(() => {
                                    DonateSuccess(data.id)
                                })
                            }}
                        >
                            สำเร็จ
                        </Button>
                    )}
                </td>
                <td>
                    <Button
                        onClick={() => {
                            confirm(() => {
                                cancelDonate(data.id)
                            })
                        }}
                        variant='outline-danger'
                    >
                        <BsTrash />
                    </Button>
                </td>
            </tr>
        );
    };

    
    const confirm = (methed) => {
        Swal.fire({
            title: 'ยืนยัน',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0062cc',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                methed();
            }
        });
    };

    const cancelDonate = (id) => {
        axios.delete(`/donation/${id}/`).then((res) => {
            Swal.fire({
                title: 'ลบข้อมูลสำเร็จ!',
                text: 'กด ok เพื่อดำเนินการต่อ',
                icon: 'success',
                confirmButtonColor: 'Green',
                confirmButtonText: 'Ok',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        });
    }

    return (
        <div
            className='all-font'
            style={{
                width: 'calc(100%-300px;)',
                height: '100vh',
                overflow: 'scroll',
            }}
        >
            <div style={{ padding: '3rem' }}>
                <Card style={{ padding: '1.5rem' }}>
                    <Card.Title>รับบริจาคสิ่งของ</Card.Title>
                    <Row>
                        <Col col={6}>
                            <Form inline>
                                <FormControl
                                    type='text'
                                    placeholder='ค้นหาชื่อผู้เข้าร่วม'
                                    className=' mr-sm-2'
                                    style={{ marginLeft: '2%', marginTop: '1.5%' }}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {}
                            </Form>
                        </Col>
                        <Col col={6} inline>
                            <Button style={{float:'right',width:250}} onClick={sendMail}>ส่ง Email แจ้งเตือนสำหรับวันนี้</Button>
                        </Col>
                    </Row>

                    <Table striped hover style={{ marginTop: '1.5%' }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ชื่อผู้บริจาค</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>สถานที่</th>
                                <th>วันและเวลา</th>
                                <th>ตัวเลือก</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{rowData}</tbody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default DonateBack;
