## Nombre

Registrarse

## Descripción

Este caso de uso permite a una persona crear una cuenta en el sistema bancario proporcionando la información personal requerida. El proceso incluye la validación de datos y la creación de registros en las entidades correspondientes.

## Actores

- **Principal**: Persona no registrada

## Precondiciones

- El usuario no debe tener una cuenta existente en el sistema.
- El sistema debe estar operativo y accesible.

## Flujo Principal
1. El usuario accede a la opción de registro en la interfaz del sistema.
2. El sistema presenta un formulario solicitando los siguientes datos:
   - Tipo de identificación
   - Número de identificación
   - Nombres
   - Apellidos
   - Fecha de nacimiento
   - Dirección
   - Teléfono
   - Correo electrónico
   - Nombre de usuario
   - Contraseña
3. El usuario completa el formulario y envía la solicitud de registro.
4. El sistema valida que:
   - Todos los campos obligatorios estén completos.
   - El número de identificación no esté registrado previamente.
   - El correo electrónico y el nombre de usuario sean únicos.
   - La contraseña cumpla con los requisitos de seguridad.
5. Si la validación es exitosa:
   - Se crea un nuevo registro en la entidad `people`.
   - Se crea un nuevo registro en la entidad `users`.
   - Se asocia el usuario con su perfil correspondiente.
   - Se genera una cuenta de ahorros al nombre del nuevo usuario.
1. El sistema confirma al usuario que el registro fue exitoso.

## Flujos Alternativos

### Datos Incompletos o Inválidos

- **Condición**: El usuario omite campos obligatorios o ingresa datos inválidos.
- **Acción**:
  1. El sistema muestra un mensaje de error indicando los campos que requieren corrección.
  2. El usuario corrige los datos y reenvía la solicitud.

### Identificación o Correo Electrónico Duplicado

- **Condición**: El número de identificación o el correo electrónico ya están registrados.
- **Acción**:
  1. El sistema informa al usuario sobre la duplicidad.
  2. El usuario debe proporcionar datos diferentes o recuperar su cuenta existente.

## Postcondiciones

- El usuario tiene una cuenta activa en el sistema.
- Los datos personales están almacenados y asociados correctamente.
- El usuario puede iniciar sesión y acceder a las funcionalidades permitidas.

## Reglas de Negocio

- La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.
- El correo electrónico debe tener un formato válido y ser único.
- El número de identificación debe ser único en el sistema.
- El número de teléfono debe ser único en el sistema. 

## Notas

- La foto de perfil no es requerida durante el registro; el usuario puede agregarla posteriormente desde su perfil.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24