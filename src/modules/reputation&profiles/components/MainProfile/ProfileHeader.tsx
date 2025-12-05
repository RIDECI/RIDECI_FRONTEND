import type { Profile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: Profile | null;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  if (!profile) {
    return (
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gray-200" />
        <div>
          <h2 className="text-2xl font-bold">Cargando...</h2>
          <p className="text-gray-500 text-lg">Cargando información del perfil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {profile.profilePictureUrl ? (
        <img
          src={profile.profilePictureUrl}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200" />
      )}

      <div>
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-gray-500 text-lg">
          {/* Roles would come from profileType */}
          Estudiante — Roles: <span className="font-semibold">{profile.profileType}</span>
        </p>
      </div>
    </div>
  );
}
