import React, { useEffect, useState } from "react"
import { Navigate, useNavigate } from 'react-router-dom';
import isTokenExpired from "../utility/isTokenExpired";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isExpired, setIsExpired] = useState(null)

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            if (isTokenExpired(token)) {
                // console.log("Token is expired. Please login again.");
                setIsExpired(true);
                localStorage.removeItem("accessToken");
                navigate("/login");
            } else {
                // console.log("Token is still valid.");
                setIsExpired(false);
            }
        } else {
            setIsExpired(true);
            navigate("/login");
        }
    }, [token, navigate]);

    if (isExpired === null) {
        return null;
    }

    return isExpired ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;