import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:5000';

function Profile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        image: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: null
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api`);
                setUserData(response.data.user);
                setFormData({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    image: response.data.user.image
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            image: event.target.files[0]
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            name: userData.name,
            email: userData.email,
            image: userData.image
        });
    };

    const handleSave = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        if (formData.image && typeof formData.image !== 'string') {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await axios.put(`${BASE_URL}/api/user`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            setUserData({
                ...formData,
                image: formData.image && typeof formData.image !== 'string'
                    ? URL.createObjectURL(formData.image)
                    : userData.image // ใช้ภาพเดิมถ้าไม่มีการอัปโหลดใหม่
            });
            setIsEditing(false);
            Swal.fire('Saved!', response.data.message, 'success');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Swal.fire('Error!', 'Email already exists!', 'error');
            } else {
                console.error('Error saving user profile:', error);
                const errorMessage = error.response?.data?.message || 'An unknown error occurred';
                Swal.fire('Error', errorMessage, 'error');
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
            <div className="card w-full lg:w-1/2 mx-auto bg-base-100 shadow-2xl">
                <div className="card-body">
                    <div className="avatar mb-6 flex justify-center">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={userData.image ||
                                `https://ui-avatars.com/api/?name=${userData.name}&size=150`}
                                alt="Profile"
                            />
                        </div>
                    </div>
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-lg">Name</span>
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered w-full"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="text-xl font-semibold">{userData.name}</p>
                        )}
                    </div>
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="text-xl font-semibold">{userData.email}</p>
                        )}
                    </div>
                    {isEditing && (
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text text-lg">Profile Image</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <p className="text-sm text-gray-600 mt-1">* ขนาดรูปไม่เกิน 5 MB.</p>
                        </div>
                    )}
                    <div className="form-control mt-6">
                        {isEditing ? (
                            <div className="flex space-x-2 justify-center">
                                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <button className="btn btn-outline btn-primary" onClick={handleEdit}>Edit Profile</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const BASE_URL = 'http://localhost:5000';

// function Profile() {
//     const [userData, setUserData] = useState({
//         name: '',
//         email: '',
//         image: '' // เพิ่มฟิลด์สำหรับรูปภาพ
//     });
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         image: null // เก็บไฟล์รูปภาพที่อัปโหลด
//     });

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/api`);
//                 setUserData(response.data.user);
//                 setFormData({
//                     name: response.data.user.name,
//                     email: response.data.user.email,
//                     image: response.data.user.image
//                 });
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleFileChange = (event) => {
//         setFormData(prevState => ({
//             ...prevState,
//             image: event.target.files[0] // จัดการไฟล์ที่อัปโหลด
//         }));
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleCancel = () => {
//         setIsEditing(false);
//         setFormData({
//             name: userData.name,
//             email: userData.email,
//             image: userData.image
//         });
//     };

//     const handleSave = async () => {
//         const formDataToSend = new FormData();
//         formDataToSend.append('name', formData.name);
//         formDataToSend.append('email', formData.email);
//         if (formData.image) {
//             formDataToSend.append('image', formData.image); // ส่งไฟล์รูปภาพไปยัง backend
//         }

//         try {
//             const response = await axios.put(`${BASE_URL}/api/user`, formDataToSend, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             });
//             setUserData({
//                 ...formData,
//                 image: formData.image ? URL.createObjectURL(formData.image) : userData.image
//             });
//             setIsEditing(false);
//             Swal.fire('Saved!', response.data.message, 'success');
//         } catch (error) {
//             console.error('Error saving user profile:', error);
//             Swal.fire('Error!', 'An error occurred while saving your profile.', 'error');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Profile</h1>
//             <div className="card bg-base-100 shadow-xl">
//                 <div className="card-body">
//                     <div className="avatar mb-4">
//                         <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                             <img src={userData.image ||
//                                 `https://ui-avatars.com/api/?name=${userData.name}&size=150`}
//                                 alt="Profile"
//                             />
//                         </div>
//                     </div>
//                     <div className="form-control mb-4">
//                         <label className="label">
//                             <span className="label-text">Name</span>
//                         </label>
//                         {isEditing ? (
//                             <input
//                                 type="text"
//                                 name="name"
//                                 className="input input-bordered"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         ) : (
//                             <p className="text-xl">{userData.name}</p>
//                         )}
//                     </div>
//                     <div className="form-control mb-4">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         {isEditing ? (
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="input input-bordered"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         ) : (
//                             <p className="text-xl">{userData.email}</p>
//                         )}
//                     </div>
//                     {isEditing && (
//                         <div className="form-control mb-4">
//                             <label className="label">
//                                 <span className="label-text">Profile Image</span>
//                             </label>
//                             <input
//                                 type="file"
//                                 name="image"
//                                 className="file-input file-input-bordered"
//                                 accept="image/*"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                     )}
//                     <div className="form-control mt-6">
//                         {isEditing ? (
//                             <div className="flex space-x-2">
//                                 <button className="btn btn-primary" onClick={handleSave}>Save</button>
//                                 <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
//                             </div>
//                         ) : (
//                             <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Profile;