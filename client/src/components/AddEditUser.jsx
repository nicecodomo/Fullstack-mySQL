import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:5000';

function AddEditUser() {
    const { id } = useParams(); // สำหรับหน้าแก้ไขผู้ใช้
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        if (id) {
            // หากมี id (สำหรับการแก้ไข) ดึงข้อมูลผู้ใช้
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/api/user/${id}`);
                    const results = response.data[0];
                    setUser(results);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };

            fetchUser();
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (id) {
                // แก้ไขผู้ใช้
                await axios.put(`${BASE_URL}/api/users/${id}`, user);
                Swal.fire('Success', 'User updated successfully', 'success');
            } else {
                // เพิ่มผู้ใช้ใหม่
                await axios.post(`${BASE_URL}/api/users`, user);
                Swal.fire('Success', 'User added successfully', 'success');
            }
            navigate('/');
        } catch (error) {
            Swal.fire('Error', 'There was an error', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit User' : 'Add User'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered"
                        value={user.name} // ตรวจสอบให้แน่ใจว่าไม่เป็น undefined
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered"
                        value={user.email} // ตรวจสอบให้แน่ใจว่าไม่เป็น undefined
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        {id ? 'Update User' : 'Add User'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddEditUser;
