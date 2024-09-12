import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";
import { MdAccountCircle, MdOutlineDashboard } from 'react-icons/md';

export default function Sidebar() {
    return (
        <div className="drawer flex-none w-auto ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
                    {/* User panel */}
                    <div className="flex items-center p-4 bg-primary text-primary-content rounded-lg">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img src="https://via.placeholder.com/100" alt="User" />
                            </div>
                        </div>
                        <div className="ml-3">
                            <h4 className="font-bold">Admin Name</h4>
                            <p className="text-sm">admin@example.com</p>
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
                            <IoIosSettings className='h-6 w-6 mr-2'/>
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
