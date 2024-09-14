import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

function Index() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users`); // ตัวอย่าง API สำหรับดึงข้อมูลผู้ใช้
                // ตรวจสอบว่าข้อมูลที่ได้รับเป็น array
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error("Data is not an array:", response.data);
                    // อาจจะตั้งค่าให้เป็น array เปล่าเพื่อป้องกันข้อผิดพลาด
                    setUsers([]);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${BASE_URL}/api/users/${id}`);
                    setUsers(users.filter(user => user.id !== id));
                } catch (error) {
                    Swal.fire('Error!', 'There was an error deleting the user.', 'error');
                }
            }
        });
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="mb-4">
                <Link to="/add-edit-user" className="btn btn-primary">Add User</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{ index + 1 }</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link
                                            to={`/add-edit-user/${user.id}`}
                                            className="btn btn-info btn-sm mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Index;
