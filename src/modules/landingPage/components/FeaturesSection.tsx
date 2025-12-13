import { Calendar, User, Leaf, ShieldCheck, Car } from "lucide-react";

const features = [
    {
        icon: <Calendar className="w-12 h-12 text-blue-600" />,
        title: (
            <>
                <span className="text-blue-600 font-bold">Viaja sin estrés.</span>
                <br />
                <h1>Coordina horarios y puntos de encuentro sin complicaciones.</h1>
            </>
        ),
        description: "",
    },
    {
        icon: <User className="w-12 h-12 text-blue-600" />,
        title: (
            <>
                <span className="text-blue-600 font-bold">Tu ruta, tu estilo.</span>
                <br />
                <h1>Elige viajar en carro, moto o acompañado.</h1>
            </>
        ),
        description: "",
    },
    {
        icon: <Leaf className="w-12 h-12 text-blue-600" />,
        title: (
            <>
                <span className="text-blue-600 font-bold">Movilidad sostenible que sí se siente.</span>

                <h1>Menos carros, menos trancón, menos CO₂. Más comunidad.</h1>
            </>
        ),
        description: "",
    },
    {
        icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
        title: (
            <>
                <span className="text-blue-600 font-bold">Muévete seguro, muévete acompañado.</span> Viaja con personas verificadas de tu comunidad.
            </>
        ),
        description: "Viaja con personas verificadas de tu comunidad",
    },
    {
        icon: <Car className="w-12 h-12 text-blue-600" />,
        title: (
            <>
                <span className="text-blue-600 font-bold">Pa' viajar en parche</span> te llevamos en 4.
            </>
        ),
        description: "",
    },
];

export default function FeaturesSection() {
    return (
        <section>
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
                    ¿Por qué <span className="text-blue-600">Rideci</span>?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-gray-100">

                            <div className="mb-6 bg-blue-50 p-4 rounded-full">
                                {feature.icon}
                            </div>
                            <p className="text-gray-700 text-lg leading-tight">
                                {feature.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
