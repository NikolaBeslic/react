import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../utils/axios';

const RegistrationForm = () => {

    const [formData, setFormData] = useState({
        korisnickoIme: '',
        email: '',
        password: '',
        // Add more fields as needed
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        axiosClient.get('/csrf-cookie')
            .then(response => {

                axiosClient.post(`/register`, formData)
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch(error => console.error(error));
            });
    }

    // to do: send it to API


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='form-group mb-3'>
                <Form.Control name='korisnickoIme' type='text' placeholder='Korisnicko ime' value={formData.korisnickoIme} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className='form-group mb-3'>
                <Form.Control name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control name='password' type='password' placeholder='Password' value={formData.password} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control name='password_confirmation' type='password' placeholder='Confirm password'></Form.Control>
            </Form.Group>
            <Button variant="secondary">
                Close
            </Button>
            <Button type="submit" variant="primary">
                Save Changes
            </Button>
        </Form>
    );
};

export default RegistrationForm;