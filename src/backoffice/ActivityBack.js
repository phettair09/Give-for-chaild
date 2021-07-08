import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card, Pagination, Row } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import './css/ActivityBack.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const DateThai = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

var setTimeOut;
const ActivityBack = () => {
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
            .post(`/activities/foundation/`,data)
            .then((res) => {
                if (res.data) {
                    setRowData(res.data.map((v) => setRow(v)));
                }
            })
            .catch((err) => {
                console.log(err);
            });
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

    const cancelActivity = (id) => {
        axios.delete(`/activity/${id}/`).then((res) => {
            Swal.fire({
                title: 'เรียบร้อย',
                // text: 'Your file has been deleted.',
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


    const setRow = (data) => {
        // ใส่ชื่อ column ทั้งหมดตาม table
        return (
            <tr>
                <td>{data.id}</td>
                <td>
                    <img src={`../resources/uploads/` + data.image} alt='' style={{ width: '80px' }} />
                </td>
                <td>{data.name}</td>
                <td>{data.tel}</td>
                <td>{data.location}</td>
                <td>
                    {DateThai(new Date(data.start_time))} - {DateThai(new Date(data.end_time))}
                </td>
                <td>{data.person_max}</td>
                <td>
                    <Link to={`/backend/activity-edit/${data.id}`} style={{ color: 'white' }}>
                        <Button variant='warning'>
                                แก้ไข
                        </Button>
                    </Link>
                </td>
                <td>
                    <Button
                    className='buttonD'
                        onClick={() => {
                            confirm(() => { cancelActivity(data.id);})
                        }}
                        variant='danger'
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
                    <Card.Title>กิจกรรม</Card.Title>
                    <div>
                        <Link to='/backend/create-activity' style={{ color: 'white' }}>
                            <Button variant='primary'>
                                    สร้างกิจกรรม
                            </Button>
                        </Link>
                    </div>

                    <Form inline>
                        <FormControl
                            type='text'
                            placeholder='ค้นหาชื่อกิจกรรม'
                            className=' mr-sm-2'
                            style={{marginTop: '1.5%' }}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        {/* <Button type='submit'>Submit</Button> */}
                    </Form>

                    <Table striped hover style={{ marginTop: '1.5%' }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>รูปภาพ</th>
                                <th>ชื่อกิจกรรม</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>สถานที่</th>
                                <th>วันเริ่ม-จบกิจกรรม</th>
                                <th>จำนวนคน</th>
                                <th></th>
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

export default ActivityBack;
