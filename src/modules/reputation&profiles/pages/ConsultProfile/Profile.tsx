import { useEffect, useState } from "react";
import ProfileHeader from "@/modules/reputation&profiles/components/MainProfile/ProfileHeader";
import RatingSummary from "@/modules/reputation&profiles/components/MainProfile/RatingSummary";
import CommentList from "@/modules/reputation&profiles/components/MainProfile/CommentList";
import Badges from "@/modules/reputation&profiles/components/MainProfile/Badges";
import Buttons from "@/modules/reputation&profiles/components/MainProfile/Buttons";
import { useGetProfile, type Profile as ProfileType } from "@/modules/reputation&profiles/hooks/GetProfile/getProfileHook";

export default function Profile() {
  const { getProfile, loading, profile } = useGetProfile();
  const [profileData, setProfileData] = useState<ProfileType | null>(null);

  useEffect(() => {
    // Obtener el userId del usuario autenticado
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      getProfile(userId);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="flex w-full h-screen bg-[#e8f1fd] overflow-hidden text-lg items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen bg-[#e8f1fd] overflow-hidden text-lg">
      {/* Contenido */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="bg-white shadow-2xl rounded-3xl p-14 max-w-6xl mx-auto">

          <ProfileHeader profile={profileData} />

          <div className="mt-12">
            <RatingSummary profile={profileData} />
          </div>

          <div className="mt-12">
            <CommentList profile={profileData} />
          </div>

          <div className="mt-12">
            <Badges profile={profileData} />
          </div>

          <div className="mt-12 flex justify-end gap-6">
            <Buttons />
          </div>
        </div>
      </main>
    </div>
  );
}
