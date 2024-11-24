import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signIn } from 'next-auth/react';


const LoginPage = () => {

    const [formData, setFormData] = useState({
        korisnickoIme: '',
        email: '',
        password: '',
        // Add more fields as needed
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        try {
            await signIn('credentials', formData); // Use the appropriate provider
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <div className="single-blog-wrapper">
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
                                </div>
                            </main>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LoginPage;