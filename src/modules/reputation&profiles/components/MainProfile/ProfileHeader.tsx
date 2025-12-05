import bob from '../../../../assets/bob.jpeg';

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-6">
      <img
        src={bob}
        alt="profile"
        className="w-24 h-24 rounded-full object-cover"
        loading="lazy"
      />

      <div>
        {/* Llega del back */}
        <h2 className="text-2xl font-bold">Pepito Perez</h2>
        <p className="text-gray-500 text-lg">
          {/* Llega del back y peticiones del front */}
          Estudiante — Roles: <span className="font-semibold">Acompañante, Conductor</span>
        </p>
      </div>
    </div>
  );
}