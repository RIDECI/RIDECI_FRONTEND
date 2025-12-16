import { useState } from "react";
import { Star, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import momo from "../../../../assets/momo.jpeg";
import ok from "../../../../assets/ok.jpeg";

const comments = [
    {
        user: "Carlos Abel",
        date: "20/11/2025",
        rating: 4.5,
        text: "Un viaje excelente. El conductor fue muy amable, puntual al recogernos y llegamos a tiempo a la universidad.",
        avatar: ok,
    },
    {
        user: "Andrea Lopez",
        date: "19/11/2025",
        rating: 2.5,
        text: "No me gustó el viaje, llegamos muy tarde al destino y cuando le reclamamos, ignoró nuestras sugerencias, no viajaría con él de nuevo.",
        avatar: momo,
    },
    {
        user: "Ximena Santana",
        date: "19/11/2025",
        rating: 5.0,
        text: "Mi conductor favorito en esta aplicación. Siempre viajo con él y es una muy buena persona.",
        avatar: ok,
    },
];

export default function ViewAllComments() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    const openModal = (comment) => {
        setSelectedComment(comment);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedComment(null);
    };

    const handleAction = (action) => {
        console.log(`${action} comentario:`, selectedComment);
        closeModal();
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => navigate("/app/profile")}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>

                <h2 className="text-3xl font-semibold">
                    Reseñas y Comentarios
                </h2>
            </div>

            {/* Comments */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comments.map((c, i) => (
                    <div
                        key={i}
                        className="bg-[#F6F9FC] rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition"
                    >
                        <div>
                            <div className="flex items-start gap-3">
                                <img
                                    src={c.avatar}
                                    alt={c.user}
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800">
                                        {c.user}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {c.date}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
                                    {c.rating}
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                </div>
                            </div>

                            <p className="text-gray-700 mt-3 leading-snug">
                                {c.text}
                            </p>
                        </div>

                        {/* BOTÓN COMO ESTABA */}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => openModal(c)}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                            >
                                Moderar comentario
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Moderar comentario
                        </h3>

                        <p className="text-sm text-gray-600 mb-5">
                            Selecciona una acción para el comentario de{" "}
                            <span className="font-medium">
                                {selectedComment?.user}
                            </span>
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => handleAction("Restringir")}
                                className="w-full py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 font-medium transition"
                            >
                                Restringir
                            </button>

                            <button
                                onClick={() => handleAction("Moderar")}
                                className="w-full py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium transition"
                            >
                                Moderar
                            </button>

                            <button
                                onClick={() => handleAction("Bloquear")}
                                className="w-full py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-medium transition"
                            >
                                Bloquear
                            </button>
                        </div>

                        <button
                            onClick={closeModal}
                            className="mt-4 w-full py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
