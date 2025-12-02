import { useNavigate } from "react-router-dom";
import RideciLogo from "../../../assets/RIDECI Logo (Blanco).png";
import FeaturesSection from "../components/FeaturesSection";
import AboutUsCard from "../components/AboutUsCard";


export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="absolute w-full h-full auto-scroll">

            <section className="relative min-h-screen flex flex-col justify-center">
                <img src={"../../public/landingBackGround.png"} alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
                <nav className="absolute top-0 left-0 z-20 flex items-center justify-end px-8 h-24 w-full bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">

                    <div className="absolute left-8 top-1/2 -translate-y-1/2">
                        <img src={RideciLogo} alt="Logo" className="h-36 w-auto object-contain drop-shadow-md" />
                    </div>


                    <div className="flex items-center gap-6 z-10">

                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white hover:bg-gray-100 text-[#2196F3] px-6 py-2 rounded-full font-semibold shadow-md transition-all hover:shadow-lg hover:scale-105"
                        >
                            Iniciar Sesión
                        </button>

                        <button
                            onClick={() => navigate('/register')}
                            className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all hover:shadow-lg hover:scale-105"
                        >
                            Comenzar
                        </button>
                    </div>
                </nav>



                <div className="pt-32 pb-10">
                    <AboutUsCard />

                </div>

                <div className="pt-40">
                    <FeaturesSection />
                </div>

            </section>

        </div>
    );
}