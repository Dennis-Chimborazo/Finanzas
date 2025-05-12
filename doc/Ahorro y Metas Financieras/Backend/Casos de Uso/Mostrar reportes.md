## Nombre

Mostrar Reportes

## Descripción

Este caso de uso permite a los usuarios visualizar informes detallados relacionados con sus metas de ahorro. Los reportes incluyen información personal, detalles de las cuentas de ahorro asociadas y el progreso de cada meta, presentados de manera visual e interactiva.

## Actores

- **Principal**: Usuario autenticado

## Precondiciones

- El usuario debe haber iniciado sesión en el sistema.
- El usuario debe tener al menos una cuenta de ahorro activa.
- El usuario debe tener al menos una meta de ahorro activa asociada a una de sus cuentas.

## Flujo Principal

1. El usuario accede a la sección de reportes en la interfaz del sistema.
2. El sistema presenta una lista de las metas de ahorro activas del usuario.
3. El usuario selecciona una meta específica para visualizar su reporte.
4. El sistema muestra un informe detallado que incluye:
   - Información personal del usuario (nombre completo, número de identificación, correo electrónico).
   - Detalles de la cuenta de ahorro asociada (número de cuenta, saldo actual).
   - Información de la meta de ahorro (nombre, descripción, monto objetivo, monto acumulado, porcentaje de progreso, fecha de inicio, fecha límite).
   - Historial de aportes realizados a la meta.
   - Gráficos y visualizaciones que representan el progreso de la meta.
1. El usuario puede interactuar con el reporte para filtrar información por fechas o exportar el informe en formatos como PDF.

## Flujos Alternativos

### Sin Metas de Ahorro Activas

- **Condición**: El usuario no tiene metas de ahorro activas.
- **Acción**:
  1. El sistema informa al usuario que no tiene metas de ahorro activas.
  2. El sistema ofrece la opción de crear una nueva meta de ahorro.

### Error en la Carga de Datos
- **Condición**: Ocurre un error al cargar la información del reporte.
- **Acción**:
  1. El sistema muestra un mensaje de error indicando que no se pudo cargar el reporte.
  2. El usuario puede intentar recargar la información o contactar al soporte técnico.

## Postcondiciones

- El usuario ha visualizado el reporte detallado de una de sus metas de ahorro.
- El usuario puede tomar decisiones informadas sobre sus hábitos de ahorro basándose en la información presentada.

## Reglas de Negocio

- Los reportes deben actualizarse en tiempo real para reflejar los cambios más recientes en las metas de ahorro.
- Solo el usuario propietario de la cuenta puede acceder a sus reportes.

## Requisitos Funcionales Relacionados

- El sistema debe permitir la visualización de reportes detallados de metas de ahorro.
- El sistema debe ofrecer opciones para exportar los reportes en formatos PDF.

## Notas

- La presentación visual de los reportes busca facilitar la comprensión del progreso de las metas de ahorro y fomentar hábitos financieros saludables.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24