import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useGoals } from '../context/GoalsContext';
import ApiService from "../service/ApiService";
import Select from "react-select";

const Contributions: React.FC = () => {
  interface OptionType {
    value: number;
    label: string;
  }

  const { goals, contributions, addContribution } = useGoals();
  const [selNuevaOpcion, setSelNuevaOpcion] = useState<OptionType | null>(null);


  const [form, setForm] = useState({
    goalId: '',
    contributionType: "goal",
    amount: 0,
  });
  interface Meta {
    goal_id: number;
    goal_name: string;
    accountNumber: string;
    accountType: string;
    current_balance: string;
    status: string;
    avance: number;
  }
  const [metas, setMetas] = useState<Meta[]>([]);

  const cargarDatos = async () => {
    const mant = await ApiService.search("user");
    setMetas(mant);
  };
  
  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save(); // llama a save directamente
    setForm({ goalId: '', amount: 0, contributionType: "goal" });
    setSelNuevaOpcion(null); // Limpia el Select también
  };
  
  const valueCombo = (val: OptionType | null) => {
    if (val) {
      setSelNuevaOpcion(val);
      setForm({
        ...form,
        goalId: val.value.toString(),
      });
    }
  };


  const save = async () => {
    const num = Number(form.amount);
  
    if (isNaN(num)) {
      console.error('Amount is not a valid number');
      return;
    }
  
    const updatedForm = { ...form, amount: num };
  
    try {
      await ApiService.save("contribution", updatedForm);
      cargarDatos(); 
      alert("Contribución guardada correctamente");
    } catch (error) {
      console.error('Error saving the contribution:', error);
    }
  };
  


  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">💸 Registrar Contribución</h2>
            <p className="text-sm text-gray-600 mt-1">Añade un nuevo aporte a tus metas de ahorro.</p>
          </div>
          <img
            src="/images/banner.png"
            alt="Ilustración"
            className="w-24 h-auto md:w-32 hidden md:block"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto border"
        >
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta</label>
              <Select
                options={metas.map((m) => ({
                  value: m.goal_id,
                  label: m.goal_name,
                }))}
                onChange={valueCombo}
                value={selNuevaOpcion}
                placeholder="Selecciona una actividad"
              />

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad ($)</label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Ej. 50"
                className="w-full border rounded px-4 py-2 text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold py-2 rounded transition"
            onClick={save}
          >
            Guardar Contribución
          </button>
        </form>

        {/* Historial de contribuciones */}
        <div className="mt-10 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">📜 Historial de Contribuciones</h3>
          {contributions.length === 0 ? (
            <p className="text-gray-500">Aún no hay contribuciones registradas.</p>
          ) : (
            <table className="min-w-full bg-white border rounded shadow">
              <thead>
                <tr className="bg-blue-50 text-blue-800 text-sm">
                  <th className="py-2 px-4 text-left">Meta</th>
                  <th className="py-2 px-4 text-left">Cantidad ($)</th>
                  <th className="py-2 px-4 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c, i) => (
                  <tr key={i} className="text-sm text-gray-700 border-t">
                    <td className="py-2 px-4">{c.goalName}</td>
                    <td className="py-2 px-4">${parseFloat(c.amount).toFixed(2)}</td>
                    <td className="py-2 px-4">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contributions;