import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card, Modal } from 'react-bootstrap';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import CreateAdmin from './CreateAdmin';

const AdminFoundation = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        updateRows();
    }, []);

    const updateRows = async () => {
        try {
            await axios
                .get(`/admin/foundation/${localStorage.getItem('foundation')}`)
                .then(function (res) {
                    if (res.data) {
                        setRowData(res.data);
                    }
                })
                .catch(function (err) {});
        } catch (err) {
            console.log(err);
            if (err.response.status === 500) {
            } else {
            }
        }
    };

    const setRow = (data) => {
        return (
            <tr>
                <td>{data.id}</td>
                <td>{data.username}</td>
                <td>{data.foundation}</td>
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
                    <Card.Title>รายชื่อ</Card.Title>
                    <div>
                        <Link to='/backend/create-admin'>
                            <Button variant='primary'>เพิ่มผู้จัดการ</Button>
                        </Link>
                    </div>
                    <Table striped hover style={{ marginTop: '1.5%' }}>
                        <thead>
                            <tr>
                                <th width='50'>ID</th>
                                <th width='400'>Username</th>
                                <th width='400'>มูลนิธิ</th>
                            </tr>
                        </thead>
                        <tbody>{rowData.map((v) => setRow(v))}</tbody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default AdminFoundation;
