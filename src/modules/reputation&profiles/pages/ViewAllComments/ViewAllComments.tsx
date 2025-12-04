import { Star } from "lucide-react";
import { ChevronLeft } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

import momo from "../../../../assets/momo.jpeg";
import ok from "../../../../assets/ok.jpeg";

const comments = [

    {
        user: "Carlos Santana",
        date: "20/11/2025",
        rating: 4.5,
        text: "Un viaje excelente. El conductor fue muy amable, puntual al recogernos y llegamos a tiempo a la universidad.",
        avatar: ok,
    },
    {
        user: "Carlos Santana",
        date: "19/11/2025",
        rating: 2.5,
        text: "No me gustó el viaje, llegamos muy tarde al destino y cuando le reclamamos, ignoró nuestras sugerencias, no viajaría con él de nuevo.",
        avatar: momo,
    },
    {
        user: "Carlos Santana",
        date: "19/11/2025",
        rating: 5.0,
        text: "Mi conductor favorito en esta aplicación. Siempre viajo con él y es una muy buena persona.",
        avatar: ok,
    },
];

export default function ViewAllComments() {

    const navigate = useNavigate();

    return (
        <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
            <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-gray-200 transition"
            >
            <ChevronLeft className="w-7 h-7" />
            </button>

            <h2 className="text-3xl font-semibold">Reseñas y Comentarios</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comments.map((c, i) => (
            <div
                key={i}
                className="bg-[#F3F8FF] rounded-xl shadow-md border p-5 transition hover:shadow-lg"
            >
                <div className="flex items-start gap-3">
                <img
                    src={c.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                    alt={c.user}
                />

                <div className="flex-1">
                    <div className="font-semibold text-gray-800">{c.user}</div>
                    <div className="text-sm text-gray-500">{c.date}</div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    {c.rating}
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </div>
                </div>

                {/* Comentario */}
                <p className="text-gray-700 mt-3 leading-snug">{c.text}</p>
            </div>
            ))}
        </div>
        </div>
    );
}
