// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='bg-dark text-light p-3'>
//         <h4 className='text-center'>ALL Right Reserved &copy; LPU FASHIONISTA</h4>
//     </div>
//   )
// }

// export default Footer
import React from "react";
import { Link } from "react-router-dom";
import "../../css/styles/Footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">All Right Reserved &copy; LPU</h1>
      <p className="text-center mt-3 links">
        <Link to="/about">About</Link>|
        <Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;