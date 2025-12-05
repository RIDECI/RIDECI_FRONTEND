import momo from '../../../../assets/momo.jpeg';
import ok from '../../../../assets/ok.jpeg';
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/app/comments");
  };

  return (
    <div className="text-lg">
      <h3 className="text-2xl font-semibold mb-5">Comentarios</h3>

      <div className="space-y-8 bg-white border shadow-xl rounded-3xl p-8">

        {comments.map((c, idx) => (
          <div key={idx} className="flex gap-5 items-start">
            <img
              src={c.avatar}
              className="w-14 h-14 rounded-full object-cover shadow-md"
              alt={c.user}
            />
            <div>
              <div className="font-semibold text-slate-900 text-lg">{c.user}</div>
              <div className="text-sm text-gray-500">{c.date}</div>
              <p className="text-gray-700 mt-2 leading-relaxed">
                {c.text}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={handleSeeAll}
          className="
            w-full mt-2 bg-blue-600 hover:bg-blue-700 
            text-white py-3 rounded-xl text-base font-semibold 
            transition shadow-md
          "
        >
          Ver todos los comentarios
        </button>

      </div>
    </div>
  );
}
