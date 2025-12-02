import { useNavigate } from "react-router-dom";


export default function AboutUsCard() {
    const navigate = useNavigate()
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-4xl font-bold text-white">
                            Sobre <span className="text-white-400">Nosotros</span>
                        </h2>
                        <div className="font-['Poppins'] text-black/90 text-lg space-y-4 leading-relaxed text-justify">
                            <p>
                                RidECI es una plataforma creada para conectar a la comunidad universitaria y mejorar su forma de moverse. Nuestro objetivo es ofrecer una movilidad más segura, económica y sostenible, facilitando que estudiantes, profesores y empleados puedan compartir rutas, acompañarse en transporte público y optimizar sus desplazamientos diarios.
                            </p>
                            <p>
                                Creemos en el poder de la comunidad y en la importancia de viajar con confianza. Por eso, RidECI integra geolocalización en tiempo real, verificación de usuarios, reputación, pagos flexibles y herramientas de seguridad, todo en un solo lugar.
                            </p>
                            <p>
                                Más que una aplicación de transporte, somos una red que impulsa la colaboración, la confianza y la sostenibilidad dentro del campus.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all hover:shadow-lg hover:scale-105"
                            >
                                Registrate Ahora
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                            <img
                                src="/landingPageImage.jpg"
                                alt="Comunidad RidECI"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
