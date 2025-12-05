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
    <Card className="register-card">
      <CardHeader className="register-header">
        <CardTitle className="register-title">Crear cuenta</CardTitle>
        <CardDescription className="register-description">
          Completa tus datos para registrarte
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="main-bar">
            <div className="left-bar">
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

            <div className="right-bar">
              <Input
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label htmlFor="identificationType" className="register-label">
                Tipo de documento
              </label>
              <select
                id="identificationType"
                className="register-select"
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

              <Input
                placeholder="Número de documento"
                value={identificationNumber}
                onChange={(e) => setIdentificationNumber(e.target.value)}
              />

              <label htmlFor="role" className="register-label">
                Rol
              </label>
              <select
                id="role"
                className="register-select"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="STUDENT">Estudiante</option>
                <option value="PROFESSOR">Profesor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <div className="second-bar">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" className="register-submit">
              Registrarme
            </Button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="footer">
        <CardAction>
          <Button variant="link" onClick={toLogin} className="register-login-link">
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

