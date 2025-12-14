// Register.tsx
import { useEffect, useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import "./register.css";
import { useRegister } from "../hooks/useRegister";
import { ErrorCard } from "../components/ErrorCard";
import { Header } from "../components/header";

function Register() {
  const { handleRegister, error } = useRegister();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  return (
    <div className="h-screen overflow-hidden flex flex-col relative">
      {error && showError && (
        <div className="error-overlay">
          <ErrorCard
            message={error}
            onRetry={() => setShowError(false)}
          />
        </div>
      )}

      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <RegisterForm handleRegister={handleRegister} />
      </div>
    </div>
  );
}

export default Register;