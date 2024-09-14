// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import Loading from "../Loading";

// const Layout = () => {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true); // เพิ่มสถานะ loading เพื่อรอการตรวจสอบสิทธิ์

//     const checkAuth = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/auth/validate-token', {
//                 withCredentials: true,
//             });

//             if (response.data.isAuthenticated) {
//                 setIsAuthenticated(true);
//             } else {
//                 Swal.fire({
//                     title: 'Authentication Failed',
//                     text: 'Please login to continue.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 }).then(() => {
//                     navigate('/login');
//                 });
//             }
//         } catch (error) {
//             setIsAuthenticated(false);
//             Swal.fire({
//                 title: 'Error',
//                 text: 'An error occurred while validating your session.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             }).then(() => {
//                 navigate('/login')
//             });
//         } finally {
//             setLoading(false); // เมื่อเสร็จสิ้นการตรวจสอบให้หยุดโหลด
//         }
//     };

//     useEffect(() => {
//         checkAuth();
//     }, [navigate]);

//     if (loading) {
//         return <Loading />
//     }

//     return (
//         <div className="flex flex-col h-screen">
//             <Navbar />
//             <div className="flex flex-1 overflow-hidden">
//                 <Sidebar />
//                 <div className="flex-1 overflow-auto p-4">
//                     <Outlet />
//                 </div>
//             </div>
//             <Footer /> {/* ให้ footer อยู่ล่างสุดของหน้าจอ */}
//         </div>
//     )
// }

// export default Layout;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Loading from "../Loading";

const Layout = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/validate-token', {
                withCredentials: true,
            });

            if (response.data.isAuthenticated) {
                setIsAuthenticated(true);
            } else {
                Swal.fire({
                    title: 'Authentication Failed',
                    text: 'Please login to continue.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/login');
                });
            }
        } catch (error) {
            setIsAuthenticated(false);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while validating your session.',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/login')
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [navigate]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <div className='drawer'>
                    <div className="drawer-content p-4">
                        {/* Main Content */}
                        <Outlet />
                        {/* Sidebar */}
                        <Sidebar />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
