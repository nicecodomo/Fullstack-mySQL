import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:5000';

function Profile() {
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api`);
                setUserData(response.data.user);
                setFormData({
                    name: response.data.user.name,
                    email: response.data.user.email
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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            name: userData.name,
            email: userData.email
        });
    };

    const handleSave = async () => {
        try {
            await axios.put(`${BASE_URL}/api/user`, formData, {
                withCredentials: true
            });
            setUserData(formData);
            setIsEditing(false);
            Swal.fire('Saved!', 'Your profile has been updated.', 'success');
        } catch (error) {
            console.error('Error saving user profile:', error);
            Swal.fire('Error!', 'There was an error saving your profile.', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="text-xl">{userData.name}</p>
                        )}
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <p className="text-xl">{userData.email}</p>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        {isEditing ? (
                            <div className="flex space-x-2">
                                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
