import ProfileHeader from "@/modules/reputation&profiles/components/MainProfile/ProfileHeader";
import RatingSummary from "@/modules/reputation&profiles/components/MainProfile/RatingSummary";
import CommentList from "@/modules/reputation&profiles/components/MainProfile/CommentList";
import Badges from "@/modules/reputation&profiles/components/MainProfile/Badges";
import Buttons from "@/modules/reputation&profiles/components/MainProfile/Buttons";

export default function Profile() {
  return (
    <div className="flex w-full h-screen bg-[#e8f1fd] overflow-hidden text-lg">
      {/* Contenido */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="bg-white shadow-2xl rounded-3xl p-14 max-w-6xl mx-auto">

          <ProfileHeader />

          <div className="mt-12">
            <RatingSummary />
          </div>

          <div className="mt-12">
            <CommentList />
          </div>

          <div className="mt-12">
            <Badges />
          </div>

          <div className="mt-12 flex justify-end gap-6">
            <Buttons />
          </div>
        </div>
      </main>
    </div>
  );
}
