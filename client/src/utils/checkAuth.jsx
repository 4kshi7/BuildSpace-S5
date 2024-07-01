import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (location.pathname === "/") {
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/check-auth",
          { withCredentials: true }
        );
        setIsLoggedIn(response.data.isLoggedIn);
        if (!response.data.isLoggedIn) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return { isLoggedIn, isLoading };
};

export default useAuthCheck;
