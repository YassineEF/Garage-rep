"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { supabase } from "../../lib/supabase";

interface Appointment {
  id: number;
  client_name: string;
  client_phone: string;
  appointement_date: string;
  status: string;
}

export default function Dashboard() {
  // États pour le formulaire
  const [client_name, setClientName] = useState("");
  const [client_phone, setClientPhone] = useState("");
  const [appointement_date, setAppointementDate] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // État pour notre liste de rendez-vous
  const [appointements, setAppointements] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointement_date", { ascending: true });
    
    if (error) {
      console.error("Error fetching appointments:", error);
    } else {
      setAppointements(data || []);
    }
  };

  // Fonction pour ajouter un RDV
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    console.log(client_name,client_phone,appointement_date);
    

    const newAppointment = {
      client_name,
      client_phone,
      appointement_date,
      status: "Programmé",
    };

    const { data, error } = await supabase
      .from("appointments")
      .insert([newAppointment])
      .select();

    if (error) {
      console.error("Error adding appointment:", error);
      setStatus("idle");
      return;
    }

    if (data && data.length > 0) {
      // On l'ajoute au début de notre liste
      setAppointements([data[0], ...appointements]);
    }

    setStatus("success");
    setClientName("");
    setClientPhone("");
    setAppointementDate("");

    setTimeout(() => setStatus("idle"), 3000);
  };

  // Fonction pour supprimer un RDV (Annulation)
  const handleDelete = async (idToDelete: number) => {
    // Demande confirmation au garagiste pour éviter les erreurs
    if (window.confirm("Êtes-vous sûr de vouloir annuler ce rappel SMS ?")) {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", idToDelete);

      if (error) {
        console.error("Error deleting appointment:", error);
      } else {
        setAppointements(appointements.filter((app) => app.id !== idToDelete));
      }
    }
  };

  // Petite fonction pour rendre la date plus jolie
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString)
      .toLocaleDateString("fr-FR", options)
      .replace(",", " à");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord - GarageRep 🛠️</h1>
          <p className="text-gray-500 mt-1">Gérez vos rappels automatisés et vos avis Google.</p>
        </div>
        {/* Le bouton magique de profil Clerk */}
        <div className="bg-white p-2 rounded-full shadow-sm">
          <UserButton />
        </div>
      </div>

      {/* Layout en grille : 1 colonne sur mobile, 3 colonnes sur PC */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLONNE GAUCHE : Le Formulaire (Prend 1/3 de l'espace) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Nouveau Rendez-vous
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du client
                </label>
                <input
                  type="text"
                  required
                  value={client_name}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de Mobile
                </label>
                <input
                  type="tel"
                  required
                  value={client_phone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ex: 06 12 34 56 78"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date et Heure
                </label>
                <input
                  type="datetime-local"
                  required
                  value={appointement_date}
                  onChange={(e) => setAppointementDate(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-70"
              >
                {status === "loading"
                  ? "Programmation..."
                  : "Programmer le SMS 🚀"}
              </button>
            </form>

            {status === "success" && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs text-center font-medium">
                ✅ Rappel programmé avec succès !
              </div>
            )}
          </div>
        </div>

        {/* COLONNE DROITE : La Liste des RDV (Prend 2/3 de l'espace) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-semibold text-gray-800">
                Rappels à venir ({appointements.length})
              </h2>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium">Téléphone</th>
                    <th className="p-4 font-medium">Date du RDV</th>
                    <th className="p-4 font-medium">Statut SMS</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointements.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        Aucun rendez-vous prévu. Ajoutez-en un !
                      </td>
                    </tr>
                  ) : (
                    appointements.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 transition">
                        <td className="p-4 font-medium text-gray-900">
                          {app.client_name}
                        </td>
                        <td className="p-4 text-gray-600 text-sm">
                          {app.client_phone}
                        </td>
                        <td className="p-4 text-gray-600 text-sm">
                          {formatDate(app.appointement_date)}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ⏳ {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition cursor-pointer"
                            title="Annuler le rappel"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
