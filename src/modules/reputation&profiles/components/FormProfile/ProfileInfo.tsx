import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { BookOpen } from "lucide-react";

export default function ProfileInfo({
  photo,
  onPhotoChange,
  role,
}: {
  photo: string | null;
  onPhotoChange: (file: File | null) => void;
  role?: string;
}) {
  return (
    <section className="space-y-8">
      <div className="flex gap-10">
        
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

        <div className="grid grid-cols-2 gap-6 flex-1">

          <div className="space-y-1">
            <label className="font-medium">Nombre</label>
            <Input placeholder="Ingresa tu nombre" />
          </div>

          <div className="space-y-1">
            <label className="font-medium">Documento de Identidad</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CC">Cédula</SelectItem>
                <SelectItem value="TI">Tarjeta Identidad</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="font-medium">Semestre</label>
            <Input placeholder="Ej: 5" />
          </div>

          <div className="space-y-1 opacity-60 pointer-events-none">
            <label className="font-medium">Rol</label>

            <div className="h-11 flex items-center px-3 bg-slate-100 border border-slate-300 rounded-md">
              <span className="text-slate-700 capitalize">
                {role ?? "No asignado"}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-medium">Número Teléfono</label>
            <Input placeholder="300 123 4567" />
          </div>

          <div className="space-y-1">
            <label className="font-medium">Fecha Nacimiento</label>
            <Input type="date" />
          </div>

          <div className="space-y-1 col-span-2">
            <label className="font-medium">Email</label>
            <Input placeholder="correo@mail.com" />
          </div>

          <div className="space-y-1 col-span-2">
            <label className="font-medium">Dirección</label>
            <Input placeholder="Ingresa tu dirección" />
          </div>

          <section className="space-y-4 col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Información Académica
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Programa</label>
                <Input
                  placeholder="Ingeniería de Sistemas"
                  className="h-11 bg-slate-50 border-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Semestre</label>
                <Input
                  placeholder="7"
                  type="number"
                  className="h-11 bg-slate-50 border-slate-200"
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  );
}
