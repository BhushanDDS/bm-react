import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../Layouts/Header";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuth(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      const adminUser = response.data.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password 
      );
      
      if (!adminUser) {
          alert("Invalid Credentials. Try again!");
    } else {
          dispatch({ type: "LOGIN" }); 
          alert("Login Successful!");
          navigate("/dashboard");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (


    <>
    
    <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl w-96">
        <h4 className="text-xl font-semibold mb-4 text-center">Admin Login</h4>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email: john@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password: m38rmF$"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
  
};

export default AdminLogin;
