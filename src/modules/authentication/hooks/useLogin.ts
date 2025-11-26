import { useState } from "react";
//import { useNavigate } from "react-router-dom";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
}

export const useLogin = () => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  //const navigate = useNavigate();

  const handleLogin = async (data: LoginRequest) => {
    if (!data.email || !data.password) {
      console.log("Email o contraseña vacíos");
      return;
    }

    try {
      const response = await fetch("https://kratosauthenticationbackend-develop.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        console.log("Error al iniciar sesión:");
        return;
      }

      const result: AuthResponse = await response.json();
      setAuthData(result);

      console.log("Login exitoso:", result);
      console.log(result);

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("userId", result.userId.toString());

      //navigate("/dashboard");
    } catch (err: any) {
      console.log("Error en la solicitud:", err.message);
    }
  };

  return { authData, handleLogin };
};
