import { Link, Outlet } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboard } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
    const [userData, setUserData] = useState("");

    axios.defaults.withCredentials = true;

    const fetchCookie = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api');
            const results = response.data.user;
            if (results) {
                setUserData(results);
            } else {
                console.log("ไม่พบ cookie");
            }
        } catch (error) {
            console.error('Error fetching cookie:', error);
        }
    };

    useEffect(() => {
        fetchCookie();
    }, []);

    return (
        <div className="drawer">
            {/* Input Toggle สำหรับควบคุมการเปิด/ปิด drawer */}
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            {/* เนื้อหาของหน้า */}
            {/* <div className="drawer-content flex flex-col">
                <Outlet />
            </div> */}

            {/* Sidebar */}
            <div className="drawer-side">
                {/* ปิด Sidebar */}
                <label htmlFor="my-drawer" className="drawer-overlay" aria-label="close sidebar"></label>

                {/* Sidebar Menu */}
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
                    {/* User panel */}
                    <div className="flex items-center p-4 bg-primary text-primary-content rounded-lg">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img src="https://via.placeholder.com/100" alt="User" />
                            </div>
                        </div>
                        <div className="ml-3">
                            <h4 className="font-bold">{userData.name}</h4>
                            <p className="text-sm">{userData.email}</p>
                        </div>
                    </div>

                    {/* Sidebar items */}
                    <li className="mt-4">
                        <Link to="/" className="flex items-center">
                            <MdOutlineDashboard className='h-6 w-6 mr-2' />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="flex items-center">
                            <MdAccountCircle className='h-6 w-6 mr-2' />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="flex items-center">
                            <IoIosSettings className='h-6 w-6 mr-2' />
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;

// import { Link } from 'react-router-dom';
// import { IoIosSettings } from "react-icons/io";
// import { MdAccountCircle, MdOutlineDashboard } from 'react-icons/md';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Sidebar = () => {
//     const [userData, setUserData] = useState("");

//     axios.defaults.withCredentials = true;

//     // ดึงค่า cookie ผ่าน API
//     const fetchCookie = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/user');
//             const results = response.data.user;
//             console.log('results:', results); // ตรวจสอบค่านี้ใน console
//             if (results) {
//                 setUserData(results); // หรืออาจจะตั้งชื่อผู้ใช้ที่คุณต้องการจาก token
//             } else {
//                 console.log("ไม่พบ cookie");
//             }
//         } catch (error) {
//             console.error('Error fetching cookie:', error);
//         }
//     };

//     useEffect(() => {
//         fetchCookie();
//     }, []);

//     return (
//         <div className='flex h-screen'>
//             <div className="drawer flex-none w-auto ">
//                 <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//                 <div className="drawer-side">
//                     <label htmlFor="my-drawer" className="drawer-overlay"></label>
//                     <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
//                         {/* User panel */}
//                         <div className="flex items-center p-4 bg-primary text-primary-content rounded-lg">
//                             <div className="avatar">
//                                 <div className="w-10 h-10 rounded-full">
//                                     <img src="https://via.placeholder.com/100" alt="User" />
//                                 </div>
//                             </div>
//                             <div className="ml-3">
//                                 <h4 className="font-bold">{userData.name}</h4>
//                                 <p className="text-sm">{userData.email}</p>
//                             </div>
//                         </div>

//                         {/* Sidebar items */}
//                         <li className="mt-4">
//                             <Link to="/" className="flex items-center">
//                                 <MdOutlineDashboard className='h-6 w-6 mr-2' />
//                                 <span>Dashboard</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/profile" className="flex items-center">
//                                 <MdAccountCircle className='h-6 w-6 mr-2' />
//                                 <span>Profile</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/settings" className="flex items-center">
//                                 <IoIosSettings className='h-6 w-6 mr-2' />
//                                 <span>Settings</span>
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Sidebar;
