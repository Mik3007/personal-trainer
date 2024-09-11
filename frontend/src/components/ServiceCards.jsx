import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";

export default function ServicesCards() {
  // Inizializza i controlli di animazione di Framer Motion
  const controls = useAnimation();
  // Utilizza react-intersection-observer per rilevare quando il componente è visibile
  const [ref, inView] = useInView({
    triggerOnce: true, // L'animazione si attiva solo una volta
    threshold: 0.1, // Il componente è considerato in vista quando il 10% è visibile
  });

  // Effetto per avviare l'animazione quando il componente è in vista
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Definizione delle varianti di animazione per il contenitore principale
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Ritarda l'animazione di ogni figlio di 0.3 secondi
      },
    },
  };

  // Definizione delle varianti di animazione per le singole carte
  const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex flex-col justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 min-h-screen bg-gradient-to-b from-[#343434] to-[#4B4B4B]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Card 1: Preparazione Atletica Concorsi */}
          <motion.div
            className="card bg-base-100 image-full shadow-xl h-[70vh] sm:h-[65vh] md:h-[60vh] lg:h-[80vh] transition-shadow hover:shadow-2xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <figure>
              <img
                src="/Preparazione-concorsi.jpg"
                alt="Card 1"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                <h2 className="card-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  Preparazione Atletica Concorsi!
                </h2>
                {/* Elenco dei servizi offerti */}
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Seduta di allenamento 1 to 1
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Lezioni di salto in alto
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Lezioni di corsa
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Scheda di allenamento mirata
                  </p>
                </div>
              </div>
              {/* Pulsante di contatto che apre WhatsApp */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary btn-md sm:btn-lg"
                  onClick={() =>
                    window.open(
                      "https://wa.me/3488358517?text=Salve,%20vorrei%20ricevere%20maggiori%20informazioni.",
                      "_blank"
                    )
                  }
                >
                  Contatta
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Coaching Online */}
          <motion.div
            className="card bg-base-100 image-full shadow-xl h-[70vh] sm:h-[65vh] md:h-[60vh] lg:h-[80vh] transition-shadow hover:shadow-2xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <figure>
              <img
                src="/coaching-online2.jpg"
                alt="Card 2"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                <h2 className="card-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  Coaching Online!
                </h2>
                {/* Elenco dei servizi offerti */}
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Da 4 a 8 settimane per rinnovo
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Completamente Online
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Programma personalizzato
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Consulenza e assistenza Online per tutta la durata del piano
                  </p>
                </div>
              </div>
              {/* Pulsante di contatto che apre WhatsApp */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary btn-md sm:btn-lg"
                  onClick={() =>
                    window.open(
                      "https://wa.me/3461332408?text=Salve,%20vorrei%20ricevere%20maggiori%20informazioni.",
                      "_blank"
                    )
                  }
                >
                  Contatta
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Personal Training 1 To 1 */}
          <motion.div
            className="card bg-base-100 image-full shadow-xl h-[70vh] sm:h-[65vh] md:h-[60vh] lg:h-[80vh] transition-shadow hover:shadow-2xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <figure>
              <img
                src="/1to1.png"
                alt="Card 3"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                <h2 className="card-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  Personal Training 1 To 1!
                </h2>
                {/* Elenco dei servizi offerti */}
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Durata 4-8 settimane
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Piano personalizzato
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Consulenza e assistenza Online
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    Pacchetto 12 lezioni (1 mese) 24 lezioni (bim) 36 lezioni (trim)
                  </p>
                </div>
              </div>
              {/* Pulsante di contatto che apre WhatsApp */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary btn-md sm:btn-lg"
                  onClick={() =>
                    window.open(
                      "https://wa.me/3461332408?text=Salve,%20vorrei%20ricevere%20maggiori%20informazioni.",
                      "_blank"
                    )
                  }
                >
                  Contatta
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
