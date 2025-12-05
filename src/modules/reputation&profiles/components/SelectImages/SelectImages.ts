import { z } from "zod";
export const SelectImagesPropsSchema = z.object({
  profileName: z.string().min(1, "Profile name is required"),
  avatarUrl: z.enum([
    "/assets/acompanante.jpg",
    "/assets/imgPasajero.jpg",
    "/assets/imgConductor.jpg",
  ]),
});