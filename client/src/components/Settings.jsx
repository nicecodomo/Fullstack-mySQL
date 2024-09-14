import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:5000';

function Settings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire('Error!', 'New passwords do not match.', 'error');
            return;
        }

        try {
            const response = await axios.put(`${BASE_URL}/settings`, {
                currentPassword,
                newPassword,
            }, {
                withCredentials: true
            });

            // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Password updated successfully.',
                    confirmButtonText: 'OK'
                });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                // แสดงข้อผิดพลาดที่ไม่คาดคิด
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Unexpected response from the server.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error updating settings:', error);

            const errorMessage = error.response?.data?.message || 'There was an error updating your settings.';
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default Settings;
