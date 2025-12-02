"use client";
import { Camera } from "lucide-react";
import { useState } from "react";

type Props = {
  photo: string | null;
  onChange: (file: File) => void;
};

export default function ProfilePhoto({ photo, onChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 lg:w-72 shrink-0">
      <div className="relative group">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img
            src={photo ?? "https://github.com/shadcn.png"}
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChange(file);
            }}
          />
          <span className="inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all shadow-sm">
            <Camera className="w-4 h-4 mr-2" />
            Cambiar Foto
          </span>
        </label>
      </div>
    </div>
  );
}
