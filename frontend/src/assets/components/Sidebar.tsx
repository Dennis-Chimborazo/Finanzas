import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, DollarSign, Users, LogOut, FileText } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
  { to: '/dashboard/goals', label: 'Metas', icon: <Users className="w-4 h-4" /> },
  { to: '/dashboard/contributions', label: 'Contribuciones', icon: <DollarSign className="w-4 h-4" /> },
  { to: '/dashboard/suggestions', label: 'Sugerencias', icon: <span className="text-xl">💡</span> },
  { to: '/dashboard/reports', label: 'Informes', icon: <FileText className="w-4 h-4" /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="bg-white shadow h-screen p-5 w-64 border-r flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <img src="/images/banner.png" alt="Banco ACHE Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-900">BANCO ACHE</h1>
        </div>

        <nav className="flex flex-col gap-4 text-sm text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition hover:bg-blue-50 hover:text-blue-700 ${
                location.pathname === item.to ? 'bg-blue-100 text-blue-800 font-semibold' : ''
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <Link
        to="/"
        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-500 hover:text-white hover:bg-red-500 transition"
      >
        <LogOut className="w-4 h-4" /> Cerrar sesión
      </Link>
    </aside>
  );
};

export default Sidebar;