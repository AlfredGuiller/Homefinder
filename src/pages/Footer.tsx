import Image from 'next/image';
import logo from '/public/home.png';

export default function Footer() {
return (
    <footer className="footer">
    <div className="logo">
        <Image src={logo} alt="Logo" width={150} height={50} />
    </div>
    <div className="links">
        <a href="#">Terms of Use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact Us</a>
    </div>
    </footer>
);
}
