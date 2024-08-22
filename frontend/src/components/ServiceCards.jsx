import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ServicesCards() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        <motion.div
          className="card bg-base-100 image-full shadow-xl h-[70vh] transition-shadow hover:shadow-2xl"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5 }}
        >
          <figure>
            <img
              src="/Preparazione-concorsi.jpg"
              alt="Card 1"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body flex flex-col justify-between p-4 sm:p-6 md:p-8">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="card-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 md:mb-24">
                Preparazione Atletica Concorsi!
              </h2>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Seduta di allenamento 1 to 1
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Lezioni di salto in alto
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Lezioni di corsa
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Scheda di allenamento mirata
                </p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4 sm:mt-5 md:mt-6">
              <button
                className="btn btn-primary btn-md sm:btn-lg"
                onClick={() =>
                  window.open(
                    "https://wa.me/3461332408?text=Salve,%20vorrei%20ricevere%20maggiori%20informazioni.",
                    "_blank"
                  )
                }
              >
                Richiedi Info
              </button>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}

        <motion.div
          className="card bg-base-100 image-full shadow-xl h-[70vh] transition-shadow hover:shadow-2xl"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <figure>
            <img
              src="/coaching-online.jpg"
              alt="Card 1"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body flex flex-col justify-between p-4 sm:p-6 md:p-8">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="card-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 md:mb-32">
                Coaching Online!
              </h2>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Da 4 a 8 settimane per rinnovo
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Completamente Online
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Programma personalizzato
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Consulenza e assistenza Online per tutta la durata del piano
                </p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4 sm:mt-5 md:mt-6">
            <button
                className="btn btn-primary btn-md sm:btn-lg"
                onClick={() =>
                  window.open(
                    "https://wa.me/3461332408?text=Salve,%20vorrei%20ricevere%20maggiori%20informazioni.",
                    "_blank"
                  )
                }
              >
                Richiedi Info
              </button>
            </div>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="card bg-base-100 image-full shadow-xl h-[70vh] transition-shadow hover:shadow-2xl"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <figure>
            <img
              src="/1to1.png"
              alt="Card 1"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body flex flex-col justify-between p-4 sm:p-6 md:p-8">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="card-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 md:mb-36">
                Personal Training 1 To 1!
              </h2>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Durata 4-8 settimane
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Piano personalizzato
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Consulenza e assistenza Online
                </p>
              </div>
              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                <CheckCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <p className="text-xl sm:text-2xl md:text-3xl">
                  Pacchetto 12 lezioni (1 mese) 24 lezioni (bim) 36 lezioni
                  (trim)
                </p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4 sm:mt-5 md:mt-6">
            <button
                className="btn btn-primary btn-md sm:btn-lg"
                onClick={() =>
                  window.open(
                    "https://wa.me/3461332408?text=Salve,%20vorrei%20ricevere%20maggiori%20informazioni.",
                    "_blank"
                  )
                }
              >
                Richiedi Info
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
