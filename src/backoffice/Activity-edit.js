import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { Table, Form, InputGroup, FormControl, Button, Card, Pagination, Row, Col } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import { BsArrowLeftShort } from 'react-icons/bs';

// let name = '';
// let tel = '';
// let start_time = '';
// let end_time = '';
// let person_max = 0;
// let location = '';
// let description = '';

const ActivityBack = (props) => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [personMax, setPersonMax] = useState(0);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [file_img, setFile_img] = useState(null);
    // const [dataEdit, setDataEdit] = useState(null);
    // /activity/:id
    // useEffect(() => {
    //   console.log(file_img.files.file[0]);
    // }, [file_img]);
    let pathCurrentImage = '';
    useEffect(() => {
        let searchParams = new URLSearchParams(window.location.search);
        // console.log(searchParams.get('id'));
        axios
            .get(`/activity/${props.match.params.id}`)
            .then((res) => {
                if (res.data) {
                    setName(res.data.name);
                    setTel(res.data.tel);

                    setStartTime(res.data.start_time.replace('.000Z', ''));
                    setEndTime(res.data.end_time.replace('.000Z', ''));
                    setPersonMax(res.data.person_max);
                    setLocation(res.data.location);
                    setDescription(res.data.description);
                    // pathCurrentImage = data.image;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onImgChange = (e) => {
        setFile_img(e.target.files[0]);
    };
    // const onDataChange = (data) => {
    //   setDataEdit(data);
    // };
    const onSubmit = async () => {
        // localStorage.getItem('');
        if (!name || !tel || !startTime || !endTime || !personMax || !location || !description) {
            Swal.fire('', '???????????????????????????????????????????????????????????????', 'error');
            return;
        }
        const data = {
            name: name,
            tel: tel,
            start_time: startTime,
            end_time: endTime,
            person_max: personMax,
            location: location,
            description: description,
            admin_id: localStorage.getItem('admin_id'),
        };

        var formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file_img) {
            formData.append('file', file_img);
        }

        await axios
            .put(`/activity/${props.match.params.id}`, formData)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire('', '??????????????????', 'success');
                    history.push('/backend/activity-back');
                } else {
                    Swal.fire('', '?????????????????????', 'error');
                }
            })
            .catch((err) => {
                Swal.fire('', '?????????????????????????????????????????????????????????????????????', 'error');
            });
    };

    return (
        <div
            style={{
                width: 'calc(100%-300px;)',
                height: '100vh',
                overflow: 'scroll',
            }}
        >
            <div className='all-font' style={{ padding: '3rem' }}>
                <Link to='/backend/activity-back'>
                    <Row style={{ paddingLeft: '16px' }}>
                        <BsArrowLeftShort size={28} color={'#000000'} />
                        <div className='text-back'>???????????????????????? </div>
                    </Row>
                </Link>
                <Card style={{ padding: '1.5rem' }}>
                    <Card.Title style={{ marginTop: '2%' }}>?????????????????????????????????</Card.Title>
                    <Form>
                        {name === null ? (
                            <div></div>
                        ) : (
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId='inputImage1'>
                                        <Form.Label>?????????????????????????????????</Form.Label>
                                        <Form.Control type='file' onChange={onImgChange} />
                                        {/* <input id='file-img' type='file' name='filepond'  required />
                  <div id='inputImage'></div> */}
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId='exampleForm.ControlInput1'>
                                                <Form.Label>?????????????????????????????????</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                    placeholder='?????????????????????????????????????????????'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId='exampleForm.ControlInput2'>
                                                <Form.Label>???????????????????????????????????????</Form.Label>
                                                <Form.Control
                                                    type='none'
                                                    value={tel}
                                                    onChange={(e) => {
                                                        setTel(e.target.value);
                                                    }}
                                                    placeholder='???????????????????????????????????????????????????'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group controlId='exampleForm.ControlInput1'>
                                                <Form.Label>??????????????????????????????????????????????????????????????????</Form.Label>
                                                <Form.Control
                                                    type='datetime-local'
                                                    value={startTime}
                                                    onChange={(e) => {
                                                        setStartTime(e.target.value);
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId='exampleForm.ControlInput1'>
                                                <Form.Label>??????????????????????????????????????????????????????????????????</Form.Label>
                                                <Form.Control
                                                    type='datetime-local'
                                                    value={endTime}
                                                    onChange={(e) => {
                                                        setEndTime(e.target.value);
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId='exampleForm.ControlInput1'>
                                                <Form.Label>?????????????????????</Form.Label>
                                                <Form.Control
                                                    type='number'
                                                    value={personMax}
                                                    onChange={(e) => {
                                                        setPersonMax(e.target.value);
                                                    }}
                                                    placeholder='?????????????????????????????????'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group controlId='exampleForm.ControlInput4'>
                                                <Form.Label>?????????????????????</Form.Label>
                                                <Form.Control
                                                    type='none'
                                                    value={location}
                                                    onChange={(e) => {
                                                        setLocation(e.target.value);
                                                    }}
                                                    placeholder='?????????????????????????????????'
                                                />
                                            </Form.Group>
                                            <Form.Group controlId='exampleForm.ControlInput4'>
                                                <Form.Label>???????????????????????????????????????????????????</Form.Label>
                                                <Form.Control
                                                    type='none'
                                                    value={description}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }}
                                                    placeholder='???????????????????????????????????????????????????????????????'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Button onClick={onSubmit} variant='info' style={{ width: '200px' }}>
                                                ??????????????????????????????????????????
                                            </Button>
                                        </Col>
                                        <Col></Col>
                                        <Col></Col>
                                    </Row>
                                </Col>
                            </Form.Row>
                        )}
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ActivityBack;
