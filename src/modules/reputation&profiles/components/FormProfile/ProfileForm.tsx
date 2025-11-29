"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Camera, User, BookOpen } from "lucide-react";

export default function ProfileForm() {
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">Mi Perfil</h1>
        <p className="text-slate-500 mt-1">
          Gestiona tu información personal y configuración de cuenta.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        <div className="flex flex-col items-center gap-6 lg:w-72 shrink-0">
          <div className="relative group">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={photo ?? "https://github.com/shadcn.png"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full text-center space-y-2">
            <label className="cursor-pointer block">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <span className="inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all shadow-sm">
                <Camera className="w-4 h-4 mr-2" />
                Cambiar Foto
              </span>
            </label>
          </div>
        </div>

        <div className="flex-1 space-y-10">
          
          {/* INFO PERSONAL */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Información Personal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nombre Completo</label>
                <Input placeholder="Ej: Pepito Pérez" className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all" />
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
                  <Input placeholder="1020304050" className="flex-1 h-11 bg-slate-50 border-slate-200 focus:bg-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Fecha de Nacimiento</label>
                <Input type="date" className="h-11 block w-full bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Celular</label>
                <Input placeholder="300 123 4567" type="tel" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Correo Electronico</label>
                <Input placeholder="correo@mail.escuelaing.edu.com" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
              </div> 
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Dirección de Residencia</label>
                <Input placeholder="Carrera 45 # 123 - 45" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nombre Contacto Emergencia</label>
                <Input placeholder="Ej: Pepito Pérez" className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Celular Contacto Emergencia</label>
                <Input placeholder="300 123 4567" type="tel" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
            </div>
          </section>

          {/* INFO ACADÉMICA */}
          <section className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Información Académica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Programa</label>
                <Input placeholder="Ingeniería de Sistemas" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
               <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Semestre</label>
                <Input placeholder="Ej: 7" type="number" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
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

          <div className="pt-4 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base rounded-xl shadow-lg shadow-blue-200">
                  Guardar Cambios
              </Button>
          </div>
        </div>

      </div>
    </div>
  );
}