
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Redirect to the Dashboard page
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return <Navigate to="/" replace />;
};

export default Index;
