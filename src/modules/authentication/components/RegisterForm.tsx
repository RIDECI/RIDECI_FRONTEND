import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IdentificationType, Role } from "../types/user.d";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  handleRegister: (data: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: Role;
    identificationType: IdentificationType;
    identificationNumber: string;
    address: string;
    institutionalId: string;
  }) => void;
}

export function RegisterForm({ handleRegister }: RegisterFormProps) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<Role>(Role.STUDENT); // Valor inicial válido
  const [identificationType, setIdentificationType] = useState<IdentificationType>(IdentificationType.CC); // Valor inicial válido
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [institutionalId, setInstitutionalId] = useState("");

  const toLogin = () =>{
    navigate("/login")
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleRegister({
      name,
      email,
      password,
      phoneNumber,
      role,
      identificationType,
      identificationNumber,
      address,
      institutionalId,
    });
  };

return (
    <Card className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Crear cuenta
        </CardTitle>
        <CardDescription className="text-gray-500">
          Completa tus datos para registrarte
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Correo institucional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Número de celular"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              placeholder="ID institucional"
              value={institutionalId}
              onChange={(e) => setInstitutionalId(e.target.value)}
            />
          </div>

          <Input
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Tipo de documento
              </label>
              <select
                className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={identificationType}
                onChange={(e) =>
                  setIdentificationType(e.target.value as IdentificationType)
                }
              >
                <option value="CC">Cédula de ciudadanía</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="PASSPORT">Pasaporte</option>
              </select>
            </div>

            <Input
              placeholder="Número de documento"
              value={identificationNumber}
              onChange={(e) => setIdentificationNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Rol</label>
            <select
              className="h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value="STUDENT">Estudiante</option>
              <option value="PROFESSOR">Profesor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              className="w-full max-w-sm bg-blue-600 hover:bg-blue-700"
            >
              Registrarme
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center pt-3">
        <CardAction>
          <Button
            variant="link"
            onClick={toLogin}
            className="text-sm text-gray-600"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

