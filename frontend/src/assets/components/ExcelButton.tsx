import { generarExcel } from '../utils/generarExcel';
import { Person, Account, Meta, Avance } from '../utils/types';

export const ExcelButton = () => {
  const person: Person = {
    nombre: 'Gabriel',
    apellido: 'Llerena',
    identificacion: '1805071469',
    correo: 'gabriel0llerena@gmail.com',
  };

  const account: Account = {
    numero: '7700253372',
  };

  const meta: Meta = {
    nombre: 'Viaje a Europa',
    monto_objetivo: 500,
    fecha_limite: '30/06/2025',
  };

  const avances: Avance[] = [
    { fecha: '05/04/2025', monto: 10, descripcion: 'Primer aporte', dentro_tiempo: true },
    { fecha: '12/04/2025', monto: 15, descripcion: 'Segundo aporte', dentro_tiempo: true },
    // Agrega más avances según sea necesario
  ];

  const handleClick = () => {
    generarExcel({ person, account, meta, avances });
  };

  return <button onClick={handleClick}>Descargar Excel</button>;
};