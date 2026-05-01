import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 grain-overlay z-50"></div>
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtL5OfWZ6HHUO8TaAMuURVCUtZEka9hsFdOnD2m30X_Y2iwrdHczr5prhigBRfNxmaqtVvqU1XQ9vIdRTpwK8cxPUnm_mwoILn804fjg56zVDDPZDRPU0Y1U0SQ1n1koqeTUtc6OAbSfgkaSHFcbSuPGkbIrREzLJSCL8HoxITvP8mKpGo6vKz82kjJOUW8tsJ1J4UCyxjKgBK22ePt9ogWDUCdlIn8gMfkfLIm7UGwQRw7gdWX_RgkbfYohdc6Ytump_1JI0ClsM" 
              alt="Hero" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-on-background/80 via-on-background/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-2xl">
              <span className="text-primary-fixed-dim font-bold text-xs tracking-widest mb-4 block">EXPERTOS EN TIERRAS</span>
              <h1 className="text-5xl font-serif text-white mb-6 leading-tight">Impulsando el Futuro de la Agricultura</h1>
              <p className="text-lg text-surface-container-highest mb-10 opacity-90">
                Combinamos la sabiduría tradicional del campo con las herramientas digitales más avanzadas.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:brightness-110 transition-all shadow-lg">
                  Empezar ahora
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-20 max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 group relative overflow-hidden rounded-xl h-[350px] bg-primary text-on-primary p-10 flex flex-col justify-end cursor-pointer">
              <img className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEiz4LhUx453JCDUIhW4rlFZ53lGw-iYYqtfnifIRxrWh2pa6qWPTpFZgO624poah6kzthJQ5ZU58UxOOIz34SRYnP_ALM3v7cYSYGphOdQE3QYOblGKQnuLHdBvRTnqaDoDive8_oEJitUy_-cOvo2z70emwRb2FtrxSImGsZbT6MaCz-Nm-ErCLjtLMv2mt_pDzRU_0Clgcb-rnoxm9-0T0EY9E92qGttrrrU-eMmAzr3v_CACOiYg4PTw8ptV5vDKFwDFX7oUo" alt="Semillas" />
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-2">Explorar Lista de Semillas</h3>
                <button className="flex items-center gap-2 hover:translate-x-2 transition-transform">Ver catálogo <span className="material-symbols-outlined">arrow_forward</span></button>
              </div>
            </div>
            
            <div className="md:col-span-5 group relative overflow-hidden rounded-xl h-[350px] bg-secondary text-on-secondary p-10 flex flex-col justify-end cursor-pointer">
              <img className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhK-ANMxorQeSaf-ZNGVEPkdHAaX5E7zUUzlk7PqzwToIhZJHibEAmeXLGCBnhDQHJNb0dMMfheqsim7fqH7_HM_vipifvwfBftMZ8yPcp70G2RL5w3gqeLRhdElZeRaVaiKpaTz9kIymKH75doTrmOiJY74t0oiyYb78gYwyo5TvHuTWiuwTnd6RfzRoMPfEAKjXkW_iXS8nS8csgZNk4TuXK7vu_-F6bq6Zd1KiNh8mz_l2KFW4vjbcNBJmGAKvtn-k2KqbOMSA" alt="Empleo" />
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-2">Plataforma de Empleo</h3>
                <button className="flex items-center gap-2 hover:translate-x-2 transition-transform">Buscar oportunidades <span className="material-symbols-outlined">work</span></button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}