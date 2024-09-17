// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const BASE_URL = 'http://localhost:5000';

// function AddEditEmployee() {
//     const { id } = useParams(); // สำหรับหน้าแก้ไข emp
//     const navigate = useNavigate();

//     const [employee, setEmployee] = useState({
//         name: '',
//         age: '',
//         phone: ''
//     });

//     const [file, setFile] = useState(null); // state สำหรับเก็บรูปภาพ

//     useEffect(() => {
//         if (id) {
//             // หากมี id (สำหรับการแก้ไข) ดึงข้อมูล emp
//             const fetchEmployee = async () => {
//                 try {
//                     const response = await axios.get(`${BASE_URL}/api/emp/${id}`);
//                     const results = response.data[0];
//                     setEmployee(results);
//                 } catch (error) {
//                     console.error("Error fetching employee:", error);
//                 }
//             };

//             fetchEmployee();
//         }
//     }, [id]);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setEmployee(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]); // เก็บไฟล์รูปภาพที่เลือก
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const formData = new FormData();
//         formData.append('name', employee.name);
//         formData.append('age', employee.age);
//         formData.append('phone', employee.phone);
//         if (file) {
//             formData.append('image', file); // ใส่รูปภาพลงไปใน formData
//         }
//         try {
//             if (id) {
//                 // แก้ไข emp
//                 const response = await axios.put(`${BASE_URL}/api/emp/${id}`, formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//                 console.log(response.data);
//                 Swal.fire('Success', 'Employee updated successfully', 'success');
//             } else {
//                 // เพิ่ม emp ใหม่
//                 const response = await axios.post(`${BASE_URL}/api/emp`, formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//                 console.log(response.data);
//                 Swal.fire('Success', 'Employee added successfully', 'success');
//             }
//             navigate('/');
//         } catch (error) {
//             console.error(error);
//             Swal.fire('Error', error.response.data.message, 'error');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Employee' : 'Add Employee'}</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-control mb-4">
//                     <label className="label">
//                         <span className="label-text">Name</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         className="input input-bordered"
//                         value={employee.name} // ตรวจสอบให้แน่ใจว่าไม่เป็น undefined
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-control mb-4">
//                     <label className="label">
//                         <span className="label-text">Age</span>
//                     </label>
//                     <input
//                         type="number"
//                         name="age"
//                         placeholder="Age"
//                         className="input input-bordered"
//                         value={employee.age} // ตรวจสอบให้แน่ใจว่าไม่เป็น undefined
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-control mb-4">
//                     <label className="label">
//                         <span className="label-text">Phone</span>
//                     </label>
//                     <input
//                         type="phone"
//                         name="phone"
//                         placeholder="Phone"
//                         className="input input-bordered"
//                         value={employee.phone} // ตรวจสอบให้แน่ใจว่าไม่เป็น undefined
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-control w-full">
//                     <label className="label">
//                         <span className="label-text font-semibold">Employee Picture</span>
//                     </label>
//                     <input
//                         type="file"
//                         name="image"
//                         className="file-input file-input-bordered w-full"
//                         onChange={handleFileChange}
//                     />
//                 </div>
//                 <div className="form-control mt-6">
//                     <button type="submit" className="btn btn-primary">
//                         {id ? 'Update Employee' : 'Add Employee'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default AddEditEmployee;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:5000';

function AddEditEmployee() {
    const { id } = useParams(); // สำหรับหน้าแก้ไข emp
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        age: '',
        phone: ''
    });

    const [file, setFile] = useState(null); // state สำหรับเก็บรูปภาพ
    const [imagePreview, setImagePreview] = useState(null); // state สำหรับแสดง preview ของรูปภาพ
    const [uploadProgress, setUploadProgress] = useState(0); // state สำหรับแสดงความคืบหน้า

    useEffect(() => {
        if (id) {
            // หากมี id (สำหรับการแก้ไข) ดึงข้อมูล emp
            const fetchEmployee = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/api/emp/${id}`);
                    const results = response.data[0];
                    setEmployee(results);
                    if (results.image) {
                        setImagePreview(`${BASE_URL}/uploads/${results.image}`);
                    }
                } catch (error) {
                    console.error("Error fetching employee:", error);
                }
            };

            fetchEmployee();
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile); // เก็บไฟล์รูปภาพที่เลือก
        setImagePreview(URL.createObjectURL(selectedFile)); // แสดง preview ของรูปภาพ
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('age', employee.age);
        formData.append('phone', employee.phone);
        if (file) {
            formData.append('image', file); // ใส่รูปภาพลงไปใน formData
        }

        try {
            if (id) {
                // แก้ไข emp
                const response = await axios.put(`${BASE_URL}/api/emp/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted); // แสดงความคืบหน้า
                    }
                });
                console.log(response.data);
                Swal.fire('Success', 'Employee updated successfully', 'success');
            } else {
                // เพิ่ม emp ใหม่
                const response = await axios.post(`${BASE_URL}/api/emp`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted); // แสดงความคืบหน้า
                    }
                });
                console.log(response.data);
                Swal.fire('Success', 'Employee added successfully', 'success');
            }
            navigate('/');
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'An unknown error occurred';
            Swal.fire('Error', errorMessage, 'error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Employee' : 'Add Employee'}</h1>
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
                        value={employee.name} // ตรวจสอบให้แน่ใจว่าไม่เป็น undefined
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Age</span>
                    </label>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        className="input input-bordered"
                        value={employee.age} // ตรวจสอบให้แน่ใจว่าไม่เป็น undefined
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input
                        type="phone"
                        name="phone"
                        placeholder="Phone"
                        className="input input-bordered"
                        value={employee.phone} // ตรวจสอบให้แน่ใจว่าไม่เป็น undefined
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold">Employee Picture</span>
                    </label>
                    <input
                        type="file"
                        name="image"
                        className="file-input file-input-bordered w-full"
                        onChange={handleFileChange}
                    />
                    <p className="text-sm text-gray-600 mt-1">* ขนาดรูปไม่เกิน 5 MB.</p>
                </div>
                {/* แสดง preview ของรูปที่เลือก */}
                {imagePreview && (
                    <div className="mb-4">
                        <img src={imagePreview} alt="Employee" className="w-32 h-32 object-cover rounded" />
                    </div>
                )}
                {/* แสดง Progress Bar */}
                {uploadProgress > 0 && (
                    <div className="mb-4">
                        <progress className="progress progress-primary w-full" value={uploadProgress} max="100"></progress>
                        <p>{uploadProgress}% uploaded</p>
                    </div>
                )}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        {id ? 'Update Employee' : 'Add Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddEditEmployee;
