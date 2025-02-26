import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-lg">
      {/* Logo or Brand Name */}
      <Link to="/" className="text-xl font-bold">
        MyStore
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <Button variant="ghost" asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/dashboard">Admin Page</Link>
        </Button>
      </div>
    </nav>
  );
}

export default Header;
