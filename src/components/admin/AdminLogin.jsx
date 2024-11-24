import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import axiosClient from '../../utils/axios';
import { signIn } from 'next-auth/react';
import { serialize, setCookie } from 'cookie';
import { useStateContext } from "../../contexts/StateContext";
import { useRouter } from 'next/router';


const AdminLogin = () => {

    const [formData, setFormData] = useState({
        korisnickoIme: '',
        email: '',
        password: '',
        // Add more fields as needed
    });
    const router = useRouter();

    const { currentUser, setCurrentUser } =
        useStateContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        axiosClient.get('/csrf-cookie')
            .then(() => {
                axiosClient.post(`/adminlogin`, formData)
                    .then((res) => {
                        localStorage.setItem('admintoken', res.data.token);
                        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                        console.log(res.data.token);
                        setCurrentUser(res.data.user);
                        //navigate('/');
                        router.push('/admin/tekstovi');
                    })
                    .catch(error => console.error(error));
            });

        // to do: send it to API
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <>
            <Form>
                <Form.Group className='form-group mb-3'>
                    <Form.Control name='korisnickoIme' type='text' placeholder='Korisnicko ime' value={formData.korisnickoIme} onChange={handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className='form-group mb-3'>
                    <Form.Control name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control name='password' type='password' placeholder='Password' value={formData.password} onChange={handleChange}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default AdminLogin;