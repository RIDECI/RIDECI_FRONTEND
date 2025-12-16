import bob from '../../../../assets/bob.jpeg';
import { useEffect, useState } from 'react';

export default function ProfileHeader() {
  const [profileData, setProfileData] = useState({
    name: 'Pepito Perez',
    roles: 'Acompañante, Conductor',
    photo: bob
  });

  useEffect(() => {
    const currentProfile = localStorage.getItem('currentProfile');
    if (currentProfile) {
      try {
        const profile = JSON.parse(currentProfile);
        setProfileData({
          name: profile.name || 'Pepito Perez',
          roles: profile.profileType || 'Acompañante, Conductor',
          photo: profile.profilePictureUrl || bob
        });
      } catch (error) {
        console.log('Error parsing profile:', error);
      }
    }
  }, []);

  return (
    <div className="flex items-center gap-6">
      <img
        src={profileData.photo}
        alt="profile"
        className="w-24 h-24 rounded-full object-cover"
        loading="lazy"
      />

      <div>
        <h2 className="text-2xl font-bold">{profileData.name}</h2>
        <p className="text-gray-500 text-lg">
          Estudiante — Roles: <span className="font-semibold">{profileData.roles}</span>
        </p>
      </div>
    </div>
  );
}