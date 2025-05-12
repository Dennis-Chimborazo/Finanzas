## Nombre

Enviar Recordatorio de Aporte a Meta de Ahorro

## Descripción

Este caso de uso permite al sistema enviar recordatorios automáticos por correo electrónico a los usuarios que no han realizado su aporte semanal a una meta de ahorro, cuando faltan pocos días para la fecha límite establecida. El sistema utiliza Firebase para el envío de correos electrónicos, activados por el backend.

## Actores

- **Principal**: Sistema
- **Secundario**: Usuario autenticado

## Precondiciones

- El usuario debe tener al menos una meta de ahorro activa con un monto objetivo y una fecha límite definidos.
- El usuario debe haber proporcionado una dirección de correo electrónico válida.
- El sistema debe tener configurado Firebase para el envío de correos electrónicos.

## Flujo Principal

1. El sistema ejecuta una tarea programada diariamente para verificar las metas de ahorro activas.
2. Para cada meta de ahorro, el sistema verifica:
   - Si faltan pocos días (configurable, por ejemplo, 3 días) para la fecha límite.
   - Si el usuario no ha realizado su aporte semanal correspondiente.
3. Si se cumplen ambas condiciones, el sistema crea un documento en la colección `mail` de Firestore con los detalles del correo electrónico:
   - Destinatario: correo electrónico del usuario.
   - Asunto: recordatorio de aporte a la meta de ahorro.
   - Cuerpo: información sobre la meta de ahorro y el monto pendiente.
4. El sistema filtra y obtiene los email de los usuarios que aun no depositan el semanal de sus metas de ahorro, estos email se pasan a Firebase que detecta el nuevo documento en la colección `mail` y envía el correo electrónico al usuario.
5. El sistema registra el envío del recordatorio para evitar duplicados.

## Flujos Alternativos

### Usuario sin Correo Electrónico Válido

- **Condición**: El usuario no ha proporcionado una dirección de correo electrónico válida.
- **Acción**:
  1. El sistema omite el envío del recordatorio y registra la incidencia para su revisión.

### Error en el Envío del Correo Electrónico
- **Condición**: Ocurre un error al enviar el correo electrónico mediante Firebase.
- **Acción**:
  1. El sistema registra el error y reintenta el envío en la próxima ejecución programada.

## Postcondiciones

- El usuario recibe un correo electrónico recordatorio para realizar su aporte a la meta de ahorro.
- El sistema mantiene un registro de los recordatorios enviados para cada meta de ahorro.

## Reglas de Negocio

- Los recordatorios se envían únicamente si faltan pocos días para la fecha límite y no se ha realizado el aporte correspondiente.
- Un usuario no debe recibir múltiples recordatorios para la misma meta de ahorro en un corto período de tiempo (configurable).

## Requisitos Funcionales Relacionados

- El sistema debe permitir la configuración de tareas programadas para verificar el estado de las metas de ahorro.
- El sistema debe integrar Firebase para el envío de correos electrónicos automáticos.

## Notas

- Es recomendable utilizar plantillas de correo electrónico para mantener la consistencia en los mensajes enviados.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24