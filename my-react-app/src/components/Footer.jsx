import React from "react";

export default function Footer() {
    return (
        <>
            <div className="relative">
                <footer className="footer footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
                    <aside>
                        <p>
                            Copyright © {new Date().getFullYear()} - All right reserved by nicecodemo
                        </p>
                    </aside>
                </footer>
            </div>
        </>
    );
}
