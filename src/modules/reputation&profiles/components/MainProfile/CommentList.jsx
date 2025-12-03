import momo from '../../../../assets/momo.jpeg';
import ok from '../../../../assets/ok.jpeg';

const comments = [
  {
    user: "Juan Rodriguez",
    date: "Hace 2 días",
    text: "Pepito fue un conductor excelente. Muy puntual, amable y el viaje fue muy agradable.",
    avatar: ok
  },
  {
    user: "Andrea Perez",
    date: "Hace 2 días",
    text: "Todo perfecto, auto limpio y viaje tranquilo. Lo recomiendo totalmente.",
    avatar: momo
  },
];

export default function CommentList() {

  const handleSeeAll = () => {
    // Aquí puedes navegar o abrir un modal
    console.log("Ver todos los comentarios");
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Comentarios</h3>

      <div className="space-y-4 bg-white border rounded-xl p-4 shadow-sm">
        {comments.map((c, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <img
              src={c.avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt={c.user}
            />
            <div>
              <div className="font-medium">{c.user}</div>
              <div className="text-sm text-gray-500">{c.date}</div>
              <p className="text-gray-700 mt-1">{c.text}</p>
            </div>
          </div>
        ))}

        {/* Botón Ver Todos */}
        <button
          onClick={handleSeeAll}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
        >
          Ver todos los comentarios
        </button>

      </div>
    </div>
  );
}
