import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordRequest {
    email: string;
}

interface ResetPasswordRequest {
    token: string;      // Token que viene del enlace del correo
    newPassword: string;
    confirmPassword?: string; // Solo para validación en frontend
}

const API_BASE_URL = "https://kratosauthenticationbackend-production.up.railway.app";

export const useForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    /**
     * Paso 1: Solicitar enlace de recuperación por email
     * POST /auth/forgot-password
     */
    const handleForgotPassword = async (data: ForgotPasswordRequest) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            console.log("Solicitando enlace de recuperación para:", data.email);

            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: data.email
                }),
            });

            const responseText = await response.text();
            console.log(" Respuesta del backend:", responseText);

            let responseData;
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                console.error("Error parsing JSON:", e);
                responseData = { message: responseText };
            }

            if (!response.ok) {
                const errorMsg = responseData.message ||
                    responseData.error ||
                    `Error ${response.status}: ${response.statusText}`;
                throw new Error(errorMsg);
            }

            // Guardar email para mostrar en la pantalla de confirmación
            localStorage.setItem("reset_email", data.email);

            // Navegar a la pantalla "Correo Enviado"
            navigate(`/email-sent?email=${encodeURIComponent(data.email)}`);

        } catch (err: any) {
            console.error("Error en forgot-password:", err);
            setError(err.message || "Error al procesar la solicitud. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Paso 2: Cambiar contraseña con token del enlace del correo
     * POST /auth/reset-password
     */
    const handleResetPassword = async (data: ResetPasswordRequest) => {
        // Validación frontend
        if (data.newPassword.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            console.log("Restableciendo contraseña con token");

            // Payload que espera el backend
            const payload = {
                token: data.token,           // Token del enlace del correo
                newPassword: data.newPassword
                // El backend NO espera email aquí
            };

            console.log("Payload para reset-password:", payload);

            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload),
            });

            const responseText = await response.text();
            console.log("Respuesta reset-password:", responseText);

            let responseData;
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                console.error("Error parsing JSON:", e);
                responseData = { message: responseText };
            }

            if (!response.ok) {
                const errorMsg = responseData.message ||
                    responseData.error ||
                    `Error ${response.status}: ${response.statusText}`;
                throw new Error(errorMsg);
            }

            // Éxito - contraseña cambiada
            setSuccess("¡Contraseña restablecida exitosamente!");

            // Limpiar email guardado
            localStorage.removeItem("reset_email");

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err: any) {
            console.error("Error en reset-password:", err);
            setError(err.message || "Error al restablecer la contraseña. El enlace puede haber expirado.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        success,
        handleForgotPassword,   // Solo para Paso 1
        handleResetPassword,    // Solo para Paso 2 (con token)
    };
};