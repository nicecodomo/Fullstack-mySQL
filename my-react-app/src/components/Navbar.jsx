import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="navbar bg-primary text-primary-content justify-between">
                <div className="flex items-center text-xl">
                    <div className="flex">
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex">
                        <Link to="/" className="btn btn-ghost text-xl">
                            daisyUI
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-x-5">
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                ></path>
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Profile</a></li>
                            <li><a>Settings</a></li>
                            <li><Link to={"/login"}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
