import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import axiosClient from '../../../utils/axios';
import { signIn } from 'next-auth/react';
import { serialize, setCookie } from 'cookie';

const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { name: "email", type: "email" },
                password: { label: "Password", type: "password", name: "password" }
            },
            authorize: async (credentials, req) => {

                const user = await axiosClient.get('/csrf-cookie')
                    .then(() => {
                        axiosClient.post('/login',
                            {
                                user: {
                                    password: credentials.password,
                                    email: credentials.email
                                }
                            },
                            {
                                headers: {
                                    accept: '*/*',
                                    'Content-Type': 'application/json'
                                }
                            }).then((res) => {
                                console.log(res.data);
                                setCookie(null, 'token', 'your_token_value', {
                                    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
                                    maxAge: 3600, // Cookie expires in 1 hour (adjust as needed)
                                    path: '/', // Cookie is accessible from all paths
                                    sameSite: 'strict' // Prevent CSRF attacks by not sending the cookie in cross-site requests
                                });
                            });
                    })

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ]
}


export default NextAuth(authOptions);

