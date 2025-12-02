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
    user: "Andrea  Perez",
    date: "Hace 2 días",
    text: "Todo perfecto, auto limpio y viaje tranquilo. Lo recomiendo totalmente.",
    avatar: momo
  },
];

export default function CommentList() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Comentarios</h3>

      <div className="space-y-4 bg-white border rounded-xl p-4 shadow-sm">
        {comments.map((c, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <img src={c.avatar} className="w-10 h-10 rounded-full object-cover"
              alt={c.user}
            />
            <div>
              <div className="font-medium">{c.user}</div>
              <div className="text-sm text-gray-500">{c.date}</div>
              <p className="text-gray-700 mt-1">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
