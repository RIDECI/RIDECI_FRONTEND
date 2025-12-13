import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";

function EmailSentPage() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email") || "";
    const [storedEmail, setStoredEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!email && typeof window !== "undefined") {
            const savedEmail = localStorage.getItem("reset_email");
            if (savedEmail) {
                setStoredEmail(savedEmail);
            }
        }
    }, [email]);

    const displayEmail = email || storedEmail;

    const handleResend = () => {
        alert("Funcionalidad de reenvío pendiente de implementar");
    };

    const handleBackToLogin = () => {
        localStorage.removeItem("reset_email");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-500/10"></div>
            
            <div className="relative z-10 w-full max-w-md animate-in fade-in duration-500">
                <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-6 pb-8">
                        <div className="flex justify-center">
                            <img 
                                src="/RIDECI-logo-blanco.png" 
                                alt="RIDECI Logo" 
                                className="h-16"
                            />
                        </div>

                        <div className="flex justify-center">
                            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <CardTitle className="text-3xl font-bold text-gray-900">
                                ¡Correo Enviado!
                            </CardTitle>
                            
                            <CardDescription className="text-lg text-gray-700">
                                Revisa tu bandeja de entrada y sigue las instrucciones.
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-blue-600" />
                                <p className="text-sm font-medium text-blue-800">
                                    Correo enviado a:
                                </p>
                            </div>
                            <p className="text-lg font-bold text-blue-900 break-all px-2">
                                {displayEmail || "correo@ejemplo.com"}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-800">¿Qué hacer ahora?</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">
                                        1
                                    </div>
                                    <span>Abre tu correo electrónico</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">
                                        2
                                    </div>
                                    <span>Busca el correo de <strong>RIDECI</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">
                                        3
                                    </div>
                                    <span>Haz clic en el enlace de recuperación</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">
                                        4
                                    </div>
                                    <span>Sigue las instrucciones para crear una nueva contraseña</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <p className="text-sm text-amber-800">
                                💡 <strong>Consejo:</strong> Si no ves el correo, revisa tu carpeta de <strong>spam</strong>.
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex-col gap-4 border-t border-gray-200 pt-6">
                        <Button 
                            onClick={handleBackToLogin}
                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                        >
                            Aceptar
                        </Button>

                        <div className="flex gap-3 w-full">
                            <Button
                                variant="outline"
                                onClick={handleResend}
                                className="flex-1 h-11 border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                                Reenviar correo
                            </Button>
                            
                            <Button
                                variant="outline"
                                onClick={() => navigate("/login")}
                                className="flex-1 h-11 border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver
                            </Button>
                        </div>

                        <p className="text-sm text-gray-600 text-center">
                            ¿Problemas técnicos?{" "}
                            <button 
                                onClick={() => alert("Contactar soporte técnico")}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Contactar soporte
                            </button>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default EmailSentPage;