import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { BookOpen } from "lucide-react";

export default function AcademicInfo() {
  return (
    <section className="space-y-5">
      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-blue-600" /> Información Académica
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Programa</label>
          <Input placeholder="Ingeniería de Sistemas" className="h-11 bg-slate-50 border-slate-200" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Semestre</label>
          <Input placeholder="7" type="number" className="h-11 bg-slate-50 border-slate-200" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Rol RIDECI</label>
          <Select>
            <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conductor">Conductor</SelectItem>
              <SelectItem value="pasajero">Pasajero</SelectItem>
              <SelectItem value="acompanante">Acompañante</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
