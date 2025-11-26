import { useState } from "react";
import type { IdentificationType, Role , AccountState} from "../types/user";


interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
  identificationType: IdentificationType;
  identificationNumber: string;
  address: string;
  institutionalId: number;
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
    const [registerData, setRegisterData] = useState<UserResponse| null> (null);

    const handleRegister = async (data: RegisterRequest) => {
        if(!data){
            console.log("vacio");
            return;
        }

        try{
            const response = await fetch("https://kratosauthenticationbackend-develop.up.railway.app/auth/register",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                }
            );

            if (!response.ok){
                console.log("Error al registrarse");
                return;
            }

            const userResponse: UserResponse = await response.json();
            setRegisterData(userResponse);
            console.log("Registro melo: ", userResponse)
        }catch (err: any) {
            console.log("Error en la solicitud de registro:", err.message);
        }
    };

    return {registerData, handleRegister};
}