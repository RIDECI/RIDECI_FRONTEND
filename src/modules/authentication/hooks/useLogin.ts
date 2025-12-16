import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  institutionalId: number;
}

export const useLogin = () => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginRequest) => {
    setError(null);
    if (!data.email || !data.password) {
      setError("Debes ingresar un email y una contraseña.");
      console.log("Email o contraseña vacíos");
      return;
    }

    try {
      const response = await fetch("https://kratosauthenticationbackend-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      console.log("Request body:", JSON.stringify(data));
      console.log("Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "Credenciales incorrectas.");
        console.log("Error al iniciar sesión:", errorData || "Unknown error");
        console.log("Error al iniciar sesión:");
        return;
      }

      const result: AuthResponse = await response.json();
      setAuthData(result);

      console.log("Login exitoso:", result);
      console.log(result);

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("userId", result.institutionalId.toString());

      const maybeRole = (result as any)?.role;
      if (maybeRole === "ADMINISTRATOR" || maybeRole === "ADMIN") {
        localStorage.setItem("role", "ADMINISTRATOR");
        navigate("/app/admin", { replace: true });
        return; 
      }

      navigate("/pickRole");
      
    } catch (err: any) {
      setError("Error de conexión con el servidor.");
      console.log("Error en la solicitud:", err.message);
    }
  };

  return { authData, handleLogin , error};
};
