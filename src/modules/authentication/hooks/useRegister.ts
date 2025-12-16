import { useState } from "react";
import type { IdentificationType, Role, AccountState } from "../types/user";
import { useNavigate } from "react-router-dom";


interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: Role;
    identificationType: IdentificationType;
    identificationNumber: string;
    address: string;
    institutionalId: string;
}

interface UserResponse {
    userId: number;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    role: Role;
    state: AccountState;
}

export const useRegister = () => {
    const [registerData, setRegisterData] = useState<UserResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()

    const handleRegister = async (data: RegisterRequest) => {
        setError(null);
        if (!data.name || !data.email || !data.password || !data.phoneNumber || !data.identificationNumber || !data.address || !data.institutionalId || !data.role || !data.identificationType || !data.institutionalId || data.phoneNumber === "") {
            setError("Datos de registro vacíos.");
            console.log("vacio");
            return;
        }

        try {
            const response = await fetch("https://kratosauthenticationbackend-production.up.railway.app/auth/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                setError(errorData?.message || "Error al registrarse.");
                console.log("Error al registrarse");
                return;
            }

            const userResponse: UserResponse = await response.json();
            setRegisterData(userResponse);
            console.log("Registro melo: ", userResponse)

            const maybeRole = (userResponse as any)?.role;
            if (maybeRole === "ADMINISTRATOR" || maybeRole === "ADMIN") {
                localStorage.setItem("role", "ADMINISTRATOR");
                navigate("/app/admin", { replace: true });
                return;
            }

            // Guardar datos básicos en localStorage para uso en la creación de perfil
            try {
                localStorage.setItem("userName", userResponse.name);
                localStorage.setItem("userEmail", userResponse.email);
                localStorage.setItem("userId", String(userResponse.userId));
                // Guardar teléfono y dirección si vienen en la respuesta o en el payload
                if (userResponse.phoneNumber) {
                    localStorage.setItem("phoneNumber", userResponse.phoneNumber);
                } else if (data.phoneNumber) {
                    localStorage.setItem("phoneNumber", data.phoneNumber);
                }
                if (data.address) {
                    localStorage.setItem("address", data.address);
                }
            } catch (e) {
                console.warn('No se pudo guardar en localStorage:', e);
            }

            // Después del registro, ir a la selección de perfil
            navigate("/selectProfile");
        } catch (err: any) {
            setError("Error de conexión con el servidor.");
            console.log("Error en la solicitud de registro:", err.message);
        }
    };

    return { registerData, handleRegister, error };
}