"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    height_cm: "",
    weight_kg: "",
    selected_position: "WR", // Standardmäßig Wide Receiver
    forty_yard_dash: "",
  });

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Wir holen uns die ID des aktuell eingeloggten Nutzers
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user?.id,
        ...formData,
        updated_at: new Date(),
      });

    setLoading(false);
    if (error) alert("Fehler: " + error.message);
    else alert("Profil aktualisiert! Dein KI-Coach analysiert jetzt...");
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 italic uppercase">Athleten Profil</h1>
      <form onSubmit={saveProfile} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1">Name</label>
          <input type="text" className="w-full p-2 border rounded shadow-sm" 
            onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Größe (cm)</label>
            <input type="number" className="w-full p-2 border rounded" 
              onChange={(e) => setFormData({...formData, height_cm: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Gewicht (kg)</label>
            <input type="number" className="w-full p-2 border rounded" 
              onChange={(e) => setFormData({...formData, weight_kg: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Wunsch-Position</label>
          <select className="w-full p-2 border rounded" 
            onChange={(e) => setFormData({...formData, selected_position: e.target.value})}>
            <option value="QB">Quarterback</option>
            <option value="WR">Wide Receiver</option>
            <option value="RB">Running Back</option>
            <option value="LB">Linebacker</option>
            <option value="OL">Offensive Line</option>
            <option value="DL">Defensive Line</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">40-Yard Dash (Sekunden)</label>
          <input type="number" step="0.01" className="w-full p-2 border rounded" 
            onChange={(e) => setFormData({...formData, forty_yard_dash: e.target.value})} />
        </div>

        <button 
          disabled={loading}
          className="mt-4 bg-black text-white font-bold py-3 px-6 rounded hover:bg-red-600 transition-colors">
          {loading ? "Speichert..." : "DATEN AN COACH SENDEN"}
        </button>
      </form>
    </div>
  );
}
