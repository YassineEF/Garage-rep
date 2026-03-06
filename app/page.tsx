import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Barre de navigation simple */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="text-2xl font-black text-blue-600 tracking-tighter">
          GarageRep<span className="text-orange-500">.</span>
        </div>
        <div className="space-x-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Connexion Pro
          </Link>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Essai Gratuit
          </Link>
        </div>
      </nav>

      {/* Section Héro (Le message principal) */}
      <header className="max-w-4xl mx-auto text-center py-20 px-4">
        <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-6">
          Spécial Garages & Centres Auto Indépendants
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Divisez vos "lapins" par deux. <br />
          <span className="text-blue-600">Multipliez vos avis Google.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          L'outil ultra-simple qui envoie un SMS de rappel à vos clients la
          veille de leur rendez-vous, et leur demande un avis Google une fois la
          voiture récupérée.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition transform hover:-translate-y-1"
          >
            Voir la démo en direct
          </Link>
          <p className="text-sm text-gray-500 sm:hidden">
            Sans carte bancaire • Installation en 2 min
          </p>
        </div>
        <p className="hidden sm:block text-sm text-gray-500 mt-4">
          Aucune carte bancaire requise • Installation en 2 minutes
        </p>
      </header>

      {/* Section des 3 Arguments (Pourquoi payer ?) */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
              📱
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Zéro installation
            </h3>
            <p className="text-gray-600">
              Pas de logiciel lourd à apprendre. Gardez votre agenda papier ou
              votre logiciel actuel. Tapez juste le numéro sur GarageRep et on
              s'occupe du reste.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
              💸
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Fini les pertes sèches
            </h3>
            <p className="text-gray-600">
              Un client qui oublie son RDV, c'est 150€ de perdus et un pont
              bloqué pour rien. Le SMS de rappel automatique divise ce risque
              par deux.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
              ⭐
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Boostez votre réputation
            </h3>
            <p className="text-gray-600">
              Le système envoie un SMS 2h après le RDV demandant un avis. Passez
              devant vos concurrents sur Google Maps sans lever le petit doigt.
            </p>
          </div>
        </div>
      </section>

      {/* Section Prix Imbattable */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Un tarif clair, rentabilisé au 1er lapin évité.
        </h2>
        <div className="bg-white border-2 border-blue-600 rounded-3xl p-8 shadow-xl relative mt-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
            Le plus populaire
          </div>
          <div className="text-5xl font-black text-gray-900 mb-2">
            49 €{" "}
            <span className="text-xl text-gray-500 font-normal">/ mois</span>
          </div>
          <p className="text-gray-500 mb-8">
            Sans engagement. Annulable en un clic.
          </p>

          <ul className="text-left space-y-4 mb-8 max-w-xs mx-auto text-gray-700">
            <li className="flex items-center">
              ✅ <span className="ml-3">Rappels SMS illimités*</span>
            </li>
            <li className="flex items-center">
              ✅ <span className="ml-3">Demandes d'avis Google</span>
            </li>
            <li className="flex items-center">
              ✅ <span className="ml-3">Support prioritaire 7j/7</span>
            </li>
            <li className="flex items-center">
              ✅ <span className="ml-3">Formation de 10 minutes incluse</span>
            </li>
          </ul>

          <Link
            href="/dashboard"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition"
          >
            Je commence mon mois gratuit
          </Link>
        </div>
      </section>
    </div>
  );
}
