## Nombre

Registrar Aportes

## Descripción

Este caso de uso permite a los usuarios realizar aportes monetarios, ya sea directamente a su cuenta de ahorros o a una meta de ahorro específica. Los aportes a metas de ahorro están sujetos a un monto semanal predefinido, mientras que los aportes a cuentas de ahorro pueden ser de cualquier monto, siempre que se expresen con dos cifras decimales.

## Actores

- **Principal**: Usuario autenticado

## Precondiciones

- El usuario debe haber iniciado sesión en el sistema.
- El usuario debe tener al menos una cuenta de ahorro activa.
- Para aportes a metas de ahorro, el usuario debe tener al menos una meta de ahorro activa asociada a una de sus cuentas.

## Flujo Principal

1. El usuario accede a la sección de aportes en la interfaz del sistema.
2. El sistema presenta un formulario solicitando:
   - Tipo de aporte: Cuenta de ahorro o Meta de ahorro
   - Monto del aporte
   - Selección de la cuenta de ahorro o meta de ahorro correspondiente
3. El usuario completa el formulario y envía la solicitud.
4. El sistema realiza las siguientes validaciones:
   - Verifica que el monto del aporte sea un número positivo.
   - Si el aporte es a una meta de ahorro:
     - Confirma que el monto ingresado coincida con el monto semanal predefinido para esa meta.
     - Verifica que la meta esté activa y asociada a una cuenta de ahorro del usuario.
   - Si el aporte es a una cuenta de ahorro:
     - Verifica que la cuenta esté activa y pertenezca al usuario.
5. Si las validaciones son exitosas:
   - Se crea un nuevo registro en la entidad `contributions`.
   - Se actualiza el saldo de la cuenta de ahorro correspondiente.
   - Si el aporte es a una meta de ahorro, se actualiza el progreso de la meta.
6. El sistema confirma al usuario que el aporte ha sido registrado exitosamente.

## Flujos Alternativos

### Datos Inválidos
- **Condición**: El usuario ingresa datos inválidos en el formulario.
- **Acción**:
  1. El sistema muestra mensajes de error específicos para cada campo inválido.
  2. El usuario corrige los datos y reenvía la solicitud.

### Monto Incorrecto para Meta de Ahorro
- **Condición**: El monto ingresado no coincide con el monto semanal predefinido para la meta de ahorro seleccionada.
- **Acción**:
  1. El sistema informa al usuario sobre la discrepancia.
  2. El usuario ajusta el monto y reenvía la solicitud.

### Cuenta o Meta Inactiva o No Asociada
- **Condición**: La cuenta de ahorro o la meta de ahorro seleccionada está inactiva o no pertenece al usuario.
- **Acción**:
  1. El sistema informa al usuario sobre la situación.
  2. El usuario selecciona una cuenta o meta válida y reenvía la solicitud.

## Postcondiciones

- Se ha registrado un nuevo aporte en el sistema.
- El saldo de la cuenta de ahorro correspondiente ha sido actualizado.
- Si el aporte fue a una meta de ahorro, el progreso de la meta ha sido actualizado.

## Reglas de Negocio

- Los montos de los aportes deben ser números positivos.
- Los aportes a metas de ahorro deben coincidir con el monto semanal predefinido para la meta.
- Las cuentas y metas de ahorro deben estar activas y asociadas al usuario que realiza el aporte.

## Requisitos Funcionales Relacionados
- El sistema debe permitir a los usuarios realizar aportes a sus cuentas de ahorro.
- El sistema debe permitir a los usuarios realizar aportes a sus metas de ahorro.
- El sistema debe validar que los aportes a metas de ahorro coincidan con el monto semanal predefinido.

## Notas
- Los aportes a metas de ahorro están diseñados para fomentar la disciplina financiera mediante contribuciones regulares y consistentes.
- El sistema puede ofrecer recordatorios o notificaciones para ayudar a los usuarios a mantenerse al día con sus aportes programados.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24