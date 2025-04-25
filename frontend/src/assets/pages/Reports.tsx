import React from 'react';
import Sidebar from '../components/Sidebar';
import { FileText } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        {/* Título + Descripción */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Informes de Ahorro
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Consulta el resumen completo de tus metas, categorías y aportes registrados.
            </p>
          </div>
          <img
            src="/images/banner.png"
            alt="Report illustration"
            className="w-24 h-auto hidden md:block"
          />
        </div>

        {/* Contenedor de informes */}
        <div className="bg-white shadow rounded-lg p-6 border space-y-6">

          <div>
            <h3 className="text-blue-800 font-semibold text-lg mb-2">📌 Informes Disponibles</h3>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
              <li>📊 Informe por meta: cumplidas, vencidas, en ejecución (estado y progreso).</li>
              <li>📁 Informe por categoría: hogar, salud, ocio, estudios, etc.</li>
              <li>🗓 Registro detallado de aportes por fecha, monto y objetivo.</li>
              <li>📈 Comparación entre ahorro planificado vs. ahorro real.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-blue-800 font-semibold text-lg mb-2">🧾 Exportación</h3>
            <p className="text-sm text-gray-700">
              Próximamente podrás generar documentos exportables en formatos PDF y Excel que incluirán:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-800 mt-2 space-y-1">
              <li>Resumen por meta y categoría.</li>
              <li>Historial completo de contribuciones.</li>
              <li>Indicadores de rendimiento y progreso.</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 italic text-center mt-8">
            🔒 Las funciones de descarga estarán habilitadas en la siguiente fase del proyecto.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Reports;
