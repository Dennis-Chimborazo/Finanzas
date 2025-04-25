import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useGoals } from '../context/GoalsContext';

const Contributions: React.FC = () => {
  const { goals, contributions, addContribution } = useGoals();
  const [form, setForm] = useState({
    goalName: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0];
    if (!form.goalName || !form.amount) return;

    addContribution({
      goalName: form.goalName,
      amount: form.amount,
      date: today
    });

    alert(`Contribución de $${form.amount} agregada para "${form.goalName}"`);
    setForm({ goalName: '', amount: '' });
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
              <select
                name="goalName"
                value={form.goalName}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded text-sm"
                required
              >
                <option value="">-- Selecciona una meta --</option>
                {goals.map((goal, index) => (
                  <option key={index} value={goal.name}>
                    {goal.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad ($)</label>
              <input
                type="number"
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