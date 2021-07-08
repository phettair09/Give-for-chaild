import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card, Modal } from 'react-bootstrap';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';



const Member = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        updateRows();
    }, []);

    const updateRows = async () => {
        try {
            await axios
                .get(`/members`)
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

    const onErrorImg = (e) => {
        e.target.src = '/resources/icon-show-user.png';
    };

    const setRow = (data) => {
        return (
            <tr>
                <td>{data.id}</td>
                <td>
                    <img src={data.img} onError={onErrorImg} style={{ width: '80px' }} />
                </td>
                <td>{data.name}</td>
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
                    <Card.Title>ผู้ใช้งาน Line Official</Card.Title>

                    <Table striped hover style={{ marginTop: '1.5%' }}>
                        <thead>
                            <tr>
                                <th width='50'>ID</th>
                                <th width='100'>รูป</th>
                                <th width='400'>ชื่อ</th>
                            </tr>
                        </thead>
                        <tbody>{rowData.map((v) => setRow(v))}</tbody>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default Member;
