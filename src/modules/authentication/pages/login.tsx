// Login.tsx
import { LoginForm } from "../components/LoginForm";
import "./login.css";
import RideciLogo from "../../../assets/RIDECI Logo (Blanco).png";
import ImagenVisajosa from "../../../assets/imagenLogin (1).png";
import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";

function Login() {
  const { handleLogin, error } = useLogin();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  return (
    <div className="login-page">
      {error && showError && (
        <div className="error-overlay">
          <ErrorCard
            message={error}
            onRetry={() => setShowError(false)}
          />
        </div>
      )}

      <div className="login-container">
        <LoginForm handleLogin={handleLogin} />
      </div>

      <div className="images-column">
        <img src={RideciLogo} alt="RIDECI" className="image-logo" />
        <img
          src={ImagenVisajosa}
          alt="Imagen Visajosa"
          width={600}
          height={600}
          className="image-large"
        />
      </div>
    </div>
  );
}

export default Login;
