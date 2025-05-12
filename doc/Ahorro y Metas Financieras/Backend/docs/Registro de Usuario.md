
## Introducción

Este documento describe el proceso técnico para el registro de nuevos usuarios en el sistema bancario. Incluye la validación de datos, la creación de registros en la base de datos y consideraciones de seguridad.

## Propósito

Proporcionar una guía detallada para desarrolladores y administradores sobre cómo se implementa y gestiona el registro de usuarios en el sistema.

## Requisitos de Datos

Los siguientes campos son requeridos para el registro:
- **Tipo de identificación**: Cédula, pasaporte o RUC.
- **Número de identificación**: Número único del documento.
- **Nombre**: Nombre del usuario.
- **Apellido**: Apellido del usuario.
- **Fecha de nacimiento**: En formato DD-MM-AAAA.
- **Dirección**: Domicilio del usuario.
- **Teléfono**: Número de contacto que debe ser único.
- **Correo electrónico**: Debe ser único y válido.
- **Contraseña**: Debe cumplir con las políticas de seguridad establecidas.

## Validaciones

- Verificar que todos los campos obligatorios estén completos.
- Asegurar que el número de identificación y el correo electrónico no estén registrados previamente.
- Validar el formato del correo electrónico.
- Asegurar que la contraseña cumpla con los requisitos de seguridad.

## Proceso de Registro

1. El usuario accede al formulario de registro.
2. Completa y envía los datos requeridos.
3. El sistema realiza las validaciones correspondientes.
4. Si las validaciones son exitosas:
   - Se crea un registro en la tabla `people`.
   - Se crea un registro en la tabla `users`, asociando el `uid_firebase` para el uso de Firebase Authentication.
1. Se confirma al usuario que el registro fue exitoso.

## Consideraciones de Seguridad

- Las contraseñas deben almacenarse de forma segura utilizando algoritmos de hash, esto se implementa con las funcionalidades de Firebase.
- Implementar medidas para prevenir ataques de tipo inyección SQL y otros vectores comunes.
- Asegurar que las comunicaciones se realicen a través de conexiones seguras (HTTPS).

## Integración con Firebase Authentication

Si se utiliza Firebase Authentication:
- El `uid_firebase` proporcionado por Firebase se almacena en la tabla `users`.
- La autenticación y gestión de sesiones se delega a Firebase, mientras que los datos adicionales del usuario se almacenan en la base de datos del sistema.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24