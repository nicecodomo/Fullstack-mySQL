import axios from 'axios'
import React, { useState } from 'react'

const BASE_URL = 'http://localhost:5000'

export default function Login() {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    function handleChange(event) {
        const { name, value } = event.target
        setLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function loginUser(event) {
        event.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อ submit ฟอร์ม
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                email: login.email,
                password: login.password
            }, {
                withCredentials: true
            })
            console.log(response.data);
            window.location = '/'
        } catch (error) {
            console.log(error);
        }
    }

    const getUsers = async () => {
        try {
            // const authToken = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/users`, {
                withCredentials: true
            })
            console.log('user data', response.data);
        } catch (error) {
            console.log('error', error);
        }
    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen"
                style={{
                    backgroundImage: "url(https://picsum.photos/1280/720)",
                }}>
                <div className='hero-overlay bg-opacity-60'></div>
                <div className="hero-content flex-col w-full">
                    <div className="text-center text-neutral-content">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={loginUser} method='post'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    value={login.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    value={login.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div className="mx-auto pb-4">
                            <button onClick={getUsers} className="btn btn-primary">get users</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
