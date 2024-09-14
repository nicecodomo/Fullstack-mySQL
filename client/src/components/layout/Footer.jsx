
const Footer = () => {
    return (
        <>
            <div>
                <footer className="footer footer-center bg-base-300 text-base-content p-4 mt-auto">
                    <aside>
                        <p>
                            Copyright © {new Date().getFullYear()} - All right reserved
                        </p>
                    </aside>
                </footer>
            </div>
        </>
    );
}

export default Footer;
