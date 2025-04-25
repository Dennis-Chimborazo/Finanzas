import React, { useState } from 'react';
import { useGoals } from '../context/GoalsContext';

const AddContribution: React.FC = () => {
  const { goals, addContribution } = useGoals();
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
      date: today,
    });

    setForm({ goalName: '', amount: '' });
  };

  return (
    <div className="bg-white p-6 rounded shadow border">
      <h2 className="text-xl font-bold text-blue-900 mb-4">➕ Añadir contribución</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona una meta</label>
          <select
            name="goalName"
            value={form.goalName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          >
            <option value="">-- Elige una meta --</option>
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
            placeholder="Ej. 50"
            value={form.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold py-2 rounded transition"
        >
          Entregar
        </button>
      </form>
    </div>
  );
};

export default AddContribution;
