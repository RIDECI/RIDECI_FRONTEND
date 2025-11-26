import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

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

export function RegisterForm() {
  const { handleRegister } = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<Role>(Role.STUDENT); // Valor inicial válido
  const [identificationType, setIdentificationType] = useState<IdentificationType>(IdentificationType.CC); // Valor inicial válido
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [institutionalId, setInstitutionalId] = useState<number>(0);

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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register a new account</CardTitle>
        <CardDescription>
          Fill in your details to create a new account
        </CardDescription>
        <CardAction>
          <Button variant="link">Login</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value="STUDENT">STUDENT</option>
              <option value="PROFESSOR">PROFESSOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <label htmlFor="identificationType">Identification Type</label>
            <select
              id="identificationType"
              value={identificationType}
              onChange={(e) => setIdentificationType(e.target.value as IdentificationType)}
            >
              <option value="CC">CC</option>
              <option value="TI">TI</option>
              <option value="PASSPORT">PASSPORT</option>
            </select>

            <Input
              placeholder="Identification Number"
              value={identificationNumber}
              onChange={(e) => setIdentificationNumber(e.target.value)}
              required
            />
            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Institutional ID"
              value={institutionalId}
              onChange={(e) => setInstitutionalId(Number(e.target.value))}
              required
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Register with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
