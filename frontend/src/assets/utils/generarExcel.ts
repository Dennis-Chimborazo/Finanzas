// utils/generarExcel.ts
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Person, Account, Meta, Avance } from './types';

type Props = {
  person: Person;
  account: Account;
  meta: Meta;
  avances: Avance[];
};

export function generarExcel({ person, account, meta, avances }: Props) {
  // Crear una nueva hoja de cálculo
  const workbook = XLSX.utils.book_new();

  // Datos de cabecera
  const headerData = [
    ['Nombre:', `${person.nombre} ${person.apellido}`],
    ['Identificación:', person.identificacion],
    ['Correo electrónico:', person.correo],
    ['Cuenta:', account.numero],
    ['Meta de ahorro:', meta.nombre],
    ['Monto objetivo:', `$${meta.monto_objetivo.toFixed(2)}`],
    ['Fecha límite:', meta.fecha_limite],
    [], // Fila vacía para separación
  ];

  // Convertir datos de cabecera a hoja
  const headerSheet = XLSX.utils.aoa_to_sheet(headerData);

  // Calcular avances y agregar al final de la hoja
  let totalPagado = 0;
  const avancesData = [
    ['Fecha', 'Monto', 'Descripción', 'Dentro de tiempo', 'Falta para la meta', 'Total pagado'],
    ...avances.map((avance) => {
      totalPagado += avance.monto;
      const falta = meta.monto_objetivo - totalPagado;
      return [
        avance.fecha,
        `$${avance.monto.toFixed(2)}`,
        avance.descripcion,
        avance.dentro_tiempo ? 'Sí' : 'No',
        `$${falta > 0 ? falta.toFixed(2) : '0.00'}`,
        `$${totalPagado.toFixed(2)}`,
      ];
    }),
  ];

  // Agregar avances debajo de los datos de cabecera
  XLSX.utils.sheet_add_aoa(headerSheet, avancesData, { origin: -1 });

  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, headerSheet, 'Reporte');

  // Generar archivo Excel y descargar
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, `reporte_${person.nombre}_${meta.nombre}.xlsx`);
}
