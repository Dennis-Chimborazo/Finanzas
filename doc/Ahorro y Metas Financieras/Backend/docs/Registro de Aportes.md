## Introducción

Este documento describe el proceso técnico para registrar aportes en el sistema bancario, ya sea directamente a cuentas de ahorro o a metas de ahorro específicas. Se detallan las validaciones necesarias, las actualizaciones en las entidades correspondientes y las consideraciones de seguridad.

## Propósito

Proporcionar una guía detallada para desarrolladores y administradores sobre la implementación y gestión del registro de aportes en el sistema.

## Requisitos de Datos

Los siguientes campos son requeridos para registrar un aporte:
- **Tipo de aporte**: Indica si el aporte es a una cuenta de ahorro o a una meta de ahorro.
- **Monto del aporte**: Cantidad monetaria del aporte, expresada con dos cifras decimales.
- **Identificador de cuenta o meta**: Dependiendo del tipo de aporte, se requiere el identificador de la cuenta de ahorro o de la meta de ahorro correspondiente.

## Validaciones

- El monto del aporte debe ser un número positivo.
- Si el aporte es a una meta de ahorro:
  - El monto debe coincidir con el monto semanal predefinido para la meta.
  - La meta debe estar activa y asociada a una cuenta de ahorro del usuario.
- Si el aporte es a una cuenta de ahorro:
  - La cuenta debe estar activa y pertenecer al usuario.

## Proceso de Registro

1. El usuario accede al formulario de registro de aportes.
2. Completa y envía los datos requeridos.
3. El sistema realiza las validaciones correspondientes.
4. Si las validaciones son exitosas:
   - Se crea un registro en la tabla `contributions`.
   - Se actualiza el saldo de la cuenta de ahorro correspondiente.
   - Si el aporte es a una meta de ahorro, se actualiza el progreso de la meta.
5. Se confirma al usuario que el aporte ha sido registrado exitosamente.

## Consideraciones de Seguridad

- Asegurar que el usuario esté autenticado antes de permitir el registro de aportes.
- Validar que la cuenta o meta de ahorro seleccionada pertenezca al usuario para evitar accesos no autorizados.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24