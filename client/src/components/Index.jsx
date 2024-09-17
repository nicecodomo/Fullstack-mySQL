import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

function Index() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/emp`); // ตัวอย่าง API สำหรับดึงข้อมูล emp
                // ตรวจสอบว่าข้อมูลที่ได้รับเป็น array
                if (Array.isArray(response.data)) {
                    setEmployees(response.data);
                } else {
                    console.error("Data is not an array:", response.data);
                    // อาจจะตั้งค่าให้เป็น array เปล่าเพื่อป้องกันข้อผิดพลาด
                    setEmployees([]);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
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
                    await axios.delete(`${BASE_URL}/api/emp/${id}`);
                    setEmployees(employees.filter(emp => emp.emp_id !== id));
                } catch (error) {
                    Swal.fire('Error!', 'There was an error deleting the employee.', 'error');
                }
            }
        });
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
            <div className="mb-4">
                <Link to="/add-edit-emp" className="btn btn-primary">Add Employee</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((emp, index) => (
                                <tr key={emp.emp_id}>
                                    <td>{ index + 1 }</td>
                                    <td>
                                        {/* แสดงรูปภาพ */}
                                        {emp.image ? (
                                            <img
                                                src={`${BASE_URL}/uploads/${emp.image}`}
                                                alt={emp.name}
                                                className="w-16 h-16 object-cover rounded-full"
                                            />
                                        ) : (
                                            <img src={`https://ui-avatars.com/api/?rounded=true&name=${emp.name}`}></img>
                                        )}
                                    </td>
                                    <td>{emp.name}</td>
                                    <td>{emp.age}</td>
                                    <td>{emp.phone}</td>
                                    <td>
                                        <Link
                                            to={`/add-edit-emp/${emp.emp_id}`}
                                            className="btn btn-info btn-sm mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleDelete(emp.emp_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No employees found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Index;
