import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { User } from "lucide-react";

export default function ProfileInfo() {
  return (
    <section className="space-y-5">
      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" /> Información Personal
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nombre Completo</label>
          <Input placeholder="Ej: Pepito Pérez" className="h-11 bg-slate-50 border-slate-200" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Documento de Identidad</label>
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="w-[110px] h-11 bg-slate-50 border-slate-200">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cc">C.C.</SelectItem>
                <SelectItem value="ti">T.I.</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="1020304050" className="flex-1 h-11 bg-slate-50 border-slate-200" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Fecha de Nacimiento</label>
          <Input type="date" className="h-11 bg-slate-50 border-slate-200" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Celular</label>
          <Input placeholder="300 123 4567" type="tel" className="h-11 bg-slate-50 border-slate-200" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Correo Electrónico</label>
          <Input placeholder="correo@mail.com" className="h-11 bg-slate-50 border-slate-200" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Dirección</label>
          <Input placeholder="Carrera 45 # 123 - 45" className="h-11 bg-slate-50 border-slate-200" />
        </div>

      </div>
    </section>
  );
}
