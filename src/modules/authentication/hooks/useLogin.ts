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
    console.log("🔵 useLogin: handleLogin called with:", { email: data.email, password: data.password ? "********" : "empty" });

    if (!data.email || !data.password) {
      setError("Debes ingresar un email y una contraseña.");
      console.warn("⚠️ useLogin: Validation failed - Empty email or password");
      return;
    }

    try {
      console.log("📡 useLogin: Sending request to https://kratosauthenticationbackend-production.up.railway.app/auth/login");
      const response = await fetch("https://kratosauthenticationbackend-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      console.log("📥 useLogin: Response received. Status:", response.status);

      if (!response.ok) {
        const textBody = await response.text();
        console.error("❌ useLogin: Login failed. Status:", response.status, "Body:", textBody);

        let errorData;
        try {
          errorData = JSON.parse(textBody);
        } catch {
          errorData = { message: textBody };
        }

        setError(errorData?.message || "Credenciales incorrectas.");
        return;
      }

      const result: AuthResponse = await response.json();
      setAuthData(result);

      console.log("✅ useLogin: Login successful. Token received.");

      // Decodificar JWT para extraer el nombre del usuario
      try {
        const payload = JSON.parse(atob(result.accessToken.split('.')[1]));
        console.log("🔑 useLogin: JWT payload decoded:", payload);

        if (payload.name) {
          localStorage.setItem("userName", payload.name);
        }
      } catch (e) {
        console.error("⚠️ useLogin: Error decoding JWT (non-critical):", e);
      }

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("userId", result.institutionalId.toString());
      localStorage.setItem("userEmail", data.email);

      const maybeRole = (result as any)?.role;
      if (maybeRole === "ADMINISTRATOR" || maybeRole === "ADMIN") {
        localStorage.setItem("role", "ADMINISTRATOR");
        navigate("/app/admin", { replace: true });
        return;
      }

      navigate("/pickRole");

    } catch (err: any) {
      console.error("🔥 useLogin: Network or code error:", err);
      setError("Error de conexión con el servidor.");
    }
  };

  return { authData, handleLogin, error };
};
