

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, FormControl, Button, Card, Modal } from 'react-bootstrap';
import './css/ActivityBack.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import CreateAdmin from './CreateAdmin';
const HOST_URL_IMG = "https://give-for-child.thesis-su2020ict.com/resources/uploads/";

const LimitString = (msg, count) => {
    return msg.substring(0, count) + (msg.length > count ? '...' : '')
}

const GenerateJson = () => {
    const [rowData, setRowData] = useState([]);
    const [dataJson, setDataJson] = useState('');


    useEffect(() => {
        getFoundation();
    }, []);
    let obj = {};
    const getFoundation = async () => {
        try {
            await axios
                .get(`/foundation`)
                .then(function (res) {
                    if (res.data) {
                        setRowData(res.data);
                        const foundationObj = res.data.map(f => {

                            return {
                                    actions: [
                                      {
                                        label: "รายละเอียด",
                                        uri: f.url,
                                        type: "uri"
                                      }
                                    ],
                                    title: LimitString(f.name,30),
                                    defaultAction: {
                                        label: "รายละเอียด",
                                        uri: f.url,
                                      type: "uri"
                                    },
                                    imageBackgroundColor: "#FFFFFF",
                                    text: LimitString(f.address,40),
                                    thumbnailImageUrl: HOST_URL_IMG + f.img
                                  
                            }

                            // return{
                            //     defaultAction: {
                            //         label: "รายละเอียด",
                            //         uri: f.url,
                            //         type: "uri"
                            //     },
                            //     text: LimitString(f.address,40),
                            //     title: LimitString(f.name,20),
                            //     actions: [
                            //       {
                            //         type: "uri",
                            //         uri: f.url,
                            //         label: "รายละเอียด"
                            //       }
                            //     ],
                            //     thumbnailImageUrl: HOST_URL_IMG + f.img,
                            //     imageBackgroundColor: "#FFFFFF"
                            //   }
                        });
                        obj = {
                            line: {
                                altText: "this is a carousel template",
                                type: "template",
                                template: {
                                    columns: foundationObj,
                                imageAspectRatio: "rectangle",
                                    type: "carousel",
                                    imageSize: "cover"
                                }
                            }
                        }
                        const j = JSON.stringify(obj, undefined, 4)
                        setDataJson(j);
                        console.log(j);
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
                    <Card.Title>JSON</Card.Title>
                    <textarea id="form_json" cols="30" style={{height:500}} value={dataJson} rows="10"></textarea>
                </Card>
            </div>
        </div>
    );
};

export default GenerateJson;
