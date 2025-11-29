import ProfileForm from "../../components/FormProfile/ProfileForm";

export default function Profile() {
  return (
    <div className="flex w-full h-screen bg-white overflow-hidden">      
      <main className="flex-1 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="min-h-full flex flex-col justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-5xl">
            <ProfileForm />
          </div>
        </div>
      </main>
    </div>
  );
}