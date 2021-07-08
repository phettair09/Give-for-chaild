import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PageTest = () => {
    const Submit = (e) => {
        e.preventDefault();
        
        let form = new FormData();
        form.append('file', e.target.file.files[0]);
        form.append('name', e.target.name.value);
        axios
            .post('/member/uploadtest/asdasd', form)
            .then((res) => {
                if (res.data) {
                    alert(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='App'>
            <form onSubmit={Submit}>
                <input type='text' name='name' />

                <input type='file' name='file' />
                <input type='submit' />
            </form>
        </div>
    );
};

export default PageTest;
