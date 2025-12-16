import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const { handleForgotPassword, isLoading, error, success } = useForgotPassword();
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes("@") || !email.includes(".")) {
            alert("Por favor ingresa un email válido");
            return;
        }

        handleForgotPassword({ email });
    };

    return (
        <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-6 pb-8">
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/login")}
                        className="h-10 w-10 rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>



                    <div className="w-10"></div>
                </div>

                <div className="space-y-4">
                    <CardTitle className="text-3xl font-bold text-gray-900">
                        ¿Olvidaste tu contraseña?
                    </CardTitle>

                    <CardDescription className="text-lg text-gray-700">
                        No te preocupes, ingresa tu correo electrónico y te enviaremos
                        instrucciones para restablecer tu contraseña.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                    {error && (
                        <Alert variant="destructive" className="animate-in fade-in">
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

                    <div className="space-y-3">
                        <label htmlFor="email" className="text-sm font-medium text-gray-800 flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Correo electrónico
                        </label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="ejemplo@escuelaing.edu.co"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            className="h-12 text-base border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />

                        <p className="text-sm text-gray-500">
                            Usa tu email institucional de la Escuela
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                        disabled={isLoading || !email}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            "Enviar instrucciones"
                        )}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="justify-center border-t border-gray-200 pt-6">
                <div className="text-center space-y-2">
                    <p className="text-gray-600">
                        ¿Recordaste tu contraseña?
                    </p>
                    <Button
                        variant="link"
                        onClick={() => navigate("/login")}
                        className="text-blue-600 font-semibold text-lg"
                    >
                        ← Volver al inicio de sesión
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}