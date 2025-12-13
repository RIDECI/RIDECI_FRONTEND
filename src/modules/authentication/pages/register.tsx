// Register.tsx
import { useEffect, useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import "./register.css";
import { useRegister } from "../hooks/useRegister";
import { ErrorCard } from "../components/ErrorCard";

import RideciLogo from "../../../assets/RIDECI Logo (Blanco).png";
import ImagenRegistro from "../../../assets/imagenRegister.png";

function Register() {
  const { handleRegister, error } = useRegister();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  return (
    <div className="register-page">
      {error && showError && (
        <div className="error-overlay">
          <ErrorCard
            message={error}
            onRetry={() => setShowError(false)}
          />
        </div>
      )}

      <div className="register-container">
        <RegisterForm handleRegister={handleRegister} />
      </div>

      <div className="register-images">
        <img src={RideciLogo} alt="RIDECI" className="register-logo" />
        <img
          src={ImagenRegistro}
          alt="Imagen Registro"
          width={700}
          height={1500}
          className="register-image-large"
        />
      </div>
    </div>
  );
}

export default Register;
