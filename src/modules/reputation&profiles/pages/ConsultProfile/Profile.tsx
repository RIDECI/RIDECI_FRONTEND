import { useEffect } from "react";
import { useGetProfile } from "../../hooks/GetProfile/getProfileHook";
import ProfileHeader from "../../components/MainProfile/ProfileHeader";
import RatingSummary from "../../components/MainProfile/RatingSummary";
import CommentList from "../../components/MainProfile/CommentList";
import Badges from "../../components/MainProfile/Badges";
import Buttons from "../../components/MainProfile/Buttons";

export default function Profile() {
  const { getProfile, loading, error, profile } = useGetProfile();

  useEffect(() => {
    // In a real implementation, get the profile ID from the URL or context
    // For now, using a hardcoded ID
    getProfile("1");
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="bg-white shadow-xl rounded-2xl p-10 max-w-5xl mx-auto flex justify-center items-center h-64">
            <p>Cargando perfil...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="bg-white shadow-xl rounded-2xl p-10 max-w-5xl mx-auto">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      {/* Contenido */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-5xl mx-auto">
          <ProfileHeader profile={profile} />

          <div className="mt-10">
            <RatingSummary profile={profile} />
          </div>

          <div className="mt-10">
            <CommentList profile={profile} />
          </div>

          <div className="mt-10">
            <Badges profile={profile} />
          </div>

          <div className="mt-10 flex justify-end gap-4">
            <Buttons profileId={profile?.id?.toString()} />
          </div>
        </div>
      </main>
    </div>
  );
}
