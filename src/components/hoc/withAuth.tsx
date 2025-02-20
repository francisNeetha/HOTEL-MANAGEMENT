import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const storedCustomer = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (!storedCustomer || !storedToken) {
        navigate("/login"); 
      } else {
        setIsAuthenticated(true);
      }
    }, [navigate]);

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"})`;

  return AuthComponent;
};

export default withAuth;
