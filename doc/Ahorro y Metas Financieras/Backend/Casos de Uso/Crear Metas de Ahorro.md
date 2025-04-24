## Nombre

Crear Metas de Ahorro

## Descripción

Este caso de uso permite a los usuarios establecer metas de ahorro personalizadas, como "vacaciones", "educación", "retiro", etc. Definiendo un monto objetivo, una categoría y una fecha límite. Estas metas ayudan a los usuarios a planificar y alcanzar sus objetivos financieros.

## Actores

- **Principal**: Usuario autenticado

## Precondiciones

- El usuario debe haber iniciado sesión en el sistema.
- El usuario debe tener al menos una cuenta de ahorro activa.

## Flujo Principal

1. El usuario accede a la sección de metas de ahorro.
2. El sistema presenta un formulario para crear una nueva meta, solicitando:
   - Nombre de la meta (e.g., "Viaje a Europa")
   - Descripción (opcional)
   - Monto objetivo
   - Categoría (e.g., viaje, emergencia, educación)
   - Fecha de inicio (opcional; por defecto, la fecha actual)
   - Fecha límite
   - Cuenta de ahorro asociada
3. El usuario completa el formulario y envía la solicitud.
4. El sistema valida los datos ingresados:
   - Verifica que el monto objetivo sea un número positivo.
   - Asegura que la fecha límite sea posterior a la fecha de inicio.
   - Confirma que la cuenta de ahorro seleccionada pertenece al usuario.
5. Si la validación es exitosa:
   - Se crea un nuevo registro en la entidad `savings_goal`.
   - Se asocia la meta a la cuenta de ahorro seleccionada.
6. El sistema confirma al usuario que la meta de ahorro ha sido creada exitosamente.

## Flujos Alternativos

### Datos Inválidos
- **Condición**: El usuario ingresa datos inválidos en el formulario.
- **Acción**:
  1. El sistema muestra mensajes de error específicos para cada campo inválido.
  2. El usuario corrige los datos y reenvía la solicitud.

### Cuenta de Ahorro No Disponible
- **Condición**: El usuario no tiene cuentas de ahorro activas.
- **Acción**:
  1. El sistema informa al usuario que debe crear una cuenta de ahorro antes de establecer metas.
  2. El sistema ofrece redirigir al usuario al proceso de creación de cuentas.


## Postcondiciones

- Se ha creado una nueva meta de ahorro asociada a una cuenta de ahorro del usuario.
- El usuario puede visualizar y realizar aportes a la meta creada.

## Reglas de Negocio

- Un usuario puede tener múltiples metas de ahorro activas simultáneamente.
- Cada meta de ahorro debe estar asociada a una única cuenta de ahorro.
- Las metas de ahorro pueden ser editadas o eliminadas por el usuario en cualquier momento.

## Requisitos Funcionales Relacionados

- El sistema debe permitir la creación de metas de ahorro personalizadas.
- El sistema debe validar que la cuenta de ahorro seleccionada pertenezca al usuario.

## Notas

- Las metas de ahorro son herramientas para fomentar el ahorro disciplinado y ayudar a los usuarios a alcanzar objetivos financieros específicos.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24