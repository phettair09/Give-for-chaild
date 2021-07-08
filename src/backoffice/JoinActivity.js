import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card,Col,Row } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';



const DateThai = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

var setTimeOut;
const JoinActivity = () => {
    
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
            .post(`/join_activity/foundation/`,data)
            .then((res) => {
                if (res.data) {
                    setRowData(res.data.map((v) => setRow(v)));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const JoinActivitySuccess = async (id) => {
        axios
            .put(`/join_activity/success/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    updateRows();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    const confirm = (methed) => {
        Swal.fire({
            title: 'เข้าร่วมกิจกรรมสำเร็จ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#347881',
            cancelButtonColor: '#ccc',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                methed();
            }
        });
    };
    
    const cancelJoinActivity = async (id) => {
        await axios.delete(`/join_activity/${id}`).then((res) => {
            Swal.fire({
                title: 'ลบแล้ว',
                icon: 'success',
                confirmButtonColor: 'Green',
                confirmButtonText: 'ตกลง',
            }).then((result) => {
                if (result.isConfirmed) {
                    updateRows();
                }
            });
        });
    }

    
    const sendMail = () => {
        axios.get(`/join_activity/sendmail`).then((res) => {
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
                <td>{data.join_id}</td>
                <td>{data.activity_name}</td>
                <td>{data.member_name}</td>
                <td>{data.tel}</td>
                <td>{data.location}</td>
                <td>{DateThai(new Date(data.created_at))}</td>
                <td>
                    {data.is_success ? (
                        <Button variant='success' disabled>
                            เรียบร้อย
                        </Button>
                    ) : (
                        <Button
                            variant='warning'
                            onClick={() => {
                                confirm(() => {JoinActivitySuccess(data.join_id);})
                            }}
                        >
                            รอดำเนินการ
                        </Button>
                    )}
                </td>
                <td>
                    <Button variant='danger'
                    className='buttonD'
                        onClick={() => {
                            confirm(() => {cancelJoinActivity(data.join_id)})
                        }}
                    >
                        <BsTrash />
                    </Button>
                </td>
            </tr>
        );
    };

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
                    <Card.Title>ข้อมูลการเข้าร่วมกิจกรรม</Card.Title>
                    <Row>
                        <Col col={6}>
                            <Form inline>
                                <FormControl
                                    type='text'
                                    placeholder='ค้นหาชื่อผู้เข้าร่วม'
                                    className=' mr-sm-2'
                                    style={{marginTop: '1.5%' }}
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
                                <th>ชื่อกิจกรรม</th>
                                <th>ผู้เข้าร่วมมกิจกรรม</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>สถานที่</th>
                                <th>วันที่กดเข้าร่วม</th>
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

export default JoinActivity;
