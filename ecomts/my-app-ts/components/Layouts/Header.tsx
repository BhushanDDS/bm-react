import React from 'react'
import {Link ,NavLink} from 'react-router-dom'
function Header() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          Home
        </Link>
  

        <div className="flex space-x-6">
          
          <Link to="/dashboard" className="text-white text-lg font-medium hover:text-gray-200 transition-all">
            Admin Page
          </Link>
          <Link to="/about" className="text-white text-lg font-medium hover:text-gray-200 transition-all">
            About Us
          </Link>
          <Link to="/cart" className="text-white text-lg font-medium hover:text-gray-200 transition-all">
            Cart 
          </Link>
        </div>
  
      </div>
    </nav>
  );
  
  
}

export default Header