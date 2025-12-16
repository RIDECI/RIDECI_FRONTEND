// Login.tsx
import { LoginForm } from "../components/LoginForm";
import "./login.css";
import ImagenVisajosa from "../../../assets/imagenLogin (1).png";
import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import { Header } from "../components/header";

function Login() {
    const { handleLogin, error } = useLogin();
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

            <div className="flex-1 relative grid grid-cols-1 lg:grid-cols-2">
                <div
                    className="
            flex
            items-center
            justify-center
            lg:justify-start
            px-6
            sm:px-10
            lg:px-24
            z-10
          "
                >
                    <LoginForm handleLogin={handleLogin} />
                </div>

                <div className="hidden lg:block relative" />
                <img
                    src={ImagenVisajosa}
                    alt="Imagen decorativa login"
                    className="
              hidden lg:block
              absolute
              bottom-0
              right-0
              w-[360px]
              lg:w-[420px]
              xl:w-[520px]
              pointer-events-none
              select-none
            "
                />
            </div>
        </div>
    );
}

export default Login;