/* eslint-disable no-unused-vars */

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../Firebase/firebase.config';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { useEffect } from 'react';

function Register() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [
        createUserWithEmailAndPassword,
        user1,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = async (data) => {
        try {
            const firebaseUser = await createUserWithEmailAndPassword(data.email, data.password);
            if (firebaseUser?.user?.email) {
                const userData = {
                    name: data.name,
                    email: data.email,
                    password: data.password
                };

                const result = await axios.post("https://e-ticket-server-black.vercel.app/user/signup", userData);
                if (result?.data?.token) {
                    localStorage.setItem('token', result.data.token);
                    navigate('/');
                } else {
                    console.error("Error: Token not received from server");
                }
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            {...register("name", { required: "Name is required" })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
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
                    <span>Already have an account? <Link to={"/login"}><span className='text-indigo-500'>Login</span></Link></span>
                    <div>
                        <input
                            type="submit"
                            value={loading ? "Registering..." : "Register"}
                            disabled={loading}
                            className="w-full btn btn-outline flex justify-center py-2 px-4"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>}
                </form>
            </div>
        </div>
    );
}

export default Register;
