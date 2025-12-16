import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom"; // IMPORTANTE: Agregar este import

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  handleLogin: (data: { email: string; password: string }) => void;
}

export function LoginForm({ handleLogin }: LoginFormProps) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/register")
  }
  const toForgotPassword = () => {
    navigate("/forgot-password")
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🟢 Frontend: LoginForm onSubmit triggered");
    console.log("   Data:", { email, password: password ? "********" : "empty" });
    handleLogin({ email, password });
  };


  return (
    <Card
      className="
          w-full max-w-lg
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-2xl
          rounded-2xl
          text-white
          p-6
        "
    >
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          Iniciar Sesión
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="
                    bg-black/20 
                    border border-white/20
                    text-white
                    placeholder-white
                    focus:border-white/40
                  "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="
                    bg-black/20 
                    border border-white/20
                    text-white
                    placeholder-white
                    focus:border-white/40
                  "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="submit-button">
                Entrar
              </Button>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="card-footer">
        <div className="flex flex-col justify-center items-center gap-1">
          <CardAction className="w-full flex justify-center">
            <Button
              variant="link"
              className="text-white"
              onClick={toRegister}
            >
              Registrarse
            </Button>
          </CardAction>

          <CardAction>
            <Button variant="link" className="text-white" onClick={toForgotPassword}>
              ¿Olvidaste la contraseña?
            </Button>
          </CardAction>
        </div>
      </CardFooter>
    </Card>
  );
}