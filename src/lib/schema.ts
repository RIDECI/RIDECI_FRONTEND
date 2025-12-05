import { z } from "zod";

export const SelectImagesPropsSchema = z.object({
  profileName: z.enum(["Acompañante", "Pasajero", "Conductor"], {
    message: "Debes seleccionar un rol válido",
  }),
  avatarUrl: z.string().min(1, "La imagen es requerida"),
});