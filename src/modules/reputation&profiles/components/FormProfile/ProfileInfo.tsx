import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import type { UpdateProfileRequest } from "../../hooks/UpdateProfile/updateProfileHook";

interface ProfileInfoProps {
  photo: string | null;
  onPhotoChange: (file: File | null) => void;
  role?: string;
  formData?: Partial<UpdateProfileRequest>;
  onFormDataChange?: (data: Partial<UpdateProfileRequest>) => void;
}

// Definimos la interfaz exacta para recibir los datos del padre
interface ProfileInfoProps {
  photo: string | null;
  onPhotoChange: (file: File | null) => void;
  role?: string;
  formData: {
    name: string;
    identificationNumber: string;
    identificationType: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    address: string;
    semester: string;
    program: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function ProfileInfo({
  photo,
  onPhotoChange,
  role,
  formData,
  onInputChange,
}: ProfileInfoProps) {
  return (
    <section className="space-y-8">
      <div className="flex gap-10">
        
        {/* FOTO */}
        <div className="flex flex-col items-center gap-4 w-48">
          {photo ? (
            <img
              src={photo}
              alt="Foto perfil"
              className="w-40 h-40 rounded-xl object-cover border border-slate-200"
            />
          ) : (
            <div className="w-40 h-40 rounded-xl bg-slate-100 border border-slate-200" />
          )}

          <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer shadow hover:bg-blue-700 transition-all">
            Elegir Foto
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
        </div>

        {/* FORMULARIO */}
        <div className="grid grid-cols-2 gap-6 flex-1">

          {/* NOMBRE */}
          <div className="space-y-1">
            <label className="font-medium">Nombre</label>
            <Input 
              placeholder="Ingresa tu nombre" 
              value={formData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
            />
          </div>

          {/* TIPO DOCUMENTO */}
          <div className="space-y-1">
            <label className="font-medium">Documento de Identidad</label>
            <Select 
              value={formData.identificationType} 
              onValueChange={(val) => onInputChange("identificationType", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CC">Cédula</SelectItem>
                <SelectItem value="TI">Tarjeta Identidad</SelectItem>
                <SelectItem value="CE">Cédula Extranjería</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* NÚMERO DOCUMENTO */}
          <div className="space-y-1">
             <label className="font-medium">Número de Documento</label>
             <Input 
               placeholder="Ej: 123456789"
               value={formData.identificationNumber}
               onChange={(e) => onInputChange("identificationNumber", e.target.value)}
             />
          </div>

          {/* ROL (Solo lectura) */}
          <div className="space-y-1 opacity-60 pointer-events-none">
            <label className="font-medium">Rol</label>
            <div className="h-11 flex items-center px-3 bg-slate-100 border border-slate-300 rounded-md">
              <span className="text-slate-700 capitalize">
                {role ?? formData?.profileType ?? "No asignado"}
              </span>
            </div>
          </div>

          {/* TELÉFONO */}
          <div className="space-y-1">
            <label className="font-medium">Número Teléfono</label>
            <Input 
              placeholder="300 123 4567" 
              value={formData.phoneNumber}
              onChange={(e) => onInputChange("phoneNumber", e.target.value)}
            />
          </div>

          {/* FECHA NACIMIENTO */}
          <div className="space-y-1">
            <label className="font-medium">Fecha Nacimiento</label>
            <Input 
              type="date" 
              value={formData.birthDate}
              onChange={(e) => onInputChange("birthDate", e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1 col-span-2">
            <label className="font-medium">Email</label>
            <Input 
              placeholder="correo@mail.com" 
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
            />
          </div>

          {/* DIRECCIÓN */}
          <div className="space-y-1 col-span-2">
            <label className="font-medium">Dirección</label>
            <Input 
              placeholder="Ingresa tu dirección" 
              value={formData.address}
              onChange={(e) => onInputChange("address", e.target.value)}
            />
          </div>

          {/* INFO ACADÉMICA (Se guarda en formData pero no se envía al back en el JSON principal si el DTO no lo pide, pero está lista por si acaso) */}
          <section className="space-y-4 col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Información Académica
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Programa</label>
                <Input
                  name="program"
                  placeholder="Ingeniería de Sistemas"
                  className="h-11 bg-slate-50 border-slate-200"
                  value={formData.program}
                  onChange={(e) => onInputChange("program", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Semestre</label>
                <Input
                  name="programSemester"
                  placeholder="7"
                  type="number"
                  className="h-11 bg-slate-50 border-slate-200"
                  value={formData.semester}
                  onChange={(e) => onInputChange("semester", e.target.value)}
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  );
}