import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-lg">
      <Link to="/" className="text-xl font-bold">
        ecom
      </Link>

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
