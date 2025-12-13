import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
    const [fromData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError]= useState('');
    const navigate = useNavigate();
    const handelChange = (e) => {
        setFormData({
            ...fromData,
            [e.target.name]: e.target.value

        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/login", formData);
            localStorage.setItems("token", res.data.token);
            console.log(res.data);
            setUser(res.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "login failed");
        }
    };
    
    return (
    <div className ="min-screen flex items-center justify-center bg-gray-200">
        <div className ="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
            <h2 classname ="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            {error && <p className="text-red-500 mb-4 text-sm">{error}</p> }
            <form onSubmit={handleSubmit }>
                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Email
                    </label>
                    <input className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400" 
                    type="email"
                    name="email"
                    value={fromData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                    />
                </div>
                <div className= "mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Password
                    </label>
                    <input className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 outline-none focus:border-blue-400" 
                    type="Password"
                    name="password"
                    value={FormData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    />
                </div>
                <button className = "w-full bg-orange-400 text-white p-3 rounded-md hover:bg-amber-700 font-medium cursor-pointer">Login</button>
            </form>

        </div>

    </div>
    );
};

export default Login;