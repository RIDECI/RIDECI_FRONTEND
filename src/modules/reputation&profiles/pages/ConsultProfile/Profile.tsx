import ProfileHeader from "@/modules/reputation&profiles/components/MainProfile/ProfileHeader";
import RatingSummary from "@/modules/reputation&profiles/components/MainProfile/RatingSummary";
import CommentList from "@/modules/reputation&profiles/components/MainProfile/CommentList";
import Badges from "@/modules/reputation&profiles/components/MainProfile/Badges";
import Buttons from "@/modules/reputation&profiles/components/MainProfile/Buttons";

export default function Profile() {
  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      {/* Contenido */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-5xl mx-auto">

          <ProfileHeader />

          <div className="mt-10">
            <RatingSummary />
          </div>

          <div className="mt-10">
            <CommentList />
          </div>

          <div className="mt-10">
            <Badges />
          </div>

          <div className="mt-10 flex justify-end gap-4">
            <Buttons />
          </div>
        </div>
      </main>
    </div>
  );
}
