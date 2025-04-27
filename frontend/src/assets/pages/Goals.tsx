import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useGoals } from '../context/GoalsContext';
import ApiService from "../service/ApiService";
import {Toaster,toast} from "sonner";

const Goals: React.FC = () => {

  const { goals, addGoal } = useGoals();
  const [form, setForm] = useState({
    goal_name: '',
    category: '',
    description: '',
    target_amount: 0,
    start_date: '',
    end_date: '',
    personId: 0,
  });
  

  const getId = (): number | null => {
    const loginData = localStorage.getItem("user");
  
    if (loginData) {
      const parsedData = JSON.parse(loginData);
  
      if (parsedData && parsedData.personData && parsedData.personData.personId) {
        return parsedData.personData.personId.personId;
      }
    }
  
    return null;
  };


  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  const saveGoal = async () => {
    if (form.category==''||form.description==''||form.end_date==''||form.goal_name==''
      ||form.start_date==''||form.target_amount==0  ) {
            toast.error("Complete all required fields");
    }else{
    const id = getId();
    const dataToSend = {
      ...form,
      target_amount: Number(form.target_amount),
      personId: id,
    };
  
    try {
      const response = await ApiService.save("savings-goal", dataToSend);
      console.log("Meta guardada:", response);
      toast.success("Meta guardada exitosamente");
    } catch (error) {
      console.error("Error al guardar la meta:", error);
    }
  }

  };
  
  

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <Sidebar />

      <main className="flex-1 px-6 md:px-10 py-8">
        <div className="flex justify-between items-start mb-6">
           <Toaster position="top-center" visibleToasts={1} duration={3000} richColors />
          <div>
            <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              📅 Crear Meta de Ahorro
            </h1>
            <p className="text-sm text-gray-600">Planifica tu próximo objetivo financiero con un propósito claro.</p>
          </div>
          <img src="/images/banner.png" alt="Ilustración" className="w-28 md:w-40 hidden md:block" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4 max-w-4xl mx-auto">
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="goal_name"
              type="text"
              placeholder="Nombre de la meta"
              className="w-full border rounded px-4 py-2 text-sm"
              value={form.goal_name}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              className="w-full border rounded px-4 py-2 text-sm"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona categoría</option>
              <option value="salud">Salud</option>
              <option value="hogar">Hogar</option>
              <option value="ocio">Ocio</option>
              <option value="estudios">Estudios</option>
            </select>
            <input
              name="description"
              type="text"
              placeholder="Nombre de la meta"
              className="w-full border rounded px-4 py-2 text-sm"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              name="target_amount"
              type="number"
              placeholder="Monto objetivo ($)"
              className="w-full border rounded px-4 py-2 text-sm"
              value={form.target_amount}
              onChange={handleChange}
              required
            />

            <input
              name="start_date"
              type="date"
              className="w-full border rounded px-4 py-2 text-sm"
              value={form.start_date}
              onChange={handleChange}
              required
            />
            <input
              name="end_date"
              type="date"
              className="w-full border rounded px-4 py-2 text-sm"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
            onClick={saveGoal}
              type="submit"
              className="bg-[#2563EB] hover:bg-[#1E40AF] text-white font-medium px-6 py-2 rounded"
            >
              Guardar meta
            </button>
          </div>
        </form>

        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">📈 Metas registradas</h2>
          {goals.length === 0 ? (
            <p className="text-gray-500">Aún no has registrado ninguna meta.</p>
          ) : (
            <ul className="space-y-4">
              {goals.map((goal, index) => (
                <li key={index} className="p-4 bg-white rounded shadow border border-blue-100">
                  <p className="text-base font-medium text-gray-800">{goal.name}</p>
                  <p className="text-sm text-gray-600">Categoría: {goal.category}</p>
                  <p className="text-sm text-gray-600">Meta: ${goal.target}</p>
                  <p className="text-xs text-gray-500">Fecha límite: {goal.deadline}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default Goals;