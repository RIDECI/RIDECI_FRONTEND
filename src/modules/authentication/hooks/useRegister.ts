import { useState } from "react";
import type { IdentificationType, Role , AccountState} from "../types/user";
//import { useNavigate } from "react-router-dom";


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
    const [registerData, setRegisterData] = useState<UserResponse| null> (null);
    const [error, setError] = useState<string | null>(null);
    //const navigate = useNavigate()

    const handleRegister = async (data: RegisterRequest) => {
        setError(null);
        if(!data.name || !data.email || !data.password || !data.phoneNumber || !data.identificationNumber || !data.address || !data.institutionalId || !data.role || !data.identificationType || !data.institutionalId || data.phoneNumber === ""){
            setError("Datos de registro vacíos.");
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
                const errorData = await response.json().catch(() => null);
                setError(errorData?.message || "Error al registrarse.");
                console.log("Error al registrarse");
                return;
            }

            const userResponse: UserResponse = await response.json();
            setRegisterData(userResponse);
            console.log("Registro melo: ", userResponse)
            //navigate("/pickRole")
        }catch (err: any) {
            setError("Error de conexión con el servidor.");
            console.log("Error en la solicitud de registro:", err.message);
        }
    };

    return {registerData, handleRegister, error};
}