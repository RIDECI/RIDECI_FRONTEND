import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForgotPassword } from "../hooks/useForgotPassword";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

import "./reset-password.css";
import RideciLogo from "../../../assets/rideci-logo-blanco.png";
import ResetImage from "../../../assets/resetGroup.png";

function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { handleResetPassword, isLoading, error, success } =
        useForgotPassword();

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert(
                "Enlace inválido o expirado. Por favor, solicita un nuevo enlace."
            );
            navigate("/forgot-password");
        }
    }, [token, navigate]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (newPassword.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        handleResetPassword({
            token,
            newPassword,
            confirmPassword,
        });
    };

    const passwordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strength = passwordStrength(newPassword);
    const isFormValid = newPassword && confirmPassword;

    return (
        <div className="auth-page">
            {/* Columna izquierda (formulario) */}
            <div className="auth-container">
                <div className="w-full max-w-md animate-in fade-in duration-500">
                    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                        <CardHeader className="text-center space-y-6 pb-8">
                            <div className="flex justify-center">
                                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                                    <ShieldCheck className="h-12 w-12 text-blue-600" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Reestablece tu contraseña
                                </CardTitle>

                                <CardDescription className="text-lg text-gray-700">
                                    Crea tu nueva contraseña para poder ingresar a tu cuenta
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={onSubmit} className="space-y-6">
                                {error && (
                                    <Alert
                                        variant="destructive"
                                        className="animate-in fade-in"
                                    >
                                        <AlertDescription className="font-medium">
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {success && (
                                    <Alert className="bg-green-50 border-green-200 animate-in fade-in">
                                        <AlertDescription className="text-green-800 font-medium">
                                            {success}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Password */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-800 flex items-center gap-2">
                                        <Lock className="h-4 w-4" />
                                        Ingresa nueva contraseña
                                    </label>

                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Mínimo 8 caracteres"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            disabled={isLoading}
                                            required
                                            className="h-12 text-base pr-10 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Barra de fuerza */}
                                    {newPassword && (
                                        <div className="space-y-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-2 flex-1 rounded ${
                                                            level <= strength
                                                                ? level <= 1
                                                                    ? "bg-red-500"
                                                                    : level ===
                                                                      2
                                                                    ? "bg-yellow-500"
                                                                    : level ===
                                                                      3
                                                                    ? "bg-blue-500"
                                                                    : "bg-green-500"
                                                                : "bg-gray-200"
                                                        }`}
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-xs text-gray-600">
                                                {strength === 0 && "Muy débil"}
                                                {strength === 1 && "Débil"}
                                                {strength === 2 && "Regular"}
                                                {strength === 3 && "Buena"}
                                                {strength === 4 && "Excelente"}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm password */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-800">
                                        Confirma la contraseña
                                    </label>

                                    <div className="relative">
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Repite la contraseña"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            disabled={isLoading}
                                            required
                                            className="h-12 text-base pr-10 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>

                                    {confirmPassword &&
                                        newPassword !== confirmPassword && (
                                            <p className="text-sm text-red-600 font-medium animate-in fade-in">
                                                Las contraseñas no coinciden
                                            </p>
                                        )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                                    disabled={
                                        isLoading ||
                                        !isFormValid ||
                                        newPassword !== confirmPassword
                                    }
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Restableciendo...
                                        </>
                                    ) : (
                                        "Cambiar contraseña"
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex-col gap-4 border-t border-gray-200 pt-6">
                            <p className="text-sm text-gray-600 text-center">
                                Al hacer clic en "Cambiar contraseña", aceptas
                                los términos y condiciones.
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Columna derecha (imágenes) */}
            <div className="images-column">
                <img src={RideciLogo} alt="RIDECI" className="image-logo" />

                <img
                    src={ResetImage}
                    alt="Reset password group"
                    width={600}
                    height={600}
                    className="image-large"
                />
            </div>
        </div>
    );
}

export default ResetPasswordPage;
