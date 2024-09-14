import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const BASE_URL = 'http://localhost:5000'

export default function Login() {
    const navigate = useNavigate()
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
            const response = await axios.post(`${BASE_URL}/auth/login`, login, {
                withCredentials: true
            })

            if (response.data.isAuthenticated) {
                Swal.fire({
                    title: 'Login Successful',
                    text: `Welcome back, ${response.data.name}!`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/')
                })
            } else {
                Swal.fire({
                    title: 'Login Failed',
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.log('Error logging in:', error);
            Swal.fire({
                title: 'Error',
                text: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
                icon: 'error',
                confirmButtonText: 'OK'
            });
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
                    </div>
                </div>
            </div>
        </div>
    )
}
