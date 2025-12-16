import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Shield, Leaf } from "lucide-react";

export default function AboutUsCard() {
    const navigate = useNavigate();

    return (
        <section className="py-12 relative">
            <div className="container mx-auto px-6 relative z-10">
                {/* Main White Card Container - Increased padding */}
                <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] shadow-2xl p-10 lg:p-16 border border-white/50">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="lg:w-1/2 w-full"
                        >
                            <div className="relative group">
                                {/* Decorative frame - adjusted for light theme */}
                                <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3 scale-[1.02] opacity-60 transition-transform group-hover:rotate-1 duration-500" />

                                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                                    <img
                                        src="/landingPageImage.jpg"
                                        alt="Comunidad RidECI"
                                        className="w-full h-[500px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />

                                    {/* Floating Badges */}
                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                                        <div>
                                            <p className="text-sm font-light text-white/90">Conectando a</p>
                                            <p className="text-2xl font-bold">La Comunidad ECI</p>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Section */}
                        <div className="lg:w-1/2 space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                    </span>
                                    Nuestra Misión
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                                    Transformando la movilidad <span className="text-blue-600">universitaria</span>
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="font-['Poppins'] text-slate-600 text-lg space-y-8 leading-relaxed"
                            >
                                <p>
                                    <span className="font-semibold text-slate-800">RidECI</span> no es solo una app, es el puente que conecta a estudiantes, profesores y administrativos para viajar mejor. Hacemos que tus trayectos sean más <strong className="text-blue-600">seguros, económicos y sostenibles</strong>.
                                </p>

                                {/* Features Grid with ample spacing */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 pb-2">
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                                        <Shield className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-slate-900">Seguridad Total</h4>
                                            <p className="text-sm text-slate-500 mt-1">Verificación de usuarios y seguimiento en tiempo real.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                                        <Leaf className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-slate-900">Sostenibilidad</h4>
                                            <p className="text-sm text-slate-500 mt-1">Reducimos la huella de carbono compartiendo viajes.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="pt-6"
                            >
                                <button
                                    onClick={() => navigate('/register')}
                                    className="group relative inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                                >
                                    Únete a la Comunidad
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
