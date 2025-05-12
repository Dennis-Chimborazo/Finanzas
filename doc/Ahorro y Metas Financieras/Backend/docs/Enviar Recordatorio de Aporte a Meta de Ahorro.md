## Introducción

Este documento describe el proceso técnico para enviar recordatorios automáticos por correo electrónico a los usuarios que no han realizado su aporte semanal a una meta de ahorro, cuando faltan pocos días para la fecha límite establecida. Se utiliza Firebase y para el envío de correos electrónicos, activados por el backend del sistema.

## Propósito

Proporcionar una guía detallada para desarrolladores y administradores sobre la implementación y gestión del envío de recordatorios de aportes a metas de ahorro en el sistema.

## Requisitos de Datos

Para generar y enviar un recordatorio, se requiere la siguiente información:
- **Datos del usuario**: nombre completo, correo electrónico.
- **Datos de la meta de ahorro**: nombre, monto objetivo, monto acumulado, fecha de inicio, fecha límite.
- **Historial de aportes**: fechas y montos de los aportes realizados a la meta.

## Validaciones

- Verificar que el usuario tenga una dirección de correo electrónico válida.
- Confirmar que la meta de ahorro esté activa y asociada al usuario.
- Asegurar que faltan pocos días (configurable) para la fecha límite de la meta.
- Verificar que el usuario no haya realizado su aporte semanal correspondiente.

## Proceso de Envío

1. El backend del sistema ejecuta una tarea programada diariamente para verificar las metas de ahorro activas.
2. Para cada meta de ahorro, se evalúan las condiciones mencionadas en las validaciones.
3. Si se cumplen las condiciones, el sistema crea un documento en la colección `mail` de Firestore con los detalles del correo electrónico:
   - **to**: correo electrónico del usuario.
   - **message**:
     - **subject**: recordatorio de aporte a la meta de ahorro.
     - **html**: contenido del correo electrónico, incluyendo detalles de la meta y el monto pendiente.
4. El sistema registra el envío del recordatorio para evitar duplicados.

## Consideraciones de Seguridad

- Asegurar que solo el backend del sistema tenga permisos para crear documentos en la colección `mail`.
- Proteger la información sensible del usuario mediante técnicas de cifrado y almacenamiento seguro.
- Implementar medidas para prevenir el envío de correos electrónicos no autorizados o maliciosos.

## Integración con Firebase

- **Extensión utilizada**: Trigger Email (`firestore-send-email`).
- **Configuración requerida**:
  - Servidor SMTP válido (por ejemplo, SendGrid, Mailgun).
  - Colección `mail` en Firestore para almacenar los documentos de correo electrónico.
  - Plantillas de correo electrónico para mantener la consistencia en los mensajes enviados.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24