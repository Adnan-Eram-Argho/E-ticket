/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../Firebase/firebase.config';
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import axios from 'axios';

function Login() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signInWithEmailAndPassword, user1, loading, error] = useSignInWithEmailAndPassword(auth);

    const onSubmit = async (data) => {
        try {
            const firebaseUser = await signInWithEmailAndPassword(data.Email, data.password);
            if (firebaseUser?.user?.email) {
                const userData = {
                    email: data.Email,
                    password: data.password
                };

                const result = await axios.post("https://e-ticket-server-black.vercel.app/user/login", userData);
                if (result?.data?.token) {
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('_id', result.data._id);
                    console.log(result.data._id)
                    navigate('/');
                } else {
                    console.error("Error: Token not received from server");
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            {...register("Email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.Email && <span className="text-red-500 text-sm">{errors.Email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <span>Don't have an account? <Link to={"/register"}><span className='text-indigo-500'>Register</span></Link></span>
                    <div>
                        <input
                            type="submit"
                            value={loading ? "Logging in..." : "Login"}
                            disabled={loading}
                            className="w-full btn btn-outline flex justify-center py-2 px-4  "
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;
